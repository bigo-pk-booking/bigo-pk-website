BIGO PK SLOT BOOKING WEBSITE — SETUP GUIDE
===========================================

WHAT'S INCLUDED
- Responsive mobile-friendly booking page.
- Live slot updates using Firebase Firestore.
- User BIGO ID booking and private reference code.
- User can use their private code to view booking status and assigned opponent BIGO ID.
- Admin login, schedule creation, close/reopen available slots, opponent ID assignment, cancellation.
- Excel (.xlsx) and CSV export.
- Firestore rules to keep all booking records private from regular users.

IMPORTANT
This is a deployable starter website, but it will NOT work online until you create/configure a Firebase project. Do not publish with placeholder Firebase settings. Test using a separate test project before taking real bookings.

A. CREATE FIREBASE PROJECT
1. Open https://console.firebase.google.com/ and create a project.
2. Add a Web App in Project Overview (</> icon).
3. Copy the web configuration values.
4. Open index.html and replace the values inside FIREBASE_CONFIG:
   apiKey, authDomain, projectId, storageBucket, messagingSenderId, appId.
5. In Firebase Console > Authentication > Sign-in method, enable:
   - Anonymous
   - Email/Password
6. In Firebase Console > Firestore Database, create a database.
7. Deploy firestore.rules from this folder (or paste its contents in Firestore > Rules and Publish).

B. CREATE ADMIN ACCOUNT
1. Firebase Console > Authentication > Users > Add user.
2. Create your admin email/password and copy that user's UID.
3. Firestore Database > Start collection: admins
4. Document ID must be exactly the admin user's UID.
5. Add field: enabled (boolean) = true.
6. Refresh the website and sign in from Admin.

Do not make admins collection publicly writable. Do not share the admin password.

C. PUBLISH WITH FIREBASE HOSTING (RECOMMENDED)
Use a computer with Node.js installed:
1. Install Firebase CLI: npm install -g firebase-tools
2. In this project folder run: firebase login
3. Run: firebase use --add   (select your project)
4. Run: firebase deploy
5. Open the Hosting URL shown by the CLI.

If you are using only an Android phone, you can edit index.html in a code editor and use GitHub, but GitHub Pages will only host the static front end. Firebase still needs to be configured and its rules deployed. Never put a Firebase Admin SDK private key in this website.

D. HOW TO USE
Admin:
1. Sign in from the Admin tab.
2. Choose a date and tap “Create all 9 slots”.
3. Bookings appear live in the table.
4. Enter the opponent's BIGO ID beside the booking and tap “Save ID”.
5. Download Excel or CSV report as needed.
6. Cancel a booking to reopen its slot. Available slots can be closed/reopened.

Users:
1. Choose a date and tap a green available slot.
2. Enter your BIGO ID and reserve.
3. Copy and save the private reference code.
4. Open “My booking”, paste the code, and check the opponent ID.
5. Once assigned, tap “Copy opponent BIGO ID”.

TIME SLOTS
8:00 PM, 8:15 PM, 8:30 PM, 8:45 PM, 9:00 PM, 9:15 PM, 9:30 PM, 9:45 PM, 10:00 PM.
Times are intended as Philippine time (UTC+8). The 10:00 PM slot is a start time.

PRIVACY AND SECURITY NOTES
- Regular users cannot list/read all bookings; admin users can.
- Booking reference is a private bearer code. Anyone who has the code can view that booking, so users should not share it publicly.
- The user's BIGO ID is not a password. Do not collect passwords, OTPs, or other account credentials.
- Firestore client configuration is public by design. Firestore security rules, not API-key secrecy, protect the data.
- Firebase rules must be deployed. Test both a normal anonymous user and an admin before launch.
- This app has no payment feature.
- This front end uses Firebase's CDN modules and SheetJS CDN for Excel export, so users need an internet connection.

TROUBLESHOOTING
- “Firebase setup is incomplete”: check FIREBASE_CONFIG in index.html; remove all PASTE_ placeholders.
- Booking fails: enable Anonymous Authentication, deploy firestore.rules, check Firestore is created, and ensure the selected slot is still available.
- Admin sign-in works but dashboard does not appear: check admins/{UID} exists and enabled is boolean true.
- Excel button does nothing: allow the CDN to load, or use CSV export.
- No slots: sign in as admin and create the schedule for the date.
