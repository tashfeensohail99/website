import Link from 'next/link';
import type { Metadata } from 'next';
import { WhatsAppCta } from '@/components/WhatsAppCta';
import { site, SERVICE, lawyers, leadLawyer } from '@/lib/site';

/**
 * The trust strip. In a market where every competitor is an anonymous "agent",
 * naming qualified lawyers is the one advantage that cannot be copied — so this
 * sits directly under the hero, above the services.
 *
 * While the roster is still empty it renders a visible gap rather than vague
 * copy. A soft "our expert team" line would quietly become permanent; an obvious
 * hole gets filled.
 */
function TrustStrip() {
  const lead = leadLawyer();

  return (
    <section className="border-b border-rule bg-paper-alt">
      <div className="mx-auto max-w-6xl px-4 py-10">
        {lead ? (
          <>
            <p className="max-w-3xl text-lg text-pretty">
              Every case at Tashfeen is reviewed by a qualified lawyer —{' '}
              <strong className="font-semibold">{lead.name}</strong>
              {lead.credential ? `, ${lead.credential}` : ''}
              {lawyers.length > 1
                ? `, and ${lawyers.length - 1} other ${lawyers.length === 2 ? 'lawyer' : 'lawyers'} on our team`
                : ''}
              .
            </p>
            <p className="mt-2 max-w-3xl text-ink-600 text-pretty">
              Not agents. Not a call centre. Lawyers who will look at your file and tell you the
              truth about it.{' '}
              <Link href="/about/our-team" className="font-semibold text-accent-500 underline">
                Meet the team
              </Link>
              .
            </p>
          </>
        ) : (
          // No named lawyer yet published. Render the trust MESSAGE (real, and the
          // firm's core differentiator) — never a dev note, never fabricated names.
          <>
            <p className="max-w-3xl text-lg text-pretty">
              Every case at Tashfeen is reviewed by a qualified lawyer — not an agent, and not a call
              centre. Someone who will actually look at your file and tell you the truth about it.
            </p>
            <p className="mt-2 max-w-3xl text-ink-600 text-pretty">
              We put our lawyers in front of you by name, so you can check us before you trust us with
              anything.{' '}
              <Link href="/about/our-team" className="font-semibold text-accent-500 underline">
                Meet the team
              </Link>
              .
            </p>
          </>
        )}
      </div>
    </section>
  );
}

export const metadata: Metadata = {
  alternates: { canonical: '/' },
};

const SERVICES = [
  {
    href: '/work-permit-canada',
    title: 'Canada Work Permit',
    body: 'You do not need a job offer to work in Canada. If you own a business or you are self-employed, there is a route most agents in Pakistan don’t know how to file.',
    cta: 'See if it fits you',
  },
  {
    href: '/canada-visit-visa',
    title: 'Canada Visit Visa',
    body: 'The most common Canadian visa — and the most commonly refused. Most of the refusals we see were avoidable.',
    cta: 'What it actually takes',
  },
  {
    href: '/canada-visa-refused',
    title: 'Your visa was refused',
    body: 'A refusal is not the end of it. Get your GCMS notes, find out the real reason, and know whether reapplying or the Federal Court is your move.',
    cta: 'Start here',
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero — the thesis, and one action. No carousel. */}
      <section className="border-b border-rule bg-ink-900 text-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:py-24">
          <h1 className="max-w-3xl font-serif text-4xl leading-tight text-balance sm:text-5xl">
            {site.tagline}
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-ink-200 text-pretty">
            Offices in Pakistan and Canada. We’ll tell you honestly whether you qualify — before you
            pay us anything.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/book-consultation"
              className="rounded bg-accent-500 px-5 py-3 font-semibold text-white hover:bg-accent-600"
            >
              Book a consultation — PKR {site.consultFee.amount.toLocaleString()}, credited to your fee
            </Link>
            <WhatsAppCta
              variant="ghost"
              intent={{
                service: SERVICE.WORK_PERMIT,
                page: 'home',
                targetCountry: 'Canada',
                message: 'Hi, I’d like to ask about immigrating to Canada.',
              }}
            >
              Message us on WhatsApp
            </WhatsAppCta>
          </div>
        </div>
      </section>

      {/* Trust strip — the most valuable block on the site. Competitors are anonymous. */}
      <TrustStrip />

      {/* Three services. Nothing else. */}

      {/* Three services. Nothing else. */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid gap-6 md:grid-cols-3">
          {SERVICES.map((s) => (
            <article key={s.href} className="flex flex-col rounded border border-rule p-6">
              <h2 className="font-serif text-2xl">{s.title}</h2>
              <p className="mt-3 flex-1 text-ink-600 text-pretty">{s.body}</p>
              <Link
                href={s.href}
                className="mt-5 font-semibold text-accent-500 hover:text-accent-600"
              >
                {s.cta} <span aria-hidden="true">→</span>
              </Link>
            </article>
          ))}
        </div>
      </section>

      {/* The honesty block. This out-converts any promise on the page. */}
      <section className="border-y border-rule bg-paper-alt">
        <div className="mx-auto max-w-3xl px-4 py-16">
          <h2 className="font-serif text-3xl text-balance">“Can you guarantee me a visa?”</h2>
          <p className="mt-5 text-xl font-semibold">No. And neither can anyone else.</p>
          <p className="mt-4 text-ink-600 text-pretty">
            Your visa is decided by a Canadian visa officer. No consultant in Pakistan — including us
            — can overrule that officer, and anyone who tells you otherwise is either lying to you or
            about to.
          </p>
          <p className="mt-4 text-ink-600 text-pretty">
            What we can do: tell you honestly whether your case is strong, fix what’s weak before
            it’s filed, and put it in front of that officer properly. And if we don’t think you’ll
            succeed, we’ll say so — before you’ve paid us for anything.
          </p>
        </div>
      </section>

      {/* Why us — four lines, no fluff. */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="font-serif text-3xl text-balance">Why people choose us</h2>
        <dl className="mt-8 grid gap-6 sm:grid-cols-2">
          {[
            ['A lawyer reviews your file.', 'Not a salesperson.'],
            [
              'We tell you when not to apply.',
              'A weak application filed today is a refusal on your record forever.',
            ],
            ['Offices in both countries.', 'Pakistan and Mississauga, Canada — come and see us.'],
            [
              'Every rupee itemised.',
              'Our fee and the government’s fee, listed separately, before you commit.',
            ],
          ].map(([term, def]) => (
            <div key={term} className="border-l-2 border-accent-500 pl-4">
              <dt className="font-semibold">{term}</dt>
              <dd className="mt-1 text-ink-600 text-pretty">{def}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Closing CTA */}
      <section className="border-t border-rule bg-ink-900 text-white">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center">
          <h2 className="font-serif text-3xl text-balance">Find out where you actually stand</h2>
          <p className="mx-auto mt-4 max-w-xl text-ink-200 text-pretty">
            A paid consultation, credited against your fee if you go ahead. You’ll leave knowing
            whether you have a case — even if the answer is no.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/book-consultation"
              className="rounded bg-accent-500 px-5 py-3 font-semibold text-white hover:bg-accent-600"
            >
              Book a consultation
            </Link>
            <WhatsAppCta
              variant="ghost"
              intent={{
                service: SERVICE.WORK_PERMIT,
                page: 'home-footer',
                targetCountry: 'Canada',
                message: 'Hi, I’d like to book a consultation about Canadian immigration.',
              }}
            >
              Ask a question first
            </WhatsAppCta>
          </div>
        </div>
      </section>
    </>
  );
}
