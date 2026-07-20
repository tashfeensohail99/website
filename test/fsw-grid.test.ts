/**
 * Invariant tests for the FSW 67-point selection grid.
 *
 * Run with:  npm run test:fsw
 *
 * The maxed-profile test is the strongest assertion here: a perfect profile must
 * land on exactly 100, which almost any mistyped cell would break. The rest pin
 * the four traps documented in lib/fsw-grid.ts — each of which was caught by
 * reconciliation rather than by either independent derivation.
 */

import {
  scoreFsw,
  FSW_PASS_MARK,
  type FswInput,
} from '../lib/fsw-grid.ts';

let pass = 0;
let fail = 0;
const t = (name: string, got: unknown, want: unknown) => {
  if (got === want) pass++;
  else {
    fail++;
    console.log(`FAIL ${name}: got ${got} want ${want}`);
  }
};

const base: FswInput = {
  firstLanguageClb: 7,
  secondLanguageClb5: false,
  education: 'secondary',
  experienceYears: 1,
  age: 30,
  arrangedEmployment: false,
  ownCanadianWork: false,
  ownCanadianStudy: false,
  spouseAccompanying: false,
  spouseLanguageClb4: false,
  spouseCanadianWork: false,
  spouseCanadianStudy: false,
  relativeInCanada: false,
};

const one = (r: ReturnType<typeof scoreFsw>, label: string) =>
  r.lines.find((l) => l.label === label)?.points ?? 0;

/* --- the headline: a maxed profile lands on exactly 100 --- */
const maxed: FswInput = {
  firstLanguageClb: 10,
  secondLanguageClb5: true,
  education: 'doctoral',
  experienceYears: 6,
  age: 30,
  arrangedEmployment: true,
  ownCanadianWork: true,
  ownCanadianStudy: true,
  spouseAccompanying: true,
  spouseLanguageClb4: true,
  spouseCanadianWork: true,
  spouseCanadianStudy: true,
  relativeInCanada: true,
};
t('a maxed profile scores exactly 100', scoreFsw(maxed).total, 100);
t('every factor is at its own maximum', scoreFsw(maxed).lines.every((l) => l.points === l.max), true);

/* --- trap: adaptability caps at 10, it does not sum to 40 --- */
t('adaptability caps at 10', one(scoreFsw(maxed), 'Adaptability'), 10);
t(
  'own Canadian work alone reaches the adaptability cap',
  one(scoreFsw({ ...base, ownCanadianWork: true }), 'Adaptability'),
  10,
);
t(
  'two 5-point elements reach the cap exactly',
  one(scoreFsw({ ...base, relativeInCanada: true, ownCanadianStudy: true }), 'Adaptability'),
  10,
);
t(
  'three 5-point elements are still capped at 10',
  one(
    scoreFsw({
      ...base,
      relativeInCanada: true,
      ownCanadianStudy: true,
      spouseAccompanying: true,
      spouseLanguageClb4: true,
    }),
    'Adaptability',
  ),
  10,
);

/* --- trap: arranged employment is still worth 10 on THIS grid --- */
t('arranged employment scores 10', one(scoreFsw({ ...base, arrangedEmployment: true }), 'Arranged employment'), 10);
t(
  'arranged employment also feeds adaptability',
  one(scoreFsw({ ...base, arrangedEmployment: true }), 'Adaptability'),
  5,
);

/* --- language: per-ability against the CLB 7 threshold --- */
t('CLB 7 -> 16 (4 per ability)', one(scoreFsw({ ...base, firstLanguageClb: 7 }), 'Language'), 16);
t('CLB 8 -> 20', one(scoreFsw({ ...base, firstLanguageClb: 8 }), 'Language'), 20);
t('CLB 9 -> 24', one(scoreFsw({ ...base, firstLanguageClb: 9 }), 'Language'), 24);
t('CLB 10 -> 24 (capped, not 6.5/ability)', one(scoreFsw({ ...base, firstLanguageClb: 10 }), 'Language'), 24);
t('CLB 6 -> 0, below the threshold', one(scoreFsw({ ...base, firstLanguageClb: 6 }), 'Language'), 0);
t('below the threshold is disqualifying', scoreFsw({ ...maxed, firstLanguageClb: 6 }).passes, false);
t('below the threshold sets the flag', scoreFsw({ ...base, firstLanguageClb: 6 }).languageFloorFailed, true);
t('second language adds a flat 4', one(scoreFsw({ ...base, secondLanguageClb5: true }), 'Language'), 20);

/* --- age: every year enumerated, no interpolation --- */
t('age 18 -> 12', one(scoreFsw({ ...base, age: 18 }), 'Age'), 12);
t('age 35 -> 12', one(scoreFsw({ ...base, age: 35 }), 'Age'), 12);
t('age 36 -> 11', one(scoreFsw({ ...base, age: 36 }), 'Age'), 11);
t('age 40 -> 7', one(scoreFsw({ ...base, age: 40 }), 'Age'), 7);
t('age 46 -> 1', one(scoreFsw({ ...base, age: 46 }), 'Age'), 1);
t('age 47 -> 0', one(scoreFsw({ ...base, age: 47 }), 'Age'), 0);
t('age 17 -> 0', one(scoreFsw({ ...base, age: 17 }), 'Age'), 0);

/* --- experience: bands are not linear in years --- */
t('under a year -> 0', one(scoreFsw({ ...base, experienceYears: 0 }), 'Work experience'), 0);
t('1 year -> 9', one(scoreFsw({ ...base, experienceYears: 1 }), 'Work experience'), 9);
t('2 years -> 11', one(scoreFsw({ ...base, experienceYears: 2 }), 'Work experience'), 11);
t('3 years -> 11 (same band as 2, not interpolated)', one(scoreFsw({ ...base, experienceYears: 3 }), 'Work experience'), 11);
t('4 years -> 13', one(scoreFsw({ ...base, experienceYears: 4 }), 'Work experience'), 13);
t('5 years -> 13', one(scoreFsw({ ...base, experienceYears: 5 }), 'Work experience'), 13);
t('6 years -> 15', one(scoreFsw({ ...base, experienceYears: 6 }), 'Work experience'), 15);
t('20 years -> 15', one(scoreFsw({ ...base, experienceYears: 20 }), 'Work experience'), 15);

/* --- education bands --- */
t('doctoral -> 25', one(scoreFsw({ ...base, education: 'doctoral' }), 'Education'), 25);
t("master's -> 23", one(scoreFsw({ ...base, education: 'masters' }), 'Education'), 23);
t('two or more credentials -> 22', one(scoreFsw({ ...base, education: 'twoOrMore' }), 'Education'), 22);
t('three-year credential -> 21', one(scoreFsw({ ...base, education: 'threeYear' }), 'Education'), 21);
t('two-year -> 19', one(scoreFsw({ ...base, education: 'twoYear' }), 'Education'), 19);
t('one-year -> 15', one(scoreFsw({ ...base, education: 'oneYear' }), 'Education'), 15);
t('secondary -> 5', one(scoreFsw({ ...base, education: 'secondary' }), 'Education'), 5);
t('no secondary -> 0', one(scoreFsw({ ...base, education: 'none' }), 'Education'), 0);

/* --- spouse elements only count when the spouse is accompanying --- */
t(
  'spouse elements are ignored when not accompanying',
  one(
    scoreFsw({ ...base, spouseAccompanying: false, spouseLanguageClb4: true, spouseCanadianWork: true }),
    'Adaptability',
  ),
  0,
);

/* --- the pass mark --- */
t('pass mark is 67', FSW_PASS_MARK, 67);
t('a 67 passes', scoreFsw({ ...base, firstLanguageClb: 9, education: 'doctoral', experienceYears: 6, age: 30 }).passes, true);
t('a thin profile fails', scoreFsw(base).passes, false);

console.log(`\n${pass} passed, ${fail} failed`);
if (fail) process.exit(1);
