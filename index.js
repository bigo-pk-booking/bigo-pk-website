const { onCall, HttpsError } = require("firebase-functions/v2/https");
const { setGlobalOptions } = require("firebase-functions/v2");
const admin = require("firebase-admin");

admin.initializeApp();
setGlobalOptions({ region: "us-central1", maxInstances: 5 });
const db = admin.firestore();

async function requireSuperAdmin(request) {
  if (!request.auth) throw new HttpsError("unauthenticated", "Sign in as Super Admin first.");
  const snap = await db.collection("admins").doc(request.auth.uid).get();
  const data = snap.exists ? snap.data() : null;
  if (!data || data.enabled !== true || data.role !== "superadmin") {
    throw new HttpsError("permission-denied", "Only an enabled Super Admin can manage Admin accounts.");
  }
  return request.auth.uid;
}

function validEmail(email) {
  return typeof email === "string" && email.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

exports.createAdmin = onCall(async (request) => {
  const actorUid = await requireSuperAdmin(request);
  const email = String(request.data?.email || "").trim().toLowerCase();
  const password = String(request.data?.password || "");
  if (!validEmail(email)) throw new HttpsError("invalid-argument", "Enter a valid email address.");
  if (password.length < 10 || password.length > 128) {
    throw new HttpsError("invalid-argument", "Temporary password must be 10–128 characters.");
  }
  let user;
  try {
    user = await admin.auth().createUser({ email, password, emailVerified: false, disabled: false });
    await db.collection("admins").doc(user.uid).set({
      email,
      enabled: true,
      role: "admin",
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      createdBy: actorUid
    });
    return { uid: user.uid, email };
  } catch (error) {
    if (user?.uid) {
      try { await admin.auth().deleteUser(user.uid); } catch (_) {}
    }
    if (error instanceof HttpsError) throw error;
    if (error.code === "auth/email-already-exists") throw new HttpsError("already-exists", "An account already exists for this email.");
    console.error("createAdmin failed", error);
    throw new HttpsError("internal", "Could not create the Admin account.");
  }
});

exports.setAdminEnabled = onCall(async (request) => {
  const actorUid = await requireSuperAdmin(request);
  const uid = String(request.data?.uid || "");
  const enabled = request.data?.enabled;
  if (!uid || typeof enabled !== "boolean") throw new HttpsError("invalid-argument", "A valid UID and enabled boolean are required.");
  if (uid === actorUid) throw new HttpsError("failed-precondition", "You cannot disable your own Super Admin account.");
  const ref = db.collection("admins").doc(uid);
  const snap = await ref.get();
  if (!snap.exists) throw new HttpsError("not-found", "Admin account was not found.");
  if (snap.data().role === "superadmin") throw new HttpsError("failed-precondition", "Super Admin accounts are protected from this action.");
  await ref.update({ enabled, updatedAt: admin.firestore.FieldValue.serverTimestamp(), updatedBy: actorUid });
  return { uid, enabled };
});

exports.deleteAdmin = onCall(async (request) => {
  const actorUid = await requireSuperAdmin(request);
  const uid = String(request.data?.uid || "");
  if (!uid) throw new HttpsError("invalid-argument", "A valid Admin UID is required.");
  if (uid === actorUid) throw new HttpsError("failed-precondition", "You cannot delete your own Super Admin account.");
  const ref = db.collection("admins").doc(uid);
  const snap = await ref.get();
  if (!snap.exists) throw new HttpsError("not-found", "Admin account was not found.");
  if (snap.data().role === "superadmin") throw new HttpsError("failed-precondition", "Super Admin accounts are protected from deletion.");
  try {
    await admin.auth().deleteUser(uid);
  } catch (error) {
    if (error.code !== "auth/user-not-found") {
      console.error("deleteAdmin Auth deletion failed", error);
      throw new HttpsError("internal", "Could not delete the Firebase Authentication user.");
    }
  }
  await ref.delete();
  return { uid, deleted: true };
});
