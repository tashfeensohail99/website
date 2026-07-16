import { site, lawyers } from '@/lib/site';

/**
 * Schema.org JSON-LD for the organisation and its offices.
 *
 * Three deliberate choices, each of which is a trap other sites fall into:
 *
 * 1. `ProfessionalService`, NOT `LegalService`/`Attorney`. The firm does employ
 *    lawyers, but the entity providing the service is a consultancy. Claiming to
 *    BE a legal practice in machine-readable markup, on a public site, is a
 *    claim a regulator can read as easily as Google can. Revisit only once the
 *    lawyer roster and its credentials are confirmed — and even then, only if
 *    a licensee genuinely is the provider.
 *
 * 2. No `Review` or `AggregateRating`. Self-applied ratings are ignored by
 *    Google and are manual-action bait on a YMYL site. Ratings must come from a
 *    platform that owns them, not from us about ourselves.
 *
 * 3. Each office is its own LocalBusiness with a distinct @id. Sharing one @id
 *    across locations merges them in Google's eyes and wastes the strongest
 *    asset the firm has — a real Canadian office alongside Pakistani ones.
 *
 * Offices without a confirmed address are omitted entirely rather than emitted
 * half-empty: incomplete NAP is worse than absent NAP, because it splits the
 * local signal instead of simply not making one.
 */
export function StructuredData() {
  const offices = site.offices.filter((o) => o.address);

  const graph: Record<string, unknown>[] = [
    {
      '@type': 'ProfessionalService',
      '@id': `${site.url}/#organization`,
      name: site.name,
      url: site.url,
      description:
        'International immigration firm with lawyers, and offices in Pakistan and Canada. Canada, USA, UK and Europe.',
      areaServed: ['PK', 'SA', 'AE', 'OM', 'QA', 'BH', 'GB', 'CA', 'US'],
      knowsAbout: [
        'Canadian work permits',
        'Canadian visitor visas',
        'Judicial review of visa refusals',
        'US investor visas',
        'UK Skilled Worker visas',
        'Schengen visitor visas',
      ],
      ...(offices.length ? { location: offices.map((o) => ({ '@id': `${site.url}/#office-${o.city.toLowerCase()}` })) } : {}),
      ...(lawyers.length
        ? {
            employee: lawyers.map((l) => ({
              '@type': 'Person',
              name: l.name,
              jobTitle: l.credential,
              ...(l.verifyUrl ? { sameAs: [l.verifyUrl] } : {}),
              ...(l.credential ? { hasCredential: l.credential } : {}),
            })),
          }
        : {}),
    },
    ...offices.map((o) => ({
      '@type': 'LocalBusiness',
      '@id': `${site.url}/#office-${o.city.toLowerCase()}`,
      name: `${site.name} — ${o.city}`,
      parentOrganization: { '@id': `${site.url}/#organization` },
      address: {
        '@type': 'PostalAddress',
        streetAddress: o.address,
        addressLocality: o.city,
        addressCountry: o.country === 'Pakistan' ? 'PK' : 'CA',
      },
      ...(o.phone ? { telephone: o.phone } : {}),
      ...(o.mapUrl ? { hasMap: o.mapUrl } : {}),
    })),
  ];

  return (
    <script
      type="application/ld+json"
      // Static, author-controlled data — no user input reaches this.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }),
      }}
    />
  );
}
