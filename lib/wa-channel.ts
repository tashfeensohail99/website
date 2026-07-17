import { site } from './site';

/**
 * Resolve the WhatsApp number the site's CTAs open — from the CRM, not from config.
 *
 * The number already lives in the CRM as WhatsAppChannel.displayNumber, and the
 * CRM is where it gets changed. Duplicating it into the website's env would
 * create a second source of truth: switch the active channel in the admin panel
 * and the site would keep sending customers to a number nobody is listening on.
 *
 * So we fetch it at build time. Pages stay fully static (no runtime dependency
 * on the backend, no client JS), and a channel change is picked up on the next
 * deploy — which is also when everything else about the site changes.
 *
 * Fails the production build if it cannot resolve: a missing number renders
 * `wa.me/?text=…`, which opens WhatsApp with no recipient. It looks fine in
 * review and silently loses every enquiry.
 */
type Channel = { digits: string; display: string };

let cached: Channel | null = null;

export async function getWhatsAppChannel(): Promise<Channel> {
  if (cached) return cached;

  const api = process.env.CRM_API_URL;
  if (api) {
    try {
      const res = await fetch(`${api.replace(/\/$/, '')}/public/whatsapp/channel`, {
        // Build-time fetch: revalidate hourly so a long-lived ISR deploy still
        // notices a channel switch without a full rebuild.
        next: { revalidate: 3600 },
      });
      if (res.ok) {
        const json = (await res.json()) as Channel;
        if (json?.digits) return (cached = json);
      }
      console.warn(`[wa-channel] CRM returned ${res.status}; falling back to env`);
    } catch (err) {
      console.warn(`[wa-channel] CRM unreachable (${(err as Error).message}); falling back to env`);
    }
  }

  // Local dev / CRM unreachable.
  const fallback = site.whatsappNumberFallback;
  if (fallback) return (cached = { digits: fallback, display: fallback });

  if (process.env.NODE_ENV === 'production') {
    throw new Error(
      'Could not resolve the WhatsApp number. Set CRM_API_URL so the site can read the ' +
        'ACTIVE channel from the CRM (GET /public/whatsapp/channel), or set ' +
        'NEXT_PUBLIC_WA_NUMBER for a local build. Without it every CTA is a dead link.',
    );
  }
  return { digits: '', display: '' };
}
