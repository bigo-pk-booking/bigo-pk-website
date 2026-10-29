BADASS BIGO PK WEBSITE UPDATE

Includes: hide large hero/monthly banner and PK Battle banner while Admin panel is open; My PK Schedule opens a popup carousel with Previous/Next for multiple bookings; available slots are green and enabled; booked or closed slots are red and disabled; booking lookup index supports multiple lookup codes for the same BIGO ID.

ANDROID DEPLOYMENT
1. Back up the current GitHub root index.html.
2. Upload this index.html to the repository root, replacing the current one, then commit.
3. Wait for GitHub Pages deployment and test My OPK and slot colors.
4. Multi-booking carousel requires compatible Firestore rules. The included firestore.rules is based on the earlier pre-announcement rules and modifies publicBigoLookup to keep multiple lookup codes. Do not publish it blindly if your live rules have since changed; compare/merge or back up your current rules first.
5. Do not delete existing bookings or collections. Existing BIGO IDs that previously had only one lookupCode can show that one old booking plus new bookings added after this update; old overwritten bookings cannot be recovered from the index alone.

This package does not change GitHub or Firebase automatically and has not been live-tested against your project.
