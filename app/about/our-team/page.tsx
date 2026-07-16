import type { Metadata } from 'next';
import Link from 'next/link';
import { lawyers, site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Our Lawyers',
  description:
    'The qualified lawyers who review every case at Tashfeen Immigration Solutions. Real names, real credentials — check them before you pay anyone.',
  alternates: { canonical: '/about/our-team' },
};

export default function TeamPage() {
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
        {lawyers.length === 0 ? (
          <div className="rounded border border-dashed border-accent-500 bg-accent-50 p-6">
            <p className="font-semibold text-ink-900">Roster not yet supplied.</p>
            <p className="mt-2 max-w-2xl text-ink-600 text-pretty">
              Add each lawyer to <code className="font-mono text-sm">lawyers[]</code> in{' '}
              <code className="font-mono text-sm">lib/site.ts</code>: full name as it appears on
              their licence, credential and issuing body, what they handle, and a real photograph.
              Where a public register exists, link it — inviting people to verify you is the whole
              point of this page.
            </p>
          </div>
        ) : (
          <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {lawyers.map((l) => (
              <li key={l.name} className="flex flex-col rounded border border-rule p-6">
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
                <p className="mt-1 text-sm font-semibold text-accent-500">{l.credential}</p>
                <p className="mt-3 flex-1 text-ink-600 text-pretty">{l.practice}</p>
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
