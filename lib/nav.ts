/**
 * The site's information architecture.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * WHY THIS FILE EXISTS, AND THE RULE THAT GOVERNS IT
 *
 * The site is deliberately BROAD and EVERGREEN. An earlier version was scoped
 * narrowly around the firm's recent case mix, which was a mistake: the mix
 * changes, and a site built around last quarter's clients is stale the moment it
 * ships. Someone arriving with a spousal sponsorship question should find a
 * spousal sponsorship page, whether or not that is this month's busy service.
 *
 * EVERGREEN IS DEFINED STRUCTURALLY, NOT NUMERICALLY. Pages explain who a
 * programme is for, what it requires in kind, and how the process runs. They
 * carry NO volatile numbers — no fees, no draw cut-offs, no processing times, no
 * quotas, no per-country approval rates. Those are exactly the facts that go
 * stale fastest AND that get invented most easily, and this project has already
 * had to remove a fabricated approval-rate statistic once. Volatile facts link
 * out to the official source instead of being copied here.
 *
 * That rule is what makes broad coverage safe. Without it, breadth is just
 * surface area for being wrong.
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * STATUS. Nothing renders in the menu until the page exists. `planned` entries
 * are the build queue, kept here so the intended shape is visible and so nobody
 * has to reconstruct it. The site has never shipped a dead link and should not
 * start now.
 */

export type NavStatus = 'live' | 'planned';

export type NavItem = {
  href: string;
  label: string;
  status: NavStatus;
  /** One line, shown in the mega-menu under wider entries. */
  blurb?: string;
};

export type NavGroup = {
  label: string;
  /** Optional landing page for the whole section. */
  href?: string;
  status: NavStatus;
  columns: { heading?: string; items: NavItem[] }[];
};

export const NAV: NavGroup[] = [
  {
    label: 'Immigration Programs',
    href: '/immigration-programs',
    status: 'live',
    columns: [
      {
        heading: 'Express Entry',
        items: [
          { href: '/express-entry', label: 'Express Entry overview', status: 'live' },
          { href: '/express-entry/federal-skilled-worker', label: 'Federal Skilled Worker', status: 'live' },
          { href: '/express-entry/canadian-experience-class', label: 'Canadian Experience Class', status: 'live' },
          { href: '/express-entry/federal-skilled-trades', label: 'Federal Skilled Trades', status: 'live' },
          { href: '/express-entry/category-based-draws', label: 'Category-based draws', status: 'planned' },
        ],
      },
      {
        heading: 'Provincial Nominee Programs',
        items: [
          { href: '/pnp', label: 'How the PNP works', status: 'live' },
          { href: '/pnp/ontario', label: 'Ontario (OINP)', status: 'planned' },
          { href: '/pnp/british-columbia', label: 'British Columbia (BC PNP)', status: 'planned' },
          { href: '/pnp/alberta', label: 'Alberta (AAIP)', status: 'planned' },
          { href: '/pnp/saskatchewan', label: 'Saskatchewan (SINP)', status: 'planned' },
          { href: '/pnp/manitoba', label: 'Manitoba (MPNP)', status: 'planned' },
          { href: '/pnp/nova-scotia', label: 'Nova Scotia (NSNP)', status: 'planned' },
          { href: '/pnp/new-brunswick', label: 'New Brunswick (NBPNP)', status: 'planned' },
          { href: '/pnp/prince-edward-island', label: 'Prince Edward Island (PEI PNP)', status: 'planned' },
          { href: '/pnp/newfoundland-labrador', label: 'Newfoundland & Labrador (NLPNP)', status: 'planned' },
        ],
      },
      {
        heading: 'Family & other routes',
        items: [
          { href: '/family-sponsorship', label: 'Family sponsorship', status: 'live' },
          { href: '/family-sponsorship/spouse-partner', label: 'Spouse or partner', status: 'planned' },
          { href: '/family-sponsorship/parents-grandparents', label: 'Parents & grandparents', status: 'planned' },
          { href: '/family-sponsorship/dependent-children', label: 'Dependent children', status: 'planned' },
          { href: '/atlantic-immigration-program', label: 'Atlantic Immigration Program', status: 'planned' },
          { href: '/rural-community-immigration', label: 'Rural & northern immigration', status: 'planned' },
          { href: '/caregivers', label: 'Caregiver routes', status: 'planned' },
          { href: '/business-immigration', label: 'Business & investment', status: 'planned' },
          { href: '/quebec-immigration', label: 'Quebec programs', status: 'planned' },
        ],
      },
    ],
  },

  {
    label: 'Study in Canada',
    href: '/study-in-canada',
    status: 'live',
    columns: [
      {
        heading: 'Getting there',
        items: [
          { href: '/study-in-canada/study-permit', label: 'Canadian study permit', status: 'planned' },
          { href: '/study-in-canada/provincial-attestation-letter', label: 'Provincial attestation letter', status: 'planned' },
          { href: '/study-in-canada/designated-learning-institutions', label: 'Designated learning institutions', status: 'planned' },
          { href: '/study-in-canada/proof-of-funds', label: 'Proving your funds', status: 'planned' },
          { href: '/study-in-canada/refusals', label: 'Study permit refusals', status: 'planned' },
        ],
      },
      {
        heading: 'While you are there, and after',
        items: [
          { href: '/study-in-canada/working-while-studying', label: 'Working while studying', status: 'planned' },
          { href: '/study-in-canada/study-permit-extension', label: 'Extending a study permit', status: 'planned' },
          { href: '/work-permits/post-graduation', label: 'Post-graduation work permit', status: 'planned' },
          { href: '/study-in-canada/bringing-family', label: 'Bringing your family', status: 'planned' },
          { href: '/study-in-canada/study-to-permanent-residence', label: 'From study to permanent residence', status: 'planned' },
        ],
      },
    ],
  },

  {
    label: 'Work Permits',
    href: '/work-permits',
    status: 'live',
    columns: [
      {
        heading: 'With an employer',
        items: [
          { href: '/work-permits/lmia', label: 'LMIA-based work permits', status: 'live' },
          { href: '/work-permits/global-talent-stream', label: 'Global Talent Stream', status: 'planned' },
          { href: '/work-permits/intra-company-transfer', label: 'Intra-company transfer', status: 'planned' },
          { href: '/work-permits/post-graduation', label: 'Post-graduation work permit', status: 'planned' },
          { href: '/work-permits/caregivers', label: 'Caregiver work permits', status: 'planned' },
        ],
      },
      {
        heading: 'Without a Canadian employer',
        items: [
          { href: '/work-permit-canada', label: 'Owner-operator route', status: 'live', blurb: 'Running your own business rather than being hired' },
          { href: '/work-permits/lmia-exempt', label: 'LMIA-exempt work permits', status: 'live' },
          { href: '/work-permits/spousal-open-work-permit', label: 'Spousal open work permit', status: 'planned' },
          { href: '/work-permits/international-experience-canada', label: 'International Experience Canada', status: 'planned' },
          { href: '/work-permits/bridging-open-work-permit', label: 'Bridging open work permit', status: 'planned' },
        ],
      },
    ],
  },

  {
    label: 'Visitor Visa',
    href: '/visitor-visa',
    status: 'live',
    columns: [
      {
        items: [
          { href: '/canada-visit-visa', label: 'Canada visitor visa (TRV)', status: 'live' },
          { href: '/visitor-visa/super-visa', label: 'Super Visa for parents & grandparents', status: 'live' },
          { href: '/visitor-visa/eta', label: 'Electronic Travel Authorisation', status: 'planned' },
          { href: '/visitor-visa/extension', label: 'Extending a visit', status: 'planned' },
          { href: '/visitor-visa/business-visitor', label: 'Business visitors', status: 'planned' },
          { href: '/visitor-visa/invitation-letter', label: 'Invitation letters', status: 'planned' },
        ],
      },
    ],
  },

  {
    label: 'Refused?',
    href: '/canada-visa-refused',
    status: 'live',
    columns: [
      {
        items: [
          { href: '/canada-visa-refused', label: 'What to do after a refusal', status: 'live' },
          { href: '/refusals/gcms-notes', label: 'The officer’s notes', status: 'live' },
          { href: '/refusals/reconsideration', label: 'Reconsideration requests', status: 'planned' },
          { href: '/refusals/judicial-review', label: 'Judicial review', status: 'planned' },
          { href: '/refusals/re-applying', label: 'Re-applying after a refusal', status: 'planned' },
          { href: '/refusals/misrepresentation', label: 'Misrepresentation findings', status: 'planned' },
        ],
      },
    ],
  },

  {
    label: 'Tools',
    href: '/tools',
    status: 'live',
    columns: [
      {
        heading: 'Calculators',
        items: [
          { href: '/tools/crs-calculator', label: 'Express Entry CRS calculator', status: 'live' },
          { href: '/tools/fsw-67-calculator', label: 'FSW 67-point calculator', status: 'planned' },
          { href: '/tools/citizenship-calculator', label: 'Citizenship residency calculator', status: 'planned' },
          { href: '/tools/clb-converter', label: 'Language score to CLB converter', status: 'planned' },
        ],
      },
      {
        heading: 'Eligibility checks',
        items: [
          { href: '/tools/work-permit-eligibility', label: 'Work permit without a job offer', status: 'live' },
          { href: '/tools/visit-visa-refusal-risk', label: 'Visit visa refusal risk', status: 'live' },
          { href: '/tools/super-visa-eligibility', label: 'Super Visa eligibility', status: 'planned' },
          { href: '/tools/refusal-decoder', label: 'Refusal letter decoder', status: 'planned' },
        ],
      },
    ],
  },

  {
    label: 'Other countries',
    status: 'live',
    columns: [
      {
        items: [
          { href: '/usa', label: 'United States', status: 'live' },
          { href: '/uk', label: 'United Kingdom', status: 'live' },
          { href: '/europe', label: 'Europe & Schengen', status: 'live' },
        ],
      },
    ],
  },

  {
    label: 'About',
    href: '/about',
    status: 'live',
    columns: [
      {
        items: [
          { href: '/about', label: 'About the firm', status: 'live' },
          { href: '/about/our-team', label: 'Our people', status: 'live' },
          { href: '/fees', label: 'Fees', status: 'live' },
          { href: '/no-guarantee-policy', label: 'No-guarantee policy', status: 'live' },
          { href: '/book-consultation', label: 'Book a consultation', status: 'live' },
        ],
      },
    ],
  },
];

/**
 * Only what actually exists. The menu never renders a link to a 404.
 *
 * A group's own landing page ("All work permits →") is governed by the GROUP's
 * status, not by whether that href also appears as an item — hub pages are
 * usually not listed among their own children.
 */
export function liveNav(): NavGroup[] {
  return NAV.map((g) => ({
    ...g,
    href: g.status === 'live' ? g.href : undefined,
    columns: g.columns
      .map((c) => ({ ...c, items: c.items.filter((i) => i.status === 'live') }))
      .filter((c) => c.items.length > 0),
  })).filter((g) => g.columns.length > 0);
}

/** Every route the nav claims exists — used to keep the sitemap honest. */
export function liveHrefs(): string[] {
  const items = NAV.flatMap((g) => g.columns.flatMap((c) => c.items))
    .filter((i) => i.status === 'live')
    .map((i) => i.href);
  const hubs = NAV.filter((g) => g.status === 'live' && g.href).map((g) => g.href!);
  return [...new Set([...hubs, ...items])].sort();
}

/** The build queue, in order. Useful for tracking how much of the IA is real. */
export function plannedPages(): NavItem[] {
  const seen = new Set<string>();
  return NAV.flatMap((g) => g.columns.flatMap((c) => c.items))
    .filter((i) => i.status === 'planned')
    .filter((i) => (seen.has(i.href) ? false : (seen.add(i.href), true)));
}

export function navCoverage(): { live: number; planned: number } {
  const all = NAV.flatMap((g) => g.columns.flatMap((c) => c.items));
  const uniq = new Map(all.map((i) => [i.href, i]));
  const items = [...uniq.values()];
  return {
    live: items.filter((i) => i.status === 'live').length,
    planned: items.filter((i) => i.status === 'planned').length,
  };
}
