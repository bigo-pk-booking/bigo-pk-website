BADASS BIGO PK UI polish

Changes in this index.html:
- Removed the helper sentence under Admin sign-in about creating Firebase users/documents.
- Added spinner + disabled button while Admin sign-in is in progress; restores the button on failure.
- Added a Copy ID button beside Opponent BIGO ID in each My PK Schedule carousel card when an opponent ID exists.

Android upload steps:
1. Back up the current root index.html in GitHub.
2. Upload this index.html to the repository root, replacing the current index.html.
3. Commit the change and wait for GitHub Pages to deploy.
4. Test Admin sign-in and My OPK schedule.

This is a prepared file; it has not been deployed to GitHub automatically. Do not replace Firestore rules for these UI-only changes.
