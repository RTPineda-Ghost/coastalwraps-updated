# Opening your updated Coastal Wraps website

1. Download the updated ZIP.
2. In Windows File Explorer, right-click the ZIP and select **Extract All**.
3. Open the extracted **coastalwraps-updated** folder.
4. Double-click **index.html** to open the homepage in your browser.
5. In VS Code, choose **File > Open Folder** and select that same folder to edit it.

Open the extracted files rather than previewing files inside the ZIP. Keep all
the folders together. Your previous project folder can stay as a backup.

The root index.html opens HTMLS/index.html. You can also open HTMLS/index.html
directly, as you did before. If you already use a VS Code preview extension,
serve the whole coastalwraps-updated folder.

## What was repaired

- Fixed the extra quotation mark in the homepage stylesheet link.
- Connected every HTML page to the correct CSS, scripts, logos, and photos.
- Fixed the homepage background image path, which is relative to its CSS file.
- Replaced missing service gallery placeholders with your actual uploaded photos.
- Kept your existing page filenames and folder names.
- Used a consistent black header and blue accents across all pages.
- Reworked header and grid CSS for desktop, tablet, and phone widths.
- Added one shared photo list and reusable slideshow code.
- Added full-size photo dialogs, keyboard arrows, captions, and photo counters.
- Made homepage service cards navigate directly to their service pages.
- Fixed the workspace file so it opens this extracted project folder.
- Reduced 30 large website photo copies for faster loading, while keeping their
  filenames. All 63 uploaded image files are included. Use your original upload
  for full-resolution source images.

## Commercial Wraps

Open **HTMLS/fleet-graphics.html**. It now contains 33 project photos in the
slideshow and six featured projects beneath it. The photos stay fully visible;
the gallery does not crop vehicles or signage to fill a frame.

The uploaded folder did not contain the Breakwater Fence photo or the separately
named Crabby Plumber Side photo from your earlier list. The available Crabby
Plumber rear, passenger-side, and rear passenger-side photos are included.
Delaware Dryer Vents and the additional Breakers shuttle photo are included too.

The other service pages use the real photos available in this ZIP. The tint
page currently has one vehicle photo. The color-change page has three
color-change photos. Additional residential tint and PPF photos can be added
when you have them.

## Two account connections still needed

Open **site-config.js** in VS Code.

- Set **instagramUrl** to the full URL of the real Coastal Wraps Instagram
  profile. Instagram links appear once this is filled in.
- Set **formspreeEndpoint** to the form endpoint from your Formspree dashboard.
  It has the shape https://formspree.io/f/ followed by your form ID.

While the Formspree endpoint is empty, the form's **Prepare Email Request**
button opens an email draft. The customer must send that draft in their email
app. The website does not claim a request has been delivered in this mode.
If an email app does not open, the page provides the shop's phone number.

Once Formspree is configured, the button changes to **Request a Free Quote**
and sends the form to that endpoint. Confirm the receiving address in your
Formspree account and send a real test request before publishing.

## How to edit

| What to change | File or folder |
| --- | --- |
| Homepage text and quote fields | HTMLS/index.html |
| Commercial Wraps page and featured cards | HTMLS/fleet-graphics.html |
| Shared header, footer, and photo dialog styles | Styles/common.css |
| Homepage layout | Styles/style.css |
| Service-page layout | Styles/service-page.css |
| Slideshow photo lists, captions, and image descriptions | gallery-data.js |
| Instagram and Formspree URLs | site-config.js |
| Form delivery and full-size photo viewer | script.js |
| Service-page slideshow controls | service-page.js |

New photos can stay in your existing folders. Add an entry to the matching
gallery in gallery-data.js. Photo paths there are relative to this project
folder, for example Commercial/your-photo.jpg. Static images in HTMLS pages
start with ../ to reach those folders. Paths in CSS are relative to the CSS
file. Capitalization and filenames must match exactly.

## Checks completed

- All eight HTML files passed structural and local-link checks.
- All 184 HTML/CSS file and anchor references resolve.
- All 54 photo entries across the six gallery lists point to existing files.
  Some photos appear in more than one gallery.
- All four JavaScript files passed syntax checks.
- The actual scripts passed local behavior checks for next/previous wrapping,
  one-photo controls, full-size gallery selection, and keyboard arrows.
- Email draft generation and optional Instagram configuration passed local
  checks. Formspree success and failure handling passed with simulated responses.
  No real messages were sent.

Browser preview access was blocked in the editing environment. Rendered layout,
native dialog focus behavior, actual email-app opening, and real Formspree
delivery still need to be checked in your browser.

## Before publishing

1. Open the homepage and each of the six service cards.
2. Check the Commercial Wraps arrows, counter, and full-size photo viewer.
3. Check the pages on a phone and in a narrow desktop browser window.
4. Connect Instagram and Formspree, then test a real quote submission.
5. Confirm the phone, email, and footer location. The location remains
   **19975 Shelbyville, DE**, as supplied in your original code.
6. Add any remaining service photos and confirm the project descriptions.

This is a local project ready for your review. It has not been published.
