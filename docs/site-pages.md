# Indexable pages (submit to GSC / Bing Webmaster / IndexNow)

Source of truth: `src/app/sitemap.ts`. Update this list whenever a page is added there.

## Core pages
1. https://ikrypt.com
2. https://ikrypt.com/about
3. https://ikrypt.com/security
4. https://ikrypt.com/contact
5. https://ikrypt.com/privacy
6. https://ikrypt.com/terms

## Blog
7. https://ikrypt.com/blog
8. https://ikrypt.com/blog/password-sharing-mistakes
9. https://ikrypt.com/blog/how-to-send-password-via-email-securely
10. https://ikrypt.com/blog/why-you-should-never-share-passwords-in-slack

## Long-tail SEO pages
11. https://ikrypt.com/share-password-securely
12. https://ikrypt.com/send-api-key-securely
13. https://ikrypt.com/one-time-secret-link
14. https://ikrypt.com/share-env-file-securely

## Deliberately excluded (not for submission)
- `/healthcare` — noindex, early-interest waitlist page, removed from nav/sitemap
- `/s/[id]` — noindex, dynamic per-secret view page
- `/sent` — noindex, post-create confirmation page
- `/api/*` — disallowed in robots.txt

## Notes
- IndexNow (`scripts/submit-indexnow.ts`) auto-submits this exact list to Bing/Yandex on every deploy via the `postbuild` hook — no manual action needed there.
- GSC and Bing Webmaster Tools have no equivalent auto-push for regular pages; those still require manual URL Inspection / submission if you want faster indexing confirmation than a natural crawl.
- 6 more long-tail pages are planned per the original SEO audit but not yet built: `/slack-password-sharing-alternative`, `/email-password-sharing-alternative`, `/send-login-credentials-securely`, `/secure-password-sharing-for-contractors`, `/secure-secret-sharing-for-freelancers`, `/temporary-secret-link`.
