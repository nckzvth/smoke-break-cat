export const CONTENT_MODE = Object.freeze({
  ORIGINAL: 'original',
  CANDY: 'candy',
});

export const CANDY_PRESENTATIONS = Object.freeze({
  sidewalkSpecial: Object.freeze({
    name: 'SIDEWALK SUGAR STICK',
    title: 'CANDY ENCOUNTER',
    visual: 'candyStick',
    meta: 'plain, sweet, questionably clean',
  }),
  mentholMissile: Object.freeze({
    name: 'MINTY MISSILE',
    title: 'COOLING CANDY',
    visual: 'mintCandy',
    meta: '+ sugar-rush speed on clear',
  }),
  nurseFilter: Object.freeze({
    name: 'STRAWBERRY WAFER',
    title: 'SNACK RECOVERY',
    visual: 'wafer',
    meta: '+ restore 1 heart',
  }),
  ashJackpot: Object.freeze({
    name: 'HONEYCOMB JACKPOT',
    title: 'CANDY PAYDAY',
    visual: 'honeycomb',
    meta: '+ extra sugar dust on clear',
  }),
  ghostFilter: Object.freeze({
    name: 'PHANTOM SOUR BELT',
    title: 'WEIRD CANDY',
    visual: 'sourBelt',
    meta: '+ psychedelic sugar phase shift',
  }),
  cigarilloBrick: Object.freeze({
    name: 'CHOCOLATE BRICK',
    title: 'HEAVY SNACK',
    visual: 'chocolate',
    meta: '+ heal / chance at max heart',
  }),
  turboVape: Object.freeze({
    name: 'TURBO JUICE BOX',
    title: 'CHARGED SNACK',
    visual: 'juiceBox',
    meta: '+ combo ignition',
  }),
  vapeLord: Object.freeze({
    name: 'THE SODA JERK',
    title: 'BOSS TREAT',
    visual: 'sodaJerk',
    meta: '3 phases · awards PACKS',
  }),
  hookah: Object.freeze({
    name: 'CURSED SUNDAE',
    title: 'BOSS TREAT',
    visual: 'sundae',
    meta: '3 phases · awards PACKS',
  }),
  bong: Object.freeze({
    name: 'PHANTOM GUMBALL MACHINE',
    title: 'BOSS TREAT',
    visual: 'gumball',
    meta: '3 phases · awards PACKS',
  }),
  machine: Object.freeze({
    name: 'CANDY CRUSHER 3000',
    title: 'BOSS TREAT',
    visual: 'candyCrusher',
    meta: '3 phases · awards PACKS',
  }),
});

const PRESENTATION_FIELDS = new Set(['name', 'title', 'visual', 'meta']);

export function normalizeContentMode(value) {
  return value === CONTENT_MODE.CANDY ? CONTENT_MODE.CANDY : CONTENT_MODE.ORIGINAL;
}

export function toggleContentMode(value) {
  return normalizeContentMode(value) === CONTENT_MODE.CANDY
    ? CONTENT_MODE.ORIGINAL
    : CONTENT_MODE.CANDY;
}

export function presentEncounter(encounter, mode) {
  if (!encounter || normalizeContentMode(mode) === CONTENT_MODE.ORIGINAL) return encounter;
  const presentation = CANDY_PRESENTATIONS[encounter.id];
  return presentation ? { ...encounter, ...presentation } : encounter;
}

export function assertCompleteCandyRegistry(encounters) {
  const missing = encounters.map((encounter) => encounter.id).filter((id) => !CANDY_PRESENTATIONS[id]);
  if (missing.length) throw new Error(`Missing candy presentations: ${missing.join(', ')}`);

  for (const [id, presentation] of Object.entries(CANDY_PRESENTATIONS)) {
    const missingFields = [...PRESENTATION_FIELDS].filter((key) => !Object.hasOwn(presentation, key));
    if (missingFields.length) throw new Error(`Candy presentation ${id} is incomplete: ${missingFields.join(', ')}`);

    const invalid = Object.keys(presentation).filter((key) => !PRESENTATION_FIELDS.has(key));
    if (invalid.length) throw new Error(`Candy presentation ${id} changes mechanical fields: ${invalid.join(', ')}`);
  }

  return true;
}
