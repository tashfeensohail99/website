/**
 * The old WordPress site is a cloned shop-theme demo carrying another firm's
 * branding alongside its theme's demo pages. Only the URLs that are genuinely
 * ours are worth their PageRank; everything else is served 410 Gone (see
 * lib/legacy-urls.ts) rather than redirected — bulk-redirecting unrelated pages
 * to the homepage reads to Google as a soft 404 and transfers nothing.
 *
 * [oldPath, newPath] — one hop each, no chains.
 *
 * EVERY TARGET MUST BE A PAGE THAT EXISTS. A redirect into a 404 is worse than
 * no redirect: it burns the old URL's equity and dead-ends a real person who
 * clicked a Google result. So entries point at the deepest page built SO FAR,
 * and get re-pointed to their spoke as each one ships — see PENDING below.
 */
const LEGACY_REDIRECTS = [
  ['/what-is-c11-entrepreneur-work-permit', '/work-permit-canada'],
  ['/the-canadian-c11-work-permit-everything-you-need-to-know', '/work-permit-canada'],
  ['/what-is-judicial-review', '/canada-visa-refused'],
  ['/reasons-behind-visa-rejection', '/canada-visa-refused'],
  ['/canada-immigration', '/'],
  ['/canadian-programs', '/'],
  ['/migrate-to-canada-from-dubai-and-be-a-part-of-a-vibrant-culture', '/'],
  ['/migrate-to-canada-from-uae-in-2022', '/'],
  ['/best-immigration-lawyers-in-pakistan', '/about/our-team'],
];

/**
 * PENDING — add these back the moment their target page ships, and re-point the
 * two C11 / refusal entries above to their spokes:
 *   /approved-cases                       → /success-stories
 *   /how-to-raise-your-express-entry-crs… → /answers/crs-score-explained
 *   /importance-of-crs-for-canadian-immi… → /answers/crs-score-explained
 *   /enquiry-consultation                 → /book-consultation
 *   /privacy-policy-2                     → /privacy
 *   /what-is-c11-entrepreneur-work-permit → /work-permit-canada/lmia-exempt-c11
 *   /what-is-judicial-review              → /canada-visa-refused/judicial-review
 *   /reasons-behind-visa-rejection        → /canada-visa-refused/common-refusal-reasons
 */

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Standalone output for Docker, same as apps/frontend.
  output: 'standalone',
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },

  async redirects() {
    // permanent:true emits 308, not 301. Google treats the two identically for
    // ranking signals, and 308 additionally preserves the request method — so
    // this is correct, just not the status people expect to see.
    return LEGACY_REDIRECTS.map(([source, destination]) => ({
      source,
      destination,
      permanent: true,
    }));
  },
};

module.exports = nextConfig;
