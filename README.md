# Foliage Cafe – website

Static site: `index.html`, `css/style.css`, `js/main.js`, `images/`. No build step. Open `index.html` in a browser, or upload the folder to any static host (Netlify, Vercel, GitHub Pages, Cloudflare Pages).

## Quick edits

| What | Where |
|---|---|
| Seasonal notice bar (Christmas hours, specials) | `js/main.js` → `NOTICE` |
| Opening hours used for "Open now" | `js/main.js` → `HOURS`, plus the hours table and footer in `index.html`, plus JSON-LD at the top of `index.html` |
| Menu items and prices | `index.html` → `#menu` (each dish is one `<li class="dish">`; `data-cat` sets the tab) |
| Colours and fonts | `css/style.css` → `:root` |

## Before handing over, confirm with the owner

- Opening hours (taken from the public Tripadvisor listing) and kitchen hours (from the printed menu)
- Current menu prices
- Contact email and Instagram handle
- Whether they want the meal deal (£6.99) shown

## Assets

- `images/logo-ink.png`, `logo-white.png`, `logo-gold.png`: logo traced from the window lettering photo, straightened and cut out on a transparent background. If the owner has the original artwork file, swap it in.
- Photos are resized to 1400px and 720px versions for responsive loading.
- Fonts: Courier Prime (matches the typewriter face on the menu) and Josefin Sans (close to the shop signage), via Google Fonts.
