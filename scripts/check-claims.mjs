/**
 * Lists every place the site's code still makes a product claim IndiGeneUs.AI
 * cannot back up.
 *
 * Management flagged (2026-10-29) that the illustrations showed features the
 * platform does not have. The platform was then checked by hand, and the
 * claims below were found nowhere in it. This is that list, as patterns, so
 * each phase of the visuals rework can prove it removed what it should and
 * nothing creeps back. Read-only; touches no database.
 *
 *   npm run check:claims
 *
 * Exits 1 while anything matches. It scans the code only — CMS copy is checked
 * by hand in phase 5. Archived pages (src/archive/) are not built, so they are
 * skipped. A line can opt out with `claims-ok` in a comment when the match is
 * not a claim (a pattern colliding with ordinary prose).
 */

import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const ROOT = new URL("..", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1");
const SCAN = ["src"];
const SKIP = ["src/archive", "src/payload-types.ts", "src/app/(payload)"];
const EXTENSIONS = /\.(ts|tsx|mts|js|mjs)$/;

/** What the platform does not do, and the wording that claims it. */
const CLAIMS = [
  {
    why: "variant calling — the platform does not analyse variants",
    re: /\b(SCN1A|BRCA2|UBE3A)\b|variant detected|Gene variant|c\.\d+del/i,
  },
  { why: "publication counts", re: /(?=.*\d)(?=.*\bpublications?\b)/i },
  {
    why: "exome or sequencing results — the platform orders tests, it does not sequence",
    re: /exome result|Sequencing"/i,
  },
  { why: "ICD-10 codes — differentials use OMIM and Orphanet", re: /\b[GQ]\d{2}\.\d{1,3}\b/ },
  { why: '"confirmed pathogenic" classification', re: /confirmed path/i },
  { why: "RAPID as a percentage — it is a 0–1 decimal", re: /RAPID[^\n]*%|score out of 100/i },
  { why: "automatic referral triage", re: /auto-flagged|referral triage/i },
  { why: "MDT sign-off", re: /\bMDT\b/ },
  { why: "panel vs. exome recommendation", re: /panel vs\.? exome/i },
  { why: "automatic recall and scheduling", re: /recalls? surface|Follow-up due/i },
  { why: "invented programme statistics", re: /1,247|312 Diagnoses|Data Completeness/ },
  { why: '"Live" pill on a mock-up', re: /<LivePill\b/ },
  { why: "SGPGI Lucknow is not a partner", re: /SGPGI/ },
  {
    why: "unconfirmed integrations — only the LIMS is confirmed",
    re: /HL7|FHIR|DICOM|Custom Webhooks/,
  },
];

function* files(dir) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    const rel = relative(ROOT, path).replaceAll("\\", "/");
    if (SKIP.some((skip) => rel === skip || rel.startsWith(`${skip}/`))) continue;
    if (statSync(path).isDirectory()) yield* files(path);
    else if (EXTENSIONS.test(name)) yield { path, rel };
  }
}

const hits = [];
for (const base of SCAN) {
  for (const { path, rel } of files(join(ROOT, base))) {
    readFileSync(path, "utf8")
      .split("\n")
      .forEach((line, i) => {
        if (line.includes("claims-ok")) return;
        for (const { why, re } of CLAIMS) {
          if (re.test(line)) hits.push({ at: `${rel}:${i + 1}`, why, line: line.trim() });
        }
      });
  }
}

if (hits.length === 0) {
  console.log("No unsupported product claims found.");
  process.exit(0);
}

for (const { at, why, line } of hits) {
  console.log(`${at}  ${why}\n    ${line.slice(0, 140)}`);
}
console.log(`\n${hits.length} unsupported claim(s).`);
process.exit(1);
