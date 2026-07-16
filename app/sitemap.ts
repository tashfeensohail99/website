import type { MetadataRoute } from 'next';
import { site } from '@/lib/site';
import { ROUTES } from '@/lib/routes';

/**
 * lastmod comes from lib/routes.ts — a real human review date, never the build
 * timestamp. Stamping every URL "today" on each deploy teaches Google the signal
 * is worthless, and it stops trusting it on the pages where it matters.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((r) => ({
    url: `${site.url}${r.path === '/' ? '' : r.path}`,
    lastModified: new Date(r.reviewed),
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
