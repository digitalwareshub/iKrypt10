# Changes

## 2026-11-22 — Homepage hero proportions

- Reduced the fluid headline range from 52–101.6px to 42–80px and eased its letter spacing from -0.065em to -0.055em.
- Reduced top padding to 40px on phones, 56px on tablets, and 48–72px on desktops. Set the description and CTA margins to 20px and 24px.
- Reduced the desktop gap above the preview from 68px to 32px, changed its angle from -8° to -5°, and sized its stage to 54vh within 430–580px. Removed fixed hero minimum heights.
- On phones, used a 300px stage with a 24px gap and a -4° angle. Hid the decorative sidebar to show the preview’s secret field.
- In Chrome at 1440 × 900, the stage moved from y=711 to y=467. The preview heading, secret field, and link settings appear in the initial viewport.
- Inspected screenshots at 1920 × 1080, 1440 × 900, 1366 × 768, 390 × 844, and 375 × 667. Verified zero horizontal overflow, CTA navigation to the creation section, editable form input, and an enabled submit button after entry at each size. Lint, TypeScript, and the production build passed.

[Desktop and mobile comparison screenshots](design/hero-refinement/)

- Approved homepage revision `eb977a5` for release on the production branch.

## 2026-11-22 — Homepage below the hero

- Simplified the creation section around the working form and aligned the section headings with the hero.
- Combined link anatomy and security explanations in an annotated example that stacks on small screens.
- Replaced guide cards with linked rows and added a creation-limit question to the FAQ and its structured data.
- Verified the production build in Chrome at widths of 375, 390, 768, and 1440px. Checked horizontal overflow, hero CTA navigation, editable form input, notification toggling, submit availability, and the FAQ disclosure.
- [Desktop and mobile section previews](design/homepage-details/)

## 2026-11-22 — Supporting pages and hero restoration

- Restored the approved homepage hero markup and stage geometry. The angled interface sits beneath the CTA in normal flow.
- Applied shared sans-serif headings, left-aligned introductions, white primary actions, and section dividers across the guides, informational pages, and legal documents. Updated the contact form presentation and the confirmation, reveal, and missing-page typography.
- Added a sender-to-recipient diagram on Security, made the blog index scannable with thumbnail rows, and placed article titles before cover images.
- Lint and TypeScript passed and the production build completed. Verified 18 local routes at 1440px and 390px in Chrome, including hero placement, CTA navigation, a legal contents link, and page overflow. [Review screenshots](design/supporting-pages/)

## 2026-11-22 — Hero illustration spacing

- Moved the angled interface closer to the hero actions. Its left edge now begins 60px below the desktop button row, independent of viewport width. Reduced the mobile stage margin by 8px.
