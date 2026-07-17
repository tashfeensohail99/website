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
  /**
   * Unconfirmed placeholder. Renders visibly as a gap and HARD-FAILS the
   * production build (see assertLawyersPublishable). Delete the flag only when
   * every other field on the entry is true and checkable.
   */
  demo?: true;
};

/**
 * The published roster. EMPTY on purpose — the firm has not yet supplied
 * confirmable credentials, so the team page renders a dignified "profiles coming
 * soon" state rather than fabricating anything. That is a deliberate launch
 * decision, not an oversight.
 *
 * To publish the real team, paste one entry per lawyer below:
 *
 *   { name: 'Full Name As On Licence',
 *     credential: 'Advocate, High Court' | 'RCIC #R######',   // + issuing body
 *     practice: 'What they actually handle',
 *     since: '2015',                        // optional; omit rather than guess
 *     verifyUrl: 'https://public-register/...',  // optional but ideal
 *     photo: '/team/name.jpg' },            // a real photograph, never stock
 *
 * Names the firm has NAMED but not yet credentialed (do NOT publish a guessed
 * credential for any of them — attached to a real person it is a false claim
 * about a regulated qualification):
 *   • Raja Arslan Arslan  (CRM; confirm spelling on the licence)
 *   • Abdullah Tippu       (CRM; confirm spelling on the licence)
 *   • Ayesha               (not in CRM — full name needed)
 *   • Ayesha               (second person, same first name — must disambiguate)
 *
 * assertLawyersPublishable() below HARD-FAILS the production build on any entry
 * missing a credential/practice or still flagged demo:true — so it is impossible
 * to accidentally ship an unconfirmed one.
 */
export const lawyers: Lawyer[] = [];

/**
 * Refuses to build for production while any placeholder remains.
 *
 * The whole promise of this site is "we are real lawyers, go and check". Demo
 * entries shipping to the live domain would falsify precisely that claim, on
 * the one page it is made. A visible banner is not enough — banners get
 * overlooked at 2am on a launch day. This throws.
 */
export function assertLawyersPublishable(): void {
  if (process.env.NODE_ENV !== 'production') return;
  const bad = lawyers.filter((l) => l.demo || !l.credential.trim() || !l.practice.trim());
  if (bad.length) {
    throw new Error(
      `Refusing to build: ${bad.length} lawyer(s) still placeholder — ${bad
        .map((l) => l.name)
        .join(', ')}. Fill in credential + practice and remove \`demo: true\` in lib/site.ts. ` +
        'Never invent a credential for a named person.',
    );
  }
}

/** Lawyers that are safe to state publicly. Empty while the roster is demo. */
export const publishableLawyers = (): Lawyer[] => lawyers.filter((l) => !l.demo);

/** The lawyer named on the homepage and on bylines where only one fits. */
export const leadLawyer = (): Lawyer | undefined => publishableLawyers()[0];

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
