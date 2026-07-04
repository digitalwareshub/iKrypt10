/**
 * Submits all sitemap URLs to IndexNow (Bing, Yandex, and other participating
 * search engines) so they're notified of content changes without waiting for
 * a crawl. This does not guarantee indexing or ranking — it only shortens the
 * time between a deploy and a search engine noticing the URL changed.
 *
 * Runs automatically after each production build (see package.json "postbuild").
 * Silently no-ops if it can't reach the endpoint — never fails the build.
 */
import sitemap from '../src/app/sitemap';

const INDEXNOW_KEY = '35c26a6512d8f68d868edd81c1609c66';
const HOST = 'ikrypt.com';
const KEY_LOCATION = `https://${HOST}/${INDEXNOW_KEY}.txt`;
const ENDPOINT = 'https://api.indexnow.org/indexnow';

async function main() {
  const entries = sitemap();
  const urlList = entries.map((entry) => entry.url);

  if (urlList.length === 0) {
    console.log('No URLs to submit to IndexNow.');
    return;
  }

  const body = {
    host: HOST,
    key: INDEXNOW_KEY,
    keyLocation: KEY_LOCATION,
    urlList,
  };

  try {
    const response = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify(body),
    });

    if (response.ok) {
      console.log(`IndexNow: submitted ${urlList.length} URLs (status ${response.status}).`);
    } else {
      console.warn(`IndexNow: submission returned status ${response.status}. Continuing anyway.`);
    }
  } catch (err) {
    console.warn('IndexNow: submission failed, continuing build.', err instanceof Error ? err.message : err);
  }
}

main();
