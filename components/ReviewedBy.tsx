import Link from 'next/link';
import { leadLawyer } from '@/lib/site';

/**
 * The byline on every advice page.
 *
 * Immigration is a "your money or your life" topic: Google holds it to a higher
 * standard, and a named, checkable professional is exactly the signal it looks
 * for — as does a reader who has been warned about immigration scams their whole
 * life. Same fact serves both audiences.
 *
 * `updated` must be a real review date, not a build timestamp. A page that
 * claims to be current and isn't is worse than one with no date at all.
 */
export function ReviewedBy({ updated }: { updated: string }) {
  const lawyer = leadLawyer();
  // Hide the date if it's still a placeholder like "[date of last legal review]"
  // — a bracketed stub is worse than no date. A real date shows; a stub is dropped.
  const showDate = Boolean(updated) && !updated.trim().startsWith('[');

  return (
    <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-rule pt-4 text-sm text-ink-400">
      <span>
        Reviewed by{' '}
        <Link href="/about/our-team" className="font-semibold text-ink-600 underline">
          {lawyer ? lawyer.name : 'the Tashfeen legal team'}
        </Link>
        {lawyer?.credential ? `, ${lawyer.credential}` : ''}
      </span>
      {showDate ? (
        <>
          <span aria-hidden="true">·</span>
          <span>Last reviewed {updated}</span>
        </>
      ) : null}
    </div>
  );
}
