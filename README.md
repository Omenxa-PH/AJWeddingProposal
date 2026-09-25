# Alfred & Jessa Wedding Party Proposal Website

This package contains a personalized wedding party proposal website in a sky blue romantic style.

## What's new in this revision
- Added support for more wedding roles:
  - Bridesmaid
  - Groomsman
  - Maid of Honor
  - Best Man
  - Ring Bearer
  - Bible Bearer
  - Banner Lady
  - Banner Bearer
  - Flower Girl
  - Bubble Girl
  - Candle Sponsor
  - Cord Sponsor
  - Veil Sponsor
  - Guest / Special Guest
- Improved the floral borders at the top and bottom so they no longer look cut off.
- Added an opening envelope animation before the invitation appears.
- Expanded the invitation link builder with all roles.

## Files included
- `index.html` - main invitation website
- `styles.css` - website styling
- `app.js` - personalization, interaction, and envelope animation
- `config.js` - optional Google Form connection
- `assets/` - floral and illustration assets
- `tools/invite-builder.html` - helper page to generate personalized links

## How to personalize each invitation
Publish the website once, then use the builder:
1. Open `tools/invite-builder.html` in your browser.
2. Enter your published site URL.
3. Add names under each role.
4. Generate personal links.
5. Send each person their own link.

Example link:
`https://your-site.com/index.html?name=Sofia%20Reyes&role=bridesmaid`

## Google Form connection is ready

The actual Google Form's question IDs supplied by Alfred are already saved in `config.js`. No additional pre-filled link or JavaScript editing is needed. The site reads each visitor's `?name=...&role=...` and opens the same form with their name, selected role, and chosen Yes / Need time answer pre-filled.

**Guests must still press Submit on Google Forms for you to receive their answer.** See `GOOGLE-FORM-SETUP.md` for testing and information about the role dropdown labels.

If your website is already published, upload the full contents of this revised folder (including the new `config.js`) to your hosting provider. Existing personal invitation links continue to work.

## Notes
- The Guest / Special Guest role is a gentle placeholder. You can keep it or rename it later if you decide on a better label.
- For the best effect, share the invitation link in a browser where JavaScript is enabled.

## Envelope fix
The opening screen now uses a correctly folded, layered envelope; tapping it lifts the letter out before revealing the invitation.
