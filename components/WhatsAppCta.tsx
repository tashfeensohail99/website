import { waHref, type WaIntent } from '@/lib/wa';

/**
 * The site's primary action. A plain anchor by design — no chat widget, no
 * script: 0 bytes, survives ad blockers, and opens the app the audience already
 * lives in. The ref token inside the message is what makes the resulting lead
 * attributable in the CRM (see lib/wa.ts).
 */
export function WhatsAppCta({
  intent,
  children,
  variant = 'solid',
}: {
  intent: WaIntent;
  children: React.ReactNode;
  variant?: 'solid' | 'ghost';
}) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded px-5 py-3 text-base font-semibold transition-colors';
  const styles =
    variant === 'solid'
      ? 'bg-wa-500 text-white hover:bg-wa-600'
      : 'border border-rule bg-paper text-ink-800 hover:bg-paper-alt';

  return (
    <a href={waHref(intent)} className={`${base} ${styles}`} rel="noopener">
      <WhatsAppGlyph />
      {children}
    </a>
  );
}

function WhatsAppGlyph() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 shrink-0" fill="currentColor">
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.61.14-.14.3-.35.45-.53.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.38-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.42-.07-.13-.27-.2-.57-.35z" />
      <path d="M12.04 2C6.6 2 2.18 6.42 2.18 11.86c0 1.74.46 3.44 1.32 4.94L2.1 22l5.34-1.4a9.83 9.83 0 0 0 4.6 1.17h.01c5.43 0 9.85-4.42 9.85-9.86 0-2.63-1.02-5.11-2.88-6.97A9.79 9.79 0 0 0 12.04 2zm0 17.98h-.01a8.2 8.2 0 0 1-4.17-1.14l-.3-.18-3.1.81.83-3.02-.2-.31a8.16 8.16 0 0 1-1.25-4.36c0-4.52 3.68-8.2 8.2-8.2a8.15 8.15 0 0 1 5.79 2.4 8.13 8.13 0 0 1 2.4 5.8c0 4.52-3.68 8.2-8.19 8.2z" />
    </svg>
  );
}
