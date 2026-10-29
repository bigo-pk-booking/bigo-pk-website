BADASS BIGO PK SLOTS — SUPER ADMIN SETUP
========================================

Files in this package
- index.html: updated website UI (Super Admin panel + public announcements)
- firestore.rules: keeps existing booking/slot rules and adds Super Admin permissions
- functions/index.js: secure server-side Admin account creation, disable/enable, and deletion
- functions/package.json: Cloud Functions dependencies
- firebase.json: deploy configuration for Firestore rules and Functions (Hosting is retained for projects that use Firebase Hosting)

IMPORTANT
The Super Admin panel will NOT be secure or fully functional by uploading index.html alone. Deploy the Firestore rules and Cloud Functions too. Do not put an Admin SDK service-account key or any privileged secret in index.html or GitHub.

ONE-TIME SETUP
1. In Firebase Console > Authentication > Sign-in method, make sure Email/Password is enabled. Existing Admins should continue to use their existing accounts.
2. In Firebase Console > Authentication > Users, create the account that will be the first Super Admin (or choose the account you want to promote). Copy its UID.
3. In Firebase Console > Firestore Database > Data, open/create collection `admins` and the document whose ID is exactly that UID. Set fields:
   enabled: true (boolean)
   role: "superadmin" (string)
   email: "the-super-admin-email@example.com" (string, optional but useful)
   Existing Admin documents without a role remain regular Admins.
4. Deploy the new `firestore.rules` and Cloud Functions from a trusted computer/Cloud Shell with Firebase CLI and a project owner account:
   npm install -g firebase-tools
   firebase login
   firebase use bigo-pk-booking
   firebase deploy --only firestore:rules,functions
   Cloud Functions deployment may require the Firebase project to use the Blaze billing plan. Review any billing prompt before enabling it.
5. Upload this package's `index.html` as the repository's root `index.html` in `bigo-pk-booking/bigo-pk-website`, then commit. If you also use Firebase Hosting, the provided firebase.json can deploy there; for GitHub Pages, continue deploying the root index.html through GitHub.
6. Sign in with the Super Admin account. You should see the Super Admin Control Center. Test by publishing a harmless announcement, verify it appears on the public homepage, then hide/delete it. Test creating a regular Admin account and disabling it.

SECURITY BEHAVIOR
- Only an enabled document with role `superadmin` can publish/delete announcements or manage Admin accounts.
- Regular Admins retain the existing booking/schedule/report tools.
- Admin account create/delete/enable operations are handled by callable Cloud Functions using Firebase Admin SDK; never by client-side Firestore writes.
- Super Admin account documents are protected from deletion/disable via these functions; self-disable/self-delete is blocked.
- Announcements are public-readable. Do not put private data in announcement messages.

ROLLBACK
Keep a copy of your previous index.html and firestore.rules before replacing anything. If a deployment fails, restore the previous rules from Firebase Console > Firestore > Rules and restore the previous index.html in GitHub.
