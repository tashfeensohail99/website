import type { Metadata } from 'next';
import Link from 'next/link';
import { site, lawyers } from '@/lib/site';

/**
 * The trust page.
 *
 * The buyer's real question is never "are you skilled?" — every agent claims
 * that. It is "will you take my money and disappear?" Almost everyone in this
 * market answers with adjectives. This page answers with checkable facts:
 * three real offices on two continents, named lawyers, and an invitation to
 * verify us before paying. Those are things a scam cannot cheaply fake.
 */
export const metadata: Metadata = {
  title: 'About Us',
  description:
    'An international immigration firm with lawyers, and offices in Lahore, Islamabad and Canada. Come and see us before you pay anyone.',
  alternates: { canonical: '/about' },
};

export default function AboutPage() {
  return (
    <>
      <section className="border-b border-rule bg-ink-900 text-white">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:py-20">
          <h1 className="font-serif text-4xl leading-tight text-balance sm:text-5xl">
            Three offices. Two continents. Real lawyers.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-ink-200 text-pretty">
            You have almost certainly heard about someone losing their savings to an immigration
            agent. That fear is reasonable. So rather than ask you to trust us, we’ll give you things
            you can check.
          </p>
        </div>
      </section>

      {/* Offices — the answer to "are you real?" that adjectives can't give. */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="font-serif text-3xl text-balance">Come and see us</h2>
        <p className="mt-4 max-w-2xl text-ink-600 text-pretty">
          Not a mailbox, not a WhatsApp number. Offices with doors, in three cities.
        </p>
        <ul className="mt-8 grid gap-6 md:grid-cols-3">
          {site.offices.map((o) => (
            <li key={o.city} className="rounded border border-rule p-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-ink-400">
                {o.country}
              </p>
              <h3 className="mt-1 font-serif text-2xl">{o.city}</h3>
              {o.address ? (
                <address className="mt-3 not-italic text-ink-600 text-pretty">{o.address}</address>
              ) : (
                <p className="mt-3 rounded border border-dashed border-accent-500 bg-accent-50 p-3 text-sm text-ink-600">
                  Address to be added — see <code className="font-mono text-xs">lib/site.ts</code>
                </p>
              )}
              {o.hours ? <p className="mt-3 text-sm text-ink-400">{o.hours}</p> : null}
              {o.mapUrl ? (
                <a
                  href={o.mapUrl}
                  className="mt-3 inline-block text-sm font-semibold text-accent-500 underline"
                  rel="noopener"
                  target="_blank"
                >
                  Open in Maps
                </a>
              ) : null}
            </li>
          ))}
        </ul>
        <p className="mt-8 max-w-2xl text-ink-600 text-pretty">
          The Canadian office matters more than it looks. Most firms in Pakistan handling Canadian
          files have never been to Canada. If you’re in Riyadh or Dubai and can’t visit us in Lahore,
          someone you know probably <em>can</em> visit us in Mississauga.
        </p>
      </section>

      {/* Lawyers — pointer, not duplicate. The team page owns the detail. */}
      <section className="border-y border-rule bg-paper-alt">
        <div className="mx-auto max-w-3xl px-4 py-16">
          <h2 className="font-serif text-3xl text-balance">We have lawyers. Most agents don’t.</h2>
          <p className="mt-4 text-ink-600 text-pretty">
            Pakistan has no licensing body for immigration advice. Anyone can rent an office, print a
            brochure and call themselves a consultant — which is exactly why so many people get hurt.
          </p>
          <p className="mt-4 text-ink-600 text-pretty">
            A lawyer is different in one way that matters: there is a regulator you can complain to,
            and a public register you can check in about thirty seconds. An agent has neither.
          </p>
          <p className="mt-6">
            <Link href="/about/our-team" className="font-semibold text-accent-500 underline">
              {lawyers.length > 0 ? 'Meet our lawyers — and go and check them' : 'Meet our lawyers'}
            </Link>
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-16">
        <h2 className="font-serif text-3xl text-balance">How we work</h2>
        <dl className="mt-8 space-y-6">
          {[
            [
              'We tell you if you don’t qualify.',
              'Before you pay us anything. A weak application filed today is a refusal on your record for years — it is not a free lottery ticket.',
            ],
            [
              'We never promise an outcome.',
              'Your visa is decided by a visa officer in another country. Nobody in Pakistan can overrule them, and anyone who says otherwise is selling you something.',
            ],
            [
              'Our fees are itemised.',
              'Our professional fee and the government’s fee, listed separately, before you commit. You should always know which part of your money we keep.',
            ],
            [
              'A lawyer reviews the file.',
              'Not a salesperson who has moved on to the next lead.',
            ],
          ].map(([term, def]) => (
            <div key={term} className="border-l-2 border-accent-500 pl-4">
              <dt className="font-semibold">{term}</dt>
              <dd className="mt-1 text-ink-600 text-pretty">{def}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="border-t border-rule bg-ink-900 text-white">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center">
          <h2 className="font-serif text-3xl text-balance">Check us before you pay us</h2>
          <p className="mx-auto mt-4 max-w-xl text-ink-200 text-pretty">
            Look our lawyers up. Come to the office. Ask for the licence number and go and verify it
            yourself. Any firm that won’t give you that is telling you something.
          </p>
          <p className="mt-8">
            <Link
              href="/book-consultation"
              className="inline-block rounded bg-accent-500 px-5 py-3 font-semibold text-white hover:bg-accent-600"
            >
              Book a consultation — PKR {site.consultFee.amount.toLocaleString()}, credited to your fee
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
