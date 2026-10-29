Announcement Manager fix v2

Replace only the root index.html in the GitHub repository with this file after backing up the current one. Do not replace Firestore rules.

Fixes: snapshot listener no longer overwrites the saving status; success only appears after Firestore confirms the write; pending local writes are identified as syncing; permission-denied errors explain required superadmin fields; active popup is suppressed for signed-in non-anonymous admins so visitors can see it without interrupting admin editing.

Expected document: Firestore / announcements / current.
Admin document must contain enabled Boolean true and role String superadmin.
Not live-tested against the user's Firebase project. Test save status and then open site in a private tab after GitHub Pages deploys.
