# Firebase and infrastructure verification (manual, read-only)

These checks need access to the production Firebase project and Vercel/Cloudflare
dashboards, which the code session did not have. Each step is **read-only**
unless explicitly marked *change, needs owner approval*.

Audit references: S4, S5, S8 and §18 in
[IKRYPT_CODEBASE_SECURITY_AND_REVENUE_AUDIT_2026-11-14.md](IKRYPT_CODEBASE_SECURITY_AND_REVENUE_AUDIT_2026-11-14.md).

---

## 1. Firestore TTL policy on `secrets.expiresAt` (S4)

The site says expired secrets are removed by automatic cleanup. Confirm it exists.

1. Open <https://console.firebase.google.com> → the iKrypt project → **Firestore Database**.
2. Choose the **TTL** tab (in some console versions: **Indexes → TTL**).
3. Expected: a policy with collection group **`secrets`**, timestamp field **`expiresAt`**, state **Serving**.

| Result | Action |
|---|---|
| Policy exists and is *Serving* | Done. Record the date checked here. |
| No policy | *Change, needs owner approval:* **Create policy** → collection group `secrets` → field `expiresAt`. Google deletes expired documents, typically within 24 hours of expiry. No code change needed. |

CLI alternative (read-only):
`gcloud firestore fields ttls list --project=<PROJECT_ID>`

Also worth knowing: count records that are already expired, to see whether cleanup
has been happening. In **Firestore → Query builder**: collection `secrets`,
filter `expiresAt < now`. Any results older than ~48 hours mean TTL is not running.

## 2. Deployed Firestore rules (audit §18, item 4)

1. **Firestore Database → Rules**.
2. Expected (matches `firestore.rules` in the repo):
   ```
   match /{document=**} { allow read, write: if false; }
   ```
3. If anything else is live, *change, needs owner approval*: deploy the repo's
   rules with `firebase deploy --only firestore:rules`.

## 3. Deployed Cloud Storage rules (S5 — potentially High)

The repo's old `storage.rules` allowed **anyone** to upload 10 MB files to
`encrypted-files/` and read them publicly. It is no longer deployed by
`firebase.json`, but whatever was last deployed is still live.

1. **Storage** in the left menu. If it says Storage is not set up, there is no bucket: done.
2. **Storage → Rules**. If you see `allow read: if true` or an unauthenticated
   `allow write`, the bucket is open.
3. **Storage → Files**. Note whether `encrypted-files/` contains objects, and their dates.

If open, *change, needs owner approval*:
- Replace the rules with deny-all and publish:
  ```
  rules_version = '2';
  service firebase.storage {
    match /b/{bucket}/o {
      match /{allPaths=**} { allow read, write: if false; }
    }
  }
  ```
- Review the files in `encrypted-files/`, then delete them (the feature that used
  them was removed long ago).

## 4. Actual usage (audit §18, item 1)

New in this branch: once deployed, daily aggregate counters are written to
`usageStats/{YYYY-MM-DD}` (fields `created`, `revealed`, `finalViewDeleted`,
`unavailableExpired`, `unavailableMaxViews`, `unavailableNotFound`; no IDs, IPs
or content).

For **historical** usage before this change:
1. **Firestore Database → Data → `secrets`**. The document count shown is the
   number of secrets not yet revealed or cleaned up.
2. **Query builder** → collection `secrets`, order by `createdAt` descending → look
   at the dates of the most recent records.
3. **Usage** tab (Firestore) → writes per day for the last 30 days. Each created
   secret is one write; each reveal is one or two writes.
4. *Do not open individual documents unnecessarily.* They contain only ciphertext,
   but some contain a notification email address.

## 5. Vercel analytics data (S1)

Before this branch, Vercel Web Analytics received full URLs, including the `#k=`
decryption key, from secret-link visits.
1. Vercel → Project → **Analytics** → Pages. Check whether any listed page path
   shows a `#k=` value (expected: paths are shown without fragments, but confirm).
2. If keys are visible, consider *(owner decision)* contacting Vercel support to
   purge, or disabling and re-enabling Web Analytics to reset stored data.

Practical exposure is limited: one-view secrets were already deleted when
revealed, and every secret expires within 24 hours.

## 6. Cloudflare proxy and rate limiting (S8)

ikrypt.com is served through Cloudflare (orange-cloud proxy) in front of Vercel.
Vercel may then see Cloudflare's IP addresses instead of visitors' IPs, so many
visitors can share one rate-limit bucket.
1. Cloudflare → DNS → records for `ikrypt.com` and `www`. Check whether the cloud
   icon is orange (proxied) or grey (DNS only).
2. Vercel's guidance is to use **DNS only** (grey cloud) for domains on Vercel.
   *Change, needs owner approval:* switch both records to DNS only. Vercel then
   provides TLS, CDN and accurate client IPs.

## 7. Hosting plan (audit §18, item 5)

Vercel → Settings → **Billing**. Hobby plans are for non-commercial use under
Vercel's terms. Anything you charge for would need Pro.
