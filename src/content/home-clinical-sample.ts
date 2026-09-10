/**
 * The sample case behind the home hero's extraction demo.
 *
 * Deliberately *not* CMS content. It is an illustrative clinical artefact, not
 * copy: the HPO codes, z-scores and RAPID figures have to agree with each
 * other and with the free-text note above them, and the numbers also drive bar
 * widths and reveal timing. A plausible-looking edit in the admin panel would
 * read as a real clinical claim while being wrong, so it lives in code where
 * it goes through review.
 *
 * The panel labels itself an illustrative interface on a sample case, and the
 * figures below are consistent with the note rather than drawn from a patient.
 */

/** Stages of the extraction demo, in order. */
export const DEMO_STAGES = {
  idle: 0,
  scanning: 1,
  phenotype: 2,
  anthropometry: 3,
  complete: 4,
} as const;

/** Milliseconds after "Extract" at which each stage lands. */
export const DEMO_TIMINGS_MS = [950, 1750, 2450] as const;

export const CLINICAL_NOTE =
  "2 y 4 m male. Global developmental delay, seizures since 8 months. Coarse facial features, " +
  "hepatosplenomegaly, corneal clouding. Wt 9.8 kg, Ht 78 cm, OFC 46 cm.";

/** Human Phenotype Ontology terms the note resolves to. */
export const HPO_TERMS = [
  { term: "Global developmental delay", code: "HP:0001263" },
  { term: "Seizure", code: "HP:0001250" },
  { term: "Coarse facial features", code: "HP:0000280" },
  { term: "Hepatosplenomegaly", code: "HP:0001433" },
  { term: "Corneal opacity", code: "HP:0007957" },
] as const;

/**
 * Growth measurements as z-scores. `barPercent` is the plotted position, not a
 * value derived from `z` — at or below -2 the bar turns amber.
 */
export const ANTHROPOMETRY = [
  { label: "Weight", value: "9.8 kg", z: "-2.1", barPercent: 32 },
  { label: "Height", value: "78 cm", z: "-2.4", barPercent: 26 },
  { label: "OFC", value: "46 cm", z: "-1.2", barPercent: 54 },
] as const;

/** Ranked differentials from the CDSS, highest RAPID score first. */
export const RAPID_CANDIDATES = [
  { name: "Mucopolysaccharidosis I", gene: "IDUA", score: 0.92, match: "5 of 5 features" },
  { name: "Mucopolysaccharidosis II", gene: "IDS", score: 0.78, match: "4 of 5 features" },
  { name: "GM1 gangliosidosis", gene: "GLB1", score: 0.64, match: "3 of 5 features" },
] as const;

/** Below which a z-score is flagged rather than shown as unremarkable. */
export const Z_SCORE_FLAG = -2;
