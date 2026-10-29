BADASS BIGO PK SLOTS — FREE FIRESTORE ANNOUNCEMENT MANAGER

What changed:
- Added an Announcement Manager card inside the existing Admin Dashboard.
- Admin can set a title, message, publish/disable, and save.
- Visitors see an announcement popup when an active announcement is published/updated.
- Announcement data is stored in Firestore document: announcements/current.
- No Cloud Functions are used.

Before upload:
1. Keep a copy of your current working index.html.
2. Upload the new index.html to the GitHub repository root.
3. In Firebase Console > Firestore Database > Rules, add the matching announcements rule from firestore.rules.txt to your existing rules and Publish.
   IMPORTANT: Do not replace your Firebase rules with this file if your live rules contain other changes not included in this backup. Merge only the /announcements rule block into the current live rules.
4. Ensure the existing `admins/{UID}` document has enabled (Boolean) true.
5. Test with an admin account and a regular visitor.

Important limitations:
- This uses Firestore free-tier usage limits; it avoids Cloud Functions and does not require a paid plan by itself.
- Public visitors can read the announcement document; only an enabled admin can write it according to the supplied rules.
- Because announcements/current is a single document, there is one current announcement at a time.
- This package is prepared for manual upload; it has NOT been published to GitHub or Firebase.
