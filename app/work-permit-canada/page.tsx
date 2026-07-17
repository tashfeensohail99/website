import type { Metadata } from 'next';
import Link from 'next/link';
import { WhatsAppCta } from '@/components/WhatsAppCta';
import { ReviewedBy } from '@/components/ReviewedBy';
import { site, SERVICE } from '@/lib/site';

/**
 * The hero product: ~PKR 2.7M a deal, 72% of PKR revenue from 11 agreements.
 *
 * The H1 deliberately does NOT say "C11". Nobody searches an IRCC exemption
 * code — buyers search their own situation ("without a job offer", "self
 * employed"), which is exactly how they describe themselves in our own recorded
 * questions. C11 is the answer they discover here, never the question they ask.
 */
export const metadata: Metadata = {
  title: 'Canada Work Permit Without a Job Offer (C11)',
  description:
    'If you own a business or are self-employed in Pakistan, you may not need a job offer or an LMIA to work in Canada. What the C11 route really requires — and who it is not for.',
  alternates: { canonical: '/work-permit-canada' },
};

const PAGE = 'work-permit-canada';

export default function WorkPermitPage() {
  return (
    <>
      <section className="border-b border-rule bg-ink-900 text-white">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:py-20">
          <h1 className="font-serif text-4xl leading-tight text-balance sm:text-5xl">
            Canada work permit without a job offer or an LMIA
          </h1>
          <p className="mt-5 text-lg text-ink-200 text-pretty">
            If you own a business or you’re self-employed in Pakistan, there is a legal route to work
            in Canada that needs no employer, no LMIA, and no IELTS band. It’s called a{' '}
            <strong className="font-semibold text-white">C11</strong> — and most agents never file
            one.
          </p>
        </div>
      </section>

      <article className="mx-auto max-w-3xl px-4 py-14">
        {/* Qualify-out first. Saves the sales team, and buys trust in the same breath. */}
        <h2 className="font-serif text-3xl text-balance">Is this you?</h2>
        <ul className="mt-5 space-y-2">
          {[
            'You own or run a business in Pakistan',
            'You’re self-employed, or a senior professional',
            'You have funds you can actually show — in your own name',
            'You’ve been told “you need a job offer first” and stopped there',
          ].map((t) => (
            <li key={t} className="flex gap-3">
              <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-500" />
              <span className="text-pretty">{t}</span>
            </li>
          ))}
        </ul>
        <p className="mt-5 text-ink-600 text-pretty">
          If that’s you, keep reading. If you’re a salaried employee looking for any job in Canada,
          this route is not for you — and we’ll say so on the call rather than take your money.
        </p>

        <h2 className="mt-12 font-serif text-3xl text-balance">What a C11 actually is</h2>
        <p className="mt-4 text-ink-600 text-pretty">
          Most Canadian work permits need an employer to prove no Canadian could do the job — an
          LMIA. It’s slow, it’s expensive, and you can’t start it without an employer who wants you.
        </p>
        <p className="mt-4 text-ink-600 text-pretty">
          The C11 skips that. It’s for someone who will bring{' '}
          <em className="not-italic font-semibold text-ink-900">significant benefit</em> to Canada —
          typically by starting or buying a business there. You are the applicant and the employer.
          There’s no LMIA, and no job offer to chase.
        </p>
        <p className="mt-4 text-ink-600 text-pretty">
          It is not a shortcut and it is not easy. It’s a real business case, argued properly, with
          real money behind it. That’s precisely why most agents don’t touch it.
        </p>

        <h2 className="mt-12 font-serif text-3xl text-balance">What you’ll need</h2>
        {/* TODO(tashfeen): every figure below is a real fact only the firm has.
            Do not publish an invented range on a page people make life decisions from. */}
        <ul className="mt-5 space-y-2 text-ink-600">
          {[
            'A genuine business plan for Canada — not a template',
            '[Funds range] — in your own name, for at least [X] months',
            'Proof you’ve actually run a business: [what you accept]',
            '[Anything else you genuinely require]',
          ].map((t) => (
            <li key={t} className="flex gap-3">
              <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-rule" />
              <span className="text-pretty">{t}</span>
            </li>
          ))}
        </ul>

        <h2 className="mt-12 font-serif text-3xl text-balance">What it costs</h2>
        <p className="mt-4 text-ink-600 text-pretty">
          Our professional fee: <strong className="text-ink-900">[range]</strong>. Government fees:{' '}
          <strong className="text-ink-900">[amount]</strong>, paid to IRCC, not to us. We itemise
          both before you sign anything.
        </p>

        <h2 className="mt-12 font-serif text-3xl text-balance">How long it takes</h2>
        <p className="mt-4 text-ink-600 text-pretty">
          Typically <strong className="text-ink-900">[range]</strong> from first consultation to
          decision, depending on [factors]. Anyone quoting you a fixed date is guessing.
        </p>

        <h2 className="mt-12 font-serif text-3xl text-balance">Why file it with us</h2>
        <p className="mt-4 text-ink-600 text-pretty">
          A C11 lives or dies on the strength of its business case. It is an argument, not a form —
          which is why it’s reviewed by our lawyers before it goes anywhere near IRCC.
        </p>
        <p className="mt-4 text-ink-600 text-pretty">
          We’ve filed [X] of these. Some were approved. Some were refused — and we’ll tell you what
          went wrong in those, because you should know what you’re actually buying.
        </p>

        <ReviewedBy updated="July 2026" />
      </article>

      {/* The gate. It sits BETWEEN the page and the CTA on purpose: ranking for
          "work permit without LMIA" attracts every unqualified applicant in the
          country, and an ungated button would rebuild the same lead swamp the
          sales team already drowns in. */}
      <section className="border-t border-rule bg-paper-alt">
        <div className="mx-auto max-w-3xl px-4 py-16">
          <h2 className="font-serif text-3xl text-balance">Find out if you qualify</h2>
          <p className="mt-4 text-ink-600 text-pretty">
            Tell us about your business and your funds, and we’ll tell you honestly whether a C11 is
            realistic for you. If it isn’t, we’ll say so — and we’ll tell you what is.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/book-consultation"
              className="rounded bg-accent-500 px-5 py-3 font-semibold text-white hover:bg-accent-600"
            >
              Book a consultation — PKR {site.consultFee.amount.toLocaleString()}, credited to your fee
            </Link>
            <WhatsAppCta
              intent={{
                service: SERVICE.WORK_PERMIT,
                page: PAGE,
                targetCountry: 'Canada',
                message:
                  'Hi, I’d like to apply for a Canada work permit without a job offer. I run my own business.',
              }}
            >
              Ask about your case
            </WhatsAppCta>
          </div>
        </div>
      </section>
    </>
  );
}
