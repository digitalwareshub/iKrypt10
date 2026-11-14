# Firebase and infrastructure verification (manual, read-only)

These checks need access to the production Firebase project and Vercel/Cloudflare
dashboards, which the code session did not have. Each step is **read-only**
unless explicitly marked *change, needs owner approval*.

Audit references: S4, S5, S8 and §18 in
[IKRYPT_CODEBASE_SECURITY_AND_REVENUE_AUDIT_2026-11-14.md](IKRYPT_CODEBASE_SECURITY_AND_REVENUE_AUDIT_2026-11-14.md).

---

## 0. Which Firebase project production uses

**`ikrypt-95f1d` (high confidence).** The TTL policy for the `secrets` collection, which only the current code uses, exists in this project (§1). Evidence, 14 Nov 2026:
- Local `.env.local` sets `FIREBASE_ADMIN_PROJECT_ID=ikrypt-95f1d`.
- The `NEXT_PUBLIC_FIREBASE_API_KEY` value in Vercel (All Environments) is identical to the local one, which belongs to `ikrypt-95f1d`.
- A service-account key file for `ikrypt-95f1d` is referenced in `.gitignore` from the 4 July Admin SDK migration, the same date the Vercel `FIREBASE_ADMIN_*` variables were added.
- The `FIREBASE_ADMIN_*` values are Sensitive in Vercel and cannot be displayed, so they were not read directly.

Conclusive check: Firebase console → `ikrypt-95f1d` → Firestore → **Usage**, then create a test secret on ikrypt.com and confirm a write appears.

Notes from the Vercel environment-variable screen:
- `FIREBASE_ADMIN_*` apply to **Production and Preview**, so branch previews write to the production database. *(Owner decision: separate Preview project, or avoid creating secrets on previews.)*
- `RESEND_API_KEY` and `UPSTASH_REDIS_REST_TOKEN` show "Needs Attention": not marked Sensitive. *(Owner action: Edit → mark Sensitive.)*
- `NEXT_PUBLIC_FIREBASE_*` are no longer used by any code (the browser Firebase SDK was removed) and can be deleted after this branch is in production.

## 1. Firestore TTL policy on `secrets.expiresAt` (S4) ✅ VERIFIED 14 Nov 2026

**Confirmed by the owner in the Google Cloud console (project `ikrypt-95f1d`, database `(default)`):**
collection group `secrets`, timestamp field `expiresAt`, status **Serving**, expiry offset 0 s.

Related observations from the same console session:
- No `secrets` collection is currently visible. That is consistent with TTL plus delete-on-final-view leaving it empty at low traffic.
- **Legacy collections `one-time-messages` and `chat-rooms` still exist** (from the earlier product; e.g. a message that expired on 2025-12-06 still present). The TTL policy does not cover them and no current code uses them. *Recommended, owner decision:* export if needed for records, then delete both collections.

The original instructions follow for reference.

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
`usageStats/{YYYY-MM-DD}`: totals only (`created`, settings chosen such as `createdExpiry24h` /
`createdViews1` / `createdWithNotify`, `revealed`, `finalViewDeleted`, `rejectedInvalid`,
`rejectedRateLimited`, `unavailable*`). No IDs, IPs, emails or content.

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

**Confirmed 14 Nov 2026:** the Vercel team "Digiwares" is on **Pro**, so commercial use is permitted. No action needed.

## 8. Resend: reveal-notification emails ✅ RESOLVED 14 Nov 2026

**Outcome:** the owner ran Resend's Cloudflare auto-configure, deleted the conflicting TXT
`v=spf1 include:amazonses.com ~all` on `send`, and Resend verified the domain at 19:42 local time.
A test through the production code path (`npm run email:test -- delivered@resend.dev`)
was **delivered** (`last_event: delivered`, from `iKrypt <notifications@ikrypt.com>`).
Remaining optional item: the DMARC TXT `_dmarc` → `v=DMARC1; p=none;` was not yet visible in DNS.

The original diagnosis follows for the record.

Checked 14 Nov 2026 via the Resend API (read-only) and public DNS:

- The domain `ikrypt.com` exists in Resend (created 14 Nov 2026) with status **`not_started`**.
- A real send through the production code path to Resend's test address returned
  *"The ikrypt.com domain is not verified."* No notification email can be delivered until this is fixed.
  (Before this branch, the code treated that error as success and logged nothing.)

| Record | Name | Value | Current DNS |
|---|---|---|---|
| DKIM (TXT) | `resend._domainkey` | `p=MIGfMA0G…` (as shown in Resend) | ✅ present and matching |
| SPF / return path (CNAME) | `send` | `send.forge.rmta.net` | ❌ missing. An old TXT `v=spf1 include:amazonses.com ~all` sits on `send` |
| SPF / return path (CNAME) | `rsend` | `rsend-apne1.forge.rmta.net` | ❌ missing |

*Change, needs owner approval*, in **Cloudflare → ikrypt.com → DNS**:
1. Delete the old **TXT** record on `send` (`v=spf1 include:amazonses.com ~all`) and any old **MX** record on `send`. A CNAME cannot coexist with other records on the same name.
2. Add **CNAME** `send` → `send.forge.rmta.net`, **Proxy status: DNS only** (grey cloud).
3. Add **CNAME** `rsend` → `rsend-apne1.forge.rmta.net`, **DNS only**.
4. Keep the existing DKIM TXT `resend._domainkey`.
5. Optional but recommended: a DMARC record, TXT `_dmarc` → `v=DMARC1; p=none; rua=mailto:<your address>`.
6. In **Resend → Domains → ikrypt.com**, click **Verify DNS records**. Wait for *Verified*.

Always copy the values from the Resend dashboard; it is the source of truth if they differ from the table above.

Then confirm delivery end to end (sends exactly one email):
```
npm run email:test -- you@example.com
```
