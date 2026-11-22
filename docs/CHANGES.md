# Changes

## 2026-11-22 — Homepage hero proportions

- Reduced the fluid headline range from 52–101.6px to 42–80px and eased its letter spacing from -0.065em to -0.055em.
- Reduced top padding to 40px on phones, 56px on tablets, and 48–72px on desktops. Set the description and CTA margins to 20px and 24px.
- Reduced the desktop gap above the preview from 68px to 32px, changed its angle from -8° to -5°, and sized its stage to 54vh within 430–580px. Removed fixed hero minimum heights.
- On phones, used a 300px stage with a 24px gap and a -4° angle. Hid the decorative sidebar to show the preview’s secret field.
- In Chrome at 1440 × 900, the stage moved from y=711 to y=467. The preview heading, secret field, and link settings appear in the initial viewport.
- Inspected screenshots at 1920 × 1080, 1440 × 900, 1366 × 768, 390 × 844, and 375 × 667. Verified zero horizontal overflow, CTA navigation to the creation section, editable form input, and an enabled submit button after entry at each size. Lint, TypeScript, and the production build passed.

[Desktop and mobile comparison screenshots](design/hero-refinement/)
