Announcement Manager Fix v3

Replace only the root index.html in the GitHub repository with this file after backing up the current version. Do not change Firestore rules for this step.

This version prevents the Firestore listener from overwriting the save success/error message immediately after the save attempt. After deployment, click Publish / Save and read the final status. If it fails, the exact error should remain visible.

Expected Firestore document: announcements/current. Write rules require admins/{uid}.enabled == true and role == "superadmin".
