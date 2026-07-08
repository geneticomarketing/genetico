export type TextSegment = { text: string; hl?: boolean };

/** Split paragraph text into segments, marking exact highlight phrases in blue. */
export function splitTextByHighlights(text: string, highlights: string[]): TextSegment[] {
  const phrases = highlights.map((phrase) => phrase.trim()).filter(Boolean);
  if (!phrases.length) return [{ text }];

  const segments: TextSegment[] = [];
  let remaining = text;

  while (remaining.length > 0) {
    let earliestIndex = Infinity;
    let matchedPhrase = "";

    for (const phrase of phrases) {
      const index = remaining.indexOf(phrase);
      if (index !== -1 && index < earliestIndex) {
        earliestIndex = index;
        matchedPhrase = phrase;
      }
    }

    if (!matchedPhrase) {
      segments.push({ text: remaining });
      break;
    }

    if (earliestIndex > 0) {
      segments.push({ text: remaining.slice(0, earliestIndex) });
    }

    segments.push({ text: matchedPhrase, hl: true });
    remaining = remaining.slice(earliestIndex + matchedPhrase.length);
  }

  return segments;
}

export type HighlightWord = {
  text: string;
  hl: boolean;
  pIndex: number;
  leadingSpace: boolean;
};

export function segmentsToWords(segments: TextSegment[], pIndex: number): HighlightWord[] {
  return segments.flatMap((segment) => {
    const startsTight = /^[,.;:]/.test(segment.text);
    return segment.text
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .map((text, i) => ({
        text,
        hl: Boolean(segment.hl),
        pIndex,
        leadingSpace: !(i === 0 && startsTight),
      }));
  });
}
