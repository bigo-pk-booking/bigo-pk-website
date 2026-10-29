# BADASS • BIGO PK Slots Website

This folder contains the website backup with a static announcement popup.

## Files
- `index.html` — complete website source, including the announcement popup.
- `firebase.json` — Firebase Hosting configuration (included if provided in the backup).
- `firestore.rules.txt` — Firestore rules backup (included if provided).
- `README.md` / `README-SETUP.txt` — project notes and setup instructions (included if provided).

## Update the announcement
Open `index.html` and search for:
- `var ANNOUNCEMENT_ENABLED = true;`
- `var ANNOUNCEMENT_TITLE = 'Important Announcement';`
- `var ANNOUNCEMENT_MESSAGE = 'Welcome to BADASS BIGO PK Slots! Please check the website for the latest PK slot information.';`

Edit the title and message values, preserving the quote marks and semicolons. To temporarily disable the popup, change `true` to `false`.

## Upload to GitHub from Android
1. Download and extract this ZIP file on your phone.
2. Open your repository on GitHub.
3. Upload the files from inside this folder into the repository root (not the outer folder itself).
4. If GitHub asks whether to replace `index.html`, only continue if you intend to publish this backed-up version.
5. Commit the upload.
6. Open the live website and refresh it. If needed, use Chrome's refresh or clear cached site data.

## Important
- This is a static popup. Its message is changed by editing and committing `index.html` in GitHub; it does not use a database or admin announcement panel.
- The original uploaded backup file was not modified.
- Test the website after upload. Keep a separate copy of the previous working `index.html` so you can roll back if needed.
