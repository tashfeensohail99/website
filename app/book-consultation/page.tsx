import type { Metadata } from 'next';
import Link from 'next/link';
import { WhatsAppCta } from '@/components/WhatsAppCta';
import { site, SERVICE } from '@/lib/site';

/**
 * The paid consultation.
 *
 * The fee's job is QUALIFICATION, not revenue. The firm closes 42–50% of leads
 * that are actually qualified and ~0% of the WhatsApp firehose; a small paid
 * step is the cheapest filter there is, and — for a buyer who has been warned
 * about immigration scams their whole life — a fee that credits back reads as
 * confidence rather than a toll.
 *
 * Deliberately NOT a form. 97% of the audience is Pakistan + Gulf, where a form
 * is strictly worse than WhatsApp: more friction, no 24-hour service window, and
 * replies get forced into paid templates. And we ask for the minimum — a name and
 * a number books a meeting. Identity verification belongs at retainer, behind
 * auth, not on a public page.
 */
export const metadata: Metadata = {
  title: 'Book a Consultation',
  description:
    'A paid consultation with a qualified lawyer, credited against your fee if you proceed. You will leave knowing whether you have a case — even if the answer is no.',
  alternates: { canonical: '/book-consultation' },
};

const PAGE = 'book-consultation';

export default function BookConsultationPage() {
  return (
    <>
      <section className="border-b border-rule bg-ink-900 text-white">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:py-20">
          <h1 className="font-serif text-4xl leading-tight text-balance sm:text-5xl">
            Find out where you actually stand
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-ink-200 text-pretty">
            PKR {site.consultFee.amount.toLocaleString()}, credited against your fee if you go ahead.
            You’ll leave knowing whether you have a case — even if the answer is no.
          </p>
        </div>
      </section>

      <article className="mx-auto max-w-3xl px-4 py-14">
        <h2 className="font-serif text-3xl text-balance">Why we charge for it</h2>
        <p className="mt-4 text-ink-600 text-pretty">
          Free consultations aren’t free — they’re paid for by the people who get talked into
          applying when they shouldn’t. A firm that earns nothing until you sign has every reason to
          tell you that you qualify.
        </p>
        <p className="mt-4 text-ink-600 text-pretty">
          We’d rather charge a small fee, give you an honest answer, and put it toward your file if
          you proceed. If we tell you not to apply, the fee is what we earned for saving you a
          refusal on your record — and those stay with you for years.
        </p>

        <h2 className="mt-12 font-serif text-3xl text-balance">What actually happens</h2>
        <ol className="mt-5 space-y-5">
          {[
            [
              'You tell us your situation',
              'What you do, where you want to go, what you’ve tried, and whether you’ve ever been refused. That last one matters more than people expect.',
            ],
            [
              'A lawyer looks at it',
              'Not a salesperson. If your case touches a refusal or a court deadline, that is a legal question and it gets a legal answer.',
            ],
            [
              'You get a straight answer',
              'Which routes are realistically open to you, which are not, what it would cost, and roughly how long. Including “none of them, here’s why” if that’s the truth.',
            ],
            [
              'You decide — not us',
              'If you go ahead, the fee comes off your bill. If you don’t, you still leave knowing where you stand, and you owe us nothing further.',
            ],
          ].map(([term, def], i) => (
            <li key={term} className="flex gap-4">
              <span
                aria-hidden="true"
                className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent-500 text-sm font-semibold text-white"
              >
                {i + 1}
              </span>
              <div>
                <p className="font-semibold">{term}</p>
                <p className="mt-1 text-ink-600 text-pretty">{def}</p>
              </div>
            </li>
          ))}
        </ol>

        <h2 className="mt-12 font-serif text-3xl text-balance">What we need from you</h2>
        <p className="mt-4 text-ink-600 text-pretty">
          Your name, a number we can reach you on, and which country you’re asking about. That’s it.
        </p>
        <p className="mt-4 text-ink-600 text-pretty">
          <strong className="text-ink-900">We won’t ask for your CNIC or passport to book a
          meeting.</strong> No legitimate firm needs your identity documents before it has even
          spoken to you — and if anyone asks you for them up front, that alone should give you pause.
        </p>

        <div className="mt-12 rounded border border-rule bg-accent-50 p-6">
          <h2 className="font-serif text-2xl text-balance">If you’re outside Pakistan</h2>
          <p className="mt-4 text-ink-600 text-pretty">
            A large share of the people we work with are in Saudi Arabia, the UAE and the wider Gulf.
            You don’t need to fly home. Message us and we’ll arrange a time that works around your
            week — including Fridays, when you’re off and we’re open.
          </p>
        </div>
      </article>

      <section className="border-t border-rule bg-paper-alt">
        <div className="mx-auto max-w-3xl px-4 py-16">
          <h2 className="font-serif text-3xl text-balance">Book it</h2>
          <p className="mt-4 text-ink-600 text-pretty">
            Message us on WhatsApp and we’ll set it up. Tell us which country you’re asking about and
            we’ll put you with the right person.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <WhatsAppCta
              intent={{
                service: SERVICE.WORK_PERMIT,
                page: PAGE,
                message: 'Hi, I’d like to book a consultation.',
              }}
            >
              Book on WhatsApp
            </WhatsAppCta>
            <Link
              href="/about/our-team"
              className="rounded border border-rule bg-paper px-5 py-3 font-semibold text-ink-800 hover:bg-paper-alt"
            >
              See who you’ll be speaking to
            </Link>
          </div>
          <p className="mt-6 text-sm text-ink-400 text-pretty">
            No one can guarantee the outcome of a visa application — not us, not anyone.{' '}
            <Link href="/no-guarantee-policy" className="underline">
              Read our policy
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}
