import type { Metadata } from 'next';
import Link from 'next/link';
import { lawyers, site, assertLawyersPublishable } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Our Lawyers',
  description:
    'The qualified lawyers who review every case at Tashfeen Immigration Solutions. Real names, real credentials — check them before you pay anyone.',
  alternates: { canonical: '/about/our-team' },
};

export default function TeamPage() {
  // Fails the production build while any entry is still a placeholder. This page
  // makes the claim the whole site rests on — "we are real lawyers, go and check"
  // — so it is the one page that must never render an unverified credential.
  assertLawyersPublishable();

  const demoCount = lawyers.filter((l) => l.demo).length;

  return (
    <>
      <section className="border-b border-rule bg-ink-900 text-white">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <h1 className="max-w-3xl font-serif text-4xl leading-tight text-balance sm:text-5xl">
            The lawyers who will actually handle your case
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-ink-200 text-pretty">
            Most immigration firms in Pakistan won’t tell you who is working on your file. Here are
            ours, by name — so you can check us out before you trust us with anything.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        {demoCount > 0 ? (
          <div className="mb-8 rounded border border-dashed border-accent-500 bg-accent-50 p-5">
            <p className="font-semibold text-ink-900">
              Preview only — {demoCount} {demoCount === 1 ? 'entry is' : 'entries are'} unconfirmed.
            </p>
            <p className="mt-2 max-w-3xl text-sm text-ink-600 text-pretty">
              The names are real. The credentials are blank on purpose: nobody has invented one. Fill
              in <code className="font-mono text-xs">lawyers[]</code> in{' '}
              <code className="font-mono text-xs">lib/site.ts</code> — full name as it appears on the
              licence, the credential and its issuing body, what they practise, and where possible a
              public-register link. The production build refuses to run until every placeholder is
              gone, so this banner cannot reach the live site.
            </p>
          </div>
        ) : null}

        {lawyers.length === 0 ? (
          // Roster not yet published. A dignified public state — never fabricate a
          // name or credential to fill it. The trust section below carries the page.
          <div className="rounded border border-rule bg-paper-alt p-8">
            <h2 className="font-serif text-2xl text-balance">Individual profiles are on their way</h2>
            <p className="mt-3 max-w-2xl text-ink-600 text-pretty">
              We’re finalising the profiles of the qualified lawyers who review the cases here — name,
              qualification, and where you can independently verify each one. Until they’re up, the
              most important thing still holds:{' '}
              <strong className="text-ink-900">
                ask us who will handle your file, and we’ll tell you, by name.
              </strong>
            </p>
            <p className="mt-4">
              <Link href="/book-consultation" className="font-semibold text-accent-500 underline">
                Book a consultation and ask us directly →
              </Link>
            </p>
          </div>
        ) : (
          <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {lawyers.map((l, i) => (
              <li
                key={`${l.name}-${i}`}
                className={`flex flex-col rounded border p-6 ${
                  l.demo ? 'border-dashed border-accent-500 bg-accent-50/40' : 'border-rule'
                }`}
              >
                {l.photo ? (
                  // Plain <img>: these are a handful of small, static portraits. next/image
                  // would add a runtime dependency and a loader for no measurable gain.
                  <img
                    src={l.photo}
                    alt={`${l.name}, ${l.credential}`}
                    width={96}
                    height={96}
                    className="mb-4 h-24 w-24 rounded-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-full border border-dashed border-rule text-xs text-ink-400">
                    photo
                  </div>
                )}
                <h2 className="font-serif text-xl">{l.name}</h2>

                {/* A blank credential renders as an explicit gap. It must never read as
                    a qualification, and it must never be silently omitted — an empty
                    space under a lawyer's name looks like an oversight; this looks like
                    what it is. */}
                {l.credential ? (
                  <p className="mt-1 text-sm font-semibold text-accent-500">{l.credential}</p>
                ) : (
                  <p className="mt-1 text-sm font-semibold text-ink-400">
                    Credential not yet confirmed
                  </p>
                )}

                {l.practice ? (
                  <p className="mt-3 flex-1 text-ink-600 text-pretty">{l.practice}</p>
                ) : (
                  <p className="mt-3 flex-1 text-sm text-ink-400 text-pretty">
                    Practice area to be supplied by the firm.
                  </p>
                )}

                {l.since ? (
                  <p className="mt-3 text-sm text-ink-400">Practising since {l.since}</p>
                ) : null}
                {l.verifyUrl ? (
                  <a
                    href={l.verifyUrl}
                    className="mt-3 text-sm font-semibold text-accent-500 underline"
                    rel="noopener nofollow"
                    target="_blank"
                  >
                    Verify on the public register
                  </a>
                ) : null}
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* The invitation to check us out. Only a real firm can afford to make it. */}
      <section className="border-t border-rule bg-paper-alt">
        <div className="mx-auto max-w-3xl px-4 py-16">
          <h2 className="font-serif text-3xl text-balance">Check us before you pay us</h2>
          <p className="mt-4 text-ink-600 text-pretty">
            You have almost certainly heard about someone losing their savings to an immigration
            agent. That fear is reasonable, and the answer to it is not a promise — it is a name you
            can look up.
          </p>
          <p className="mt-4 text-ink-600 text-pretty">
            Look our lawyers up. Come to the office. Ask us for the licence number and check it
            yourself. Any firm that won’t give you that is telling you something.
          </p>
          <p className="mt-6">
            <Link href="/book-consultation" className="font-semibold text-accent-500 underline">
              Book a consultation — PKR {site.consultFee.amount.toLocaleString()}, credited to your
              fee
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
