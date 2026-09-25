# Google Forms connection: configured for Alfred & Jessa

Your existing Wedding Party Invitation Response Google Form is now connected. The website uses the actual question IDs from the pre-filled URL you supplied:

- Name: `entry.1707327502`
- Assigned Role: `entry.1174190854`
- Will you accept our invitation?: `entry.60447203`

You do not need to create another Google Form or generate a pre-filled link for each person. You do not need to edit `config.js` for these three fields: it is already configured.

## Try it locally

1. Extract the ZIP to a folder on your PC. Keep `index.html`, `styles.css`, `app.js`, and `config.js` together.
2. Open `index.html?name=Lucile+Cantillana&role=bridesmaid` locally, or use your own guest and role parameters.
3. Click the envelope. Click **Yes, I'd love to!** and then **Open pre-filled Google Form**.
4. Check that Name is **Lucile Cantillana**, Assigned Role is **Bridesmaid**, and the answer is **Yes, I'd love to! 💙**.
5. To test the alternative, go back and click **Let me think about it**. The form should select **I need more time to decide.**
6. Once the guest checks their details, they must click **Submit** in Google Forms. Opening a pre-filled form does not send a response.

## For other guests and roles

Use `tools/invite-builder.html` to create personal links after publishing the website. For example:

`https://YOUR-PUBLISHED-SITE/index.html?name=Marco+Santos&role=groomsman`

The website takes the visitor's name and role from its own URL and creates a **different Google Forms URL** with the name, matching role label, and selected answer.

**Important:** Your Google Form's **Assigned Role** question is a dropdown. Pre-filling a dropdown works only when the supplied value exactly matches a choice in your Google Form. This site currently uses `Groomsmen` for `role=groomsman` because that was the dropdown label in the earlier setup. If a particular role does not auto-select, check that option's spelling and capitalization in Google Forms and update the matching value in `FORM_ROLE_LABELS` in `app.js`. Name and answer pre-fill are independent of the role dropdown.

The invitation may be previewed from a `file:///C:/...` address on your own PC, but **that local address cannot be shared with guests**. To send links to others, publish the whole site on HTTPS (for example, with Netlify), including the newly configured `config.js`.

To view submitted replies, open your Google Form's **Responses** tab. You can optionally use **Link to Sheets** to collect replies in a spreadsheet.
