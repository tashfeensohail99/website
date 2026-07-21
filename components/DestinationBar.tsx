'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { DESTINATIONS } from '@/lib/nav';
import { FlagCanada, FlagUK, FlagUSA, FlagEU } from '@/components/Flags';

/**
 * The four destinations, pinned to the utility bar on every page.
 *
 * These used to be a nav group called "Other countries" — seventh of eight,
 * behind a hover dropdown, and the only group without a landing page of its
 * own. The homepage meanwhile opens with four flags. So the site advertised
 * four destinations and then hid three of them one hover deep under a label
 * that named none of them.
 *
 * Making the dropdown prettier would not have fixed that. The fix is that
 * destinations are not a SERVICE you navigate to, they are the site's SCOPE —
 * so they are always on screen, and the menu below is free to be entirely about
 * Canada, which is what 90% of it always was.
 *
 * Client-side only because of `usePathname`: marking where you already are is
 * most of the value of a persistent bar, and there is no static equivalent in
 * an exported app. The cost is small and bounded — four links and a string
 * compare, no data fetching.
 */

const FLAGS: Record<string, (p: { className?: string }) => React.ReactElement> = {
  '/immigration-programs': FlagCanada,
  '/uk': FlagUK,
  '/usa': FlagUSA,
  '/europe': FlagEU,
};

export function DestinationBar() {
  const pathname = usePathname() || '/';

  /**
   * Canada is the default section, so it owns everything that is not explicitly
   * one of the other three. Prefix-matching `/uk` against `/uk-something` would
   * be wrong, hence the boundary check — cheap now, and the kind of thing that
   * quietly mislabels pages later once more routes exist.
   */
  const inSection = (href: string) => {
    if (href === '/immigration-programs') {
      return !['/uk', '/usa', '/europe'].some((p) => pathname === p || pathname.startsWith(`${p}/`));
    }
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <nav aria-label="Destinations" className="flex items-center gap-x-1">
      {DESTINATIONS.map((d) => {
        const Flag = FLAGS[d.href];
        const current = inSection(d.href);
        return (
          <Link
            key={d.href}
            href={d.href}
            aria-current={current ? 'page' : undefined}
            className={`tap inline-flex items-center gap-1.5 rounded-md px-2 transition-colors ${
              current ? 'text-white' : 'text-ink-300 hover:text-white'
            }`}
          >
            {Flag ? (
              <Flag
                className={`h-3 w-auto shrink-0 rounded-[1px] ring-1 ring-white/25 ${
                  current ? '' : 'opacity-80'
                }`}
              />
            ) : null}
            <span className={current ? 'border-b border-gold-500 pb-px' : ''}>{d.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
