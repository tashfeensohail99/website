/**
 * Single source of truth for the facts the marketing site states publicly.
 *
 * Anything a customer could act on — a fee, a deadline, a credential — lives
 * here so the site can never contradict itself across pages. On a YMYL site a
 * figure that drifts between two pages is a liability, not a typo.
 *
 * TODO(tashfeen): every value marked PLACEHOLDER must be replaced with a real,
 * verified fact before this site goes live. Do not guess them.
 */

export const site = {
  name: 'Tashfeen Immigration Solutions',
  shortName: 'Tashfeen Immigration',
  url: 'https://tashfeenimmigrationsolutions.com',
  /** An international firm — Canada, USA, UK and Europe. Not a Canada-only shop. */
  tagline: 'Immigration, handled by real lawyers.',

  /**
   * The WhatsApp Business number every CTA opens.
   *
   * DO NOT set this by hand. It is fetched at build time from the CRM's ACTIVE
   * WhatsAppChannel (see lib/wa-channel.ts) — the CRM is the single source of
   * truth. Hardcoding it here would mean switching the active channel in the
   * admin panel silently leaves the website pointing at a dead number.
   *
   * The env var below is only a local-dev escape hatch.
   */
  whatsappNumberFallback: process.env.NEXT_PUBLIC_WA_NUMBER ?? '',

  /** The paid consultation. Creditable against the service fee if they proceed. */
  consultFee: { amount: 5000, currency: 'PKR', creditable: true },

  /**
   * Real, visitable offices. Three of them, on two continents — this is the
   * firm's strongest answer to "are you a scam?", and the reason a Gulf-based
   * client trusts a Pakistani firm with a Canadian file.
   *
   * One canonical address string per office. It must match Google Business
   * Profile character-for-character or the local-SEO signal splits.
   */
  offices: [
    {
      city: 'Lahore',
      country: 'Pakistan',
      address: 'Office #201 & 202, 2nd Floor, HALY TOWER, Sector R, DHA Phase 2, Lahore',
      hours: '', // TODO(tashfeen)
      phone: '', // TODO(tashfeen)
      mapUrl: '', // TODO(tashfeen) — Google Business Profile link
    },
    {
      city: 'Islamabad',
      country: 'Pakistan',
      address: '', // TODO(tashfeen)
      hours: '',
      phone: '',
      mapUrl: '',
    },
    {
      city: 'Mississauga',
      country: 'Canada',
      address: '', // TODO(tashfeen)
      hours: '',
      phone: '',
      mapUrl: '',
    },
  ],
} as const;

/**
 * The destinations the firm actually works. Order = prominence in nav and on the
 * homepage, and it is set by what they SELL, not by what sounds impressive.
 *
 * Depth is deliberately uneven: Canada has 90 signed agreements behind it, the
 * USA has 2, and Schengen has none yet. Giving each country an identical stack
 * of pages would be doorway spam — Google is explicit about this, and a page
 * with nothing real to say ranks for nothing and damages the pages that do.
 * So: Canada gets a full hub, USA/UK get honest route pages, Europe gets one
 * page until demand justifies more.
 */
export type Destination = {
  slug: string;
  name: string;
  /** Nav label — short. */
  short: string;
  /** One line, in the customer's words, on why people go there. */
  blurb: string;
  /** 'hub' = full section with spokes · 'page' = one honest page. */
  depth: 'hub' | 'page';
};

export const destinations: Destination[] = [
  {
    slug: 'canada',
    name: 'Canada',
    short: 'Canada',
    blurb:
      'Work permits without a job offer, visit visas, and refusals fixed. Our largest practice — and we have an office in Canada.',
    depth: 'hub',
  },
  {
    slug: 'usa',
    name: 'United States',
    short: 'USA',
    blurb: 'Investor and intra-company routes for business owners, and visitor visas.',
    depth: 'page',
  },
  {
    slug: 'uk',
    name: 'United Kingdom',
    short: 'UK',
    blurb: 'Business, work and visitor routes for Pakistani applicants.',
    depth: 'page',
  },
  {
    slug: 'europe',
    name: 'Europe & Schengen',
    short: 'Europe',
    blurb: 'Schengen visitor visas, and residence routes into Europe.',
    depth: 'page',
  },
];

/**
 * The lawyers. This is the single most valuable asset on the site — every
 * competitor in this market is an anonymous "agent", and a named, checkable
 * lawyer is the one thing they cannot copy.
 *
 * Each entry drives: the homepage trust strip, /about/our-team, and the
 * "Reviewed by" byline on every advice page. Order matters — the first entry is
 * treated as the lead lawyer and is the one named on the homepage.
 *
 * PLACEHOLDER: could not be read from the CRM — the portal has 30 active staff
 * but zero designations and zero photos, and nobody is flagged as legal. The
 * firm is supplying this list. Until then the site renders an honest gap rather
 * than an invented name.
 */
export type Lawyer = {
  /** Full name as it appears on their licence. */
  name: string;
  /** Licence / registration + issuing body, e.g. "Advocate, High Court" or "RCIC #R######". */
  credential: string;
  /** What they actually handle — used on the team page, not decoration. */
  practice: string;
  /** Year they began practising. Omit rather than approximate. */
  since?: string;
  /** Public register entry so a sceptical reader can verify without asking us. */
  verifyUrl?: string;
  /** Path under /public. A real photograph — never a stock image. */
  photo?: string;
};

export const lawyers: Lawyer[] = [
  // TODO(tashfeen): full list pending from the firm. Confirmed so far (2026-07-17),
  // but NOT publishable yet — a first name without a credential invites the exact
  // question it is meant to answer ("called where? registered where?"), and on a
  // YMYL page an unverifiable claim of legal qualification is worse than silence:
  //
  //   • Arslan  — in the CRM as "Raja Arslan Arslan" (currently filed under Sales)
  //   • Tipu    — in the CRM as "Abdullah Tippu"     (currently filed under Sales)
  //   • Ayesha  — not in the CRM
  //   • Ayesha  — not in the CRM (second person of the same first name; needs
  //               disambiguating before either can be listed)
  //
  // Each still needs: full name as on the licence, credential + issuing body,
  // what they practise, and ideally a public-register link. Then paste as:
  // { name: '', credential: '', practice: '', since: '', verifyUrl: '', photo: '' },
];

/** The lawyer named on the homepage and on bylines where only one fits. */
export const leadLawyer = (): Lawyer | undefined => lawyers[0];

/** Canonical service codes — must match SERVICE_TYPE_CODES in the backend so a
 *  web lead lands in the CRM with a serviceInterest the funnel report understands.
 *  Note C11 has no code of its own: it maps to WORK_PERMIT. */
export const SERVICE = {
  WORK_PERMIT: 'WORK_PERMIT',
  VISIT_VISA: 'VISIT_VISA',
  JR_RESUBMISSION: 'JR_RESUBMISSION',
  STUDY_VISA: 'STUDY_VISA',
} as const;

export type ServiceCode = (typeof SERVICE)[keyof typeof SERVICE];
