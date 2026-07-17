import type { Metadata } from 'next';
import Link from 'next/link';
import { WhatsAppCta } from '@/components/WhatsAppCta';
import { ReviewedBy } from '@/components/ReviewedBy';
import { site, SERVICE } from '@/lib/site';

/**
 * The refusal hub — highest close rate in the business (~50%) at ~PKR 459k.
 *
 * These readers just had bad news and are frightened; several will have already
 * been burned by an agent promising a fix. Calm and useful outperforms urgent and
 * salesy here, and it is also simply the honest register for the subject.
 *
 * ⚠️ LEGAL REVIEW REQUIRED BEFORE PUBLISH: every statement about deadlines, what
 * the Federal Court can and cannot do, and misrepresentation consequences must be
 * signed off by a lawyer on the firm's team. These are drafted from general
 * knowledge of IRPA, not from the firm's practice. A reader who trusts a wrong
 * deadline here loses their only remedy.
 */
export const metadata: Metadata = {
  title: 'Canada Visa Refused? Your Real Options',
  description:
    'Your refusal letter doesn’t tell you the real reason. How to get your GCMS notes, what actually caused the refusal, and whether reapplying or judicial review is your move.',
  alternates: { canonical: '/canada-visa-refused' },
};

const PAGE = 'canada-visa-refused';

const REFUSAL_REASONS = [
  [
    'Ties to Pakistan judged too weak.',
    'The officer isn’t satisfied you’d come back. This is the most common one by far, and it’s about how you evidenced your job, property and family — not about who you are.',
  ],
  [
    'Funds that don’t hold up.',
    'Money that appeared last month. Money in your father’s or brother’s account, not yours. A balance with no history behind it.',
  ],
  [
    'Purpose of visit not credible.',
    'The trip doesn’t add up against your income, your leave, or your invitation.',
  ],
  [
    'Documents that contradict each other.',
    'Two dates that don’t match. A salary that doesn’t match the bank credits.',
  ],
  [
    'Misrepresentation.',
    'The serious one. Even an “adjustment” someone else made to your file can carry a long ban — and this is where a lawyer stops being optional.',
  ],
];

export default function VisaRefusedPage() {
  return (
    <>
      <section className="border-b border-rule bg-ink-900 text-white">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:py-20">
          <h1 className="font-serif text-4xl leading-tight text-balance sm:text-5xl">
            Your Canadian visa was refused. Here’s what you can actually do.
          </h1>
          <p className="mt-5 text-lg text-ink-200 text-pretty">
            Start with this: <strong className="font-semibold text-white">the letter you received
            does not tell you the real reason.</strong> It’s a template with boxes ticked. The
            officer’s actual reasoning is written somewhere else — and you’re entitled to read it.
          </p>
        </div>
      </section>

      <article className="mx-auto max-w-3xl px-4 py-14">
        <h2 className="font-serif text-3xl text-balance">Your refusal letter is not your refusal reason</h2>
        <p className="mt-4 text-ink-600 text-pretty">
          The letter says something like <em>“I am not satisfied that you will leave Canada at the
          end of your stay.”</em> That’s a checkbox. It’s on thousands of letters this month.
        </p>
        <p className="mt-4 text-ink-600 text-pretty">
          Behind it sit the <strong className="text-ink-900">GCMS notes</strong> — the visa officer’s
          actual notes on your file. That’s where you find out whether it was your bank statements,
          your travel history, your employment letter, an inconsistency between two documents, or
          something you never even thought about.
        </p>
        <p className="mt-4 text-ink-600 text-pretty">
          <strong className="text-ink-900">Reapplying without reading those notes is guessing.</strong>{' '}
          Most of the refused applicants who come to us have already reapplied once, blind, and been
          refused again — which makes the third attempt harder, not easier.
        </p>

        {/* The tripwire: cheap, genuinely useful, and it self-qualifies. */}
        <div className="mt-8 rounded border border-rule bg-paper-alt p-6">
          <h3 className="font-serif text-xl">Step one: get your GCMS notes</h3>
          <p className="mt-3 text-ink-600 text-pretty">
            Anyone can request them. It costs a small fee paid to the Canadian government and takes
            roughly [X] weeks. You need a Canadian citizen or permanent resident to file the request
            on your behalf — that’s the only part most applicants can’t do alone.
          </p>
          <p className="mt-3 text-ink-600 text-pretty">
            We’ll do it for you for [fee] — or you can do it yourself. We’d genuinely rather you read
            your notes than pay us for a strategy built on a guess.
          </p>
        </div>

        <h2 className="mt-12 font-serif text-3xl text-balance">Why Pakistani applications actually get refused</h2>
        <dl className="mt-5 space-y-5">
          {REFUSAL_REASONS.map(([term, def]) => (
            <div key={term}>
              <dt className="font-semibold">{term}</dt>
              <dd className="mt-1 text-ink-600 text-pretty">{def}</dd>
            </div>
          ))}
        </dl>

        <h2 className="mt-12 font-serif text-3xl text-balance">You have three options. Not one.</h2>
        <div className="mt-5 space-y-6">
          <div className="border-l-2 border-accent-500 pl-4">
            <h3 className="font-semibold">1 · Reapply, properly</h3>
            <p className="mt-1 text-ink-600 text-pretty">
              If the notes show a fixable evidence problem — weak ties, thin funds history, a bad
              employment letter — reapplying with that fixed is usually faster, cheaper and more
              likely to work than court. <em>For most people, this is the right answer.</em>
            </p>
          </div>
          <div className="border-l-2 border-accent-500 pl-4">
            <h3 className="font-semibold">2 · Judicial review at the Federal Court</h3>
            <p className="mt-1 text-ink-600 text-pretty">
              If the officer made a legal error — ignored evidence, breached procedural fairness,
              reached a decision the record doesn’t support — you can ask a judge to review it. This
              is a court case. It needs a lawyer.
            </p>
          </div>
          <div className="border-l-2 border-accent-500 pl-4">
            <h3 className="font-semibold">3 · Accept it and stop</h3>
            <p className="mt-1 text-ink-600 text-pretty">
              Sometimes the refusal was correct and no amount of money changes that. We will tell you
              when that’s the case. You’d be surprised how rarely anyone does.
            </p>
          </div>
        </div>

        {/* The most important block on the page. It costs sales and buys every future one. */}
        <div className="mt-12 rounded border border-rule bg-accent-50 p-6">
          <h2 className="font-serif text-2xl text-balance">What judicial review is not</h2>
          <p className="mt-4 text-ink-600 text-pretty">
            <strong className="text-ink-900">The Federal Court will not give you a visa.</strong> A
            judge does not re-decide your application or overrule the officer’s judgement. If you
            win, the court sends your file back to be decided again by a <em>different</em> officer —
            who can, lawfully, refuse you a second time.
          </p>
          <p className="mt-4 text-ink-600 text-pretty">
            So judicial review is not a way to “appeal until you get a yes”. It’s a remedy for a
            decision that was made <em>improperly</em>. If the officer applied the law correctly and
            simply wasn’t persuaded by your evidence, court is the wrong tool — and anyone selling it
            to you as a guaranteed fix is taking your money.
          </p>
        </div>

        <h2 className="mt-12 font-serif text-3xl text-balance">The clock is real</h2>
        <p className="mt-4 text-ink-600 text-pretty">
          There is a strict deadline to apply to the Federal Court for leave and judicial review, and
          it runs from the day you receive the decision. It is short — and it is different depending
          on whether the decision was made inside or outside Canada.
        </p>
        <p className="mt-4 text-ink-600 text-pretty">
          Miss it and the door usually closes. Extensions exist but are not granted for the asking.{' '}
          <strong className="text-ink-900">
            If your refusal is recent, talk to someone this week — even if that someone isn’t us.
          </strong>
        </p>
        {/* TODO(tashfeen): state the exact figures (in-Canada vs outside-Canada) here once
            a lawyer on the team has confirmed the numbers and the wording. Deliberately
            left qualitative rather than risk publishing a deadline that is wrong. */}

        <h2 className="mt-12 font-serif text-3xl text-balance">Why this one needs a lawyer, not an agent</h2>
        <p className="mt-4 text-ink-600 text-pretty">
          Judicial review is a proceeding in the Federal Court of Canada. A consultant cannot file it
          and cannot appear.{' '}
          <strong className="text-ink-900">
            An agent who offers to “handle your court case” is telling you something important about
            themselves.
          </strong>
        </p>
        <p className="mt-4 text-ink-600 text-pretty">
          At Tashfeen, refusals are handled by our lawyers. They’ll read your GCMS notes, tell you
          which of the three options above is genuinely yours, and say so plainly if the answer is
          “reapply” or “let it go” — both of which earn us less than a court case would.{' '}
          <Link href="/about/our-team" className="font-semibold text-accent-500 underline">
            Meet them first
          </Link>
          .
        </p>
        <p className="mt-4 text-ink-600 text-pretty">
          We’ve handled [X] refusal matters. [X] were sent back for redetermination. [X] were not.
          We’ll show you both kinds before you decide anything.
        </p>

        <ReviewedBy updated="July 2026" />
      </article>

      <section className="border-t border-rule bg-paper-alt">
        <div className="mx-auto max-w-3xl px-4 py-16">
          <h2 className="font-serif text-3xl text-balance">Send us your refusal letter</h2>
          <p className="mt-4 text-ink-600 text-pretty">
            We’ll read it, tell you what it actually means, and tell you which of the three options
            is realistically yours.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <WhatsAppCta
              intent={{
                service: SERVICE.JR_RESUBMISSION,
                page: PAGE,
                targetCountry: 'Canada',
                message: 'Hi, my Canadian visa was refused. I’d like someone to look at the refusal letter.',
              }}
            >
              Send your refusal letter
            </WhatsAppCta>
            <Link
              href="/book-consultation"
              className="rounded border border-rule bg-paper px-5 py-3 font-semibold text-ink-800 hover:bg-paper-alt"
            >
              Book a consultation — PKR {site.consultFee.amount.toLocaleString()}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
