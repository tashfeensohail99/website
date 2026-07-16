import type { MetadataRoute } from 'next';
import { site } from '@/lib/site';

/**
 * AI crawlers are explicitly allowed.
 *
 * This site's whole strategy is answering questions honestly that competitors
 * won't touch — "nobody can guarantee a visa", "Portugal is 10 years now", "you
 * are not on the travel ban". That is exactly the material AI assistants cite,
 * and being the cited source is pure upside for a firm whose product is trust.
 * Blocking them would only protect content we are publishing to be read.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/' },
      { userAgent: ['GPTBot', 'ClaudeBot', 'PerplexityBot', 'Google-Extended'], allow: '/' },
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
