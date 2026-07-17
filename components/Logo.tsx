/**
 * The Tashfeen mark + wordmark lockup.
 *
 * The monogram is a faithful SVG recreation of the firm's angular "T" — a bold
 * chamfered crossbar over a tapering stem, with a single gold facet for depth.
 * It is vector, so it stays razor-sharp at every size and weighs almost nothing.
 *
 * TO USE THE EXACT BRAND FILE: drop it at /public/logo.svg (or logo.png) and
 * replace <Monogram/> below with <img src="/logo.svg" alt="Tashfeen Immigration
 * Solutions" className="h-9 w-auto" />. Everything else here still applies.
 */

type Variant = 'dark' | 'light';

function Monogram({ variant, className }: { variant: Variant; className?: string }) {
  const mark = variant === 'light' ? '#ffffff' : '#0d1b2b';
  const facet = variant === 'light' ? '#c3a15c' : '#213a54';
  return (
    <svg
      viewBox="0 0 128 128"
      className={className}
      role="img"
      aria-label="Tashfeen Immigration Solutions"
    >
      {/* The T: chamfered crossbar + tapering stem, one continuous shape. */}
      <path
        fill={mark}
        d="M14 16 H114 V34 L92 56 H78 L70 104 L64 116 L58 104 L50 56 H36 L14 34 Z"
      />
      {/* Gold facet down the right of the stem — the folded-metal highlight. */}
      <path fill={facet} d="M64 16 L78 56 L70 104 L64 116 Z" />
    </svg>
  );
}

export function Logo({
  variant = 'dark',
  showWordmark = true,
  className = '',
}: {
  variant?: Variant;
  showWordmark?: boolean;
  className?: string;
}) {
  const wordTop = variant === 'light' ? 'text-white' : 'text-ink-900';
  const wordSub = variant === 'light' ? 'text-gold-300' : 'text-gold-600';

  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <Monogram variant={variant} className="h-9 w-9 shrink-0" />
      {showWordmark ? (
        <span className="flex flex-col leading-none">
          <span className={`font-serif text-[1.15rem] font-semibold tracking-tight ${wordTop}`}>
            Tashfeen
          </span>
          <span className={`mt-0.5 text-[0.58rem] font-semibold uppercase tracking-[0.24em] ${wordSub}`}>
            Immigration Solutions
          </span>
        </span>
      ) : null}
    </span>
  );
}
