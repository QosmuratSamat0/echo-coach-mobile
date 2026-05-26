import { Link } from "@tanstack/react-router";
import type { Correction } from "@/lib/corrections";

export function InlineCorrectedText({
  messageId,
  text,
  corrections,
}: {
  messageId: string;
  text: string;
  corrections?: Correction[];
}) {
  if (!corrections || corrections.length === 0) {
    return <span>{text}</span>;
  }

  // Build a map wrong -> correction (case-insensitive, first match)
  const map = new Map<string, Correction>();
  corrections.forEach((c) => map.set(c.wrong.toLowerCase(), c));

  const tokens = text.split(/(\s+)/); // keep spaces

  return (
    <span className="leading-relaxed">
      {tokens.map((tok, i) => {
        const cleaned = tok.replace(/[.,!?;:]/g, "").toLowerCase();
        const c = map.get(cleaned);
        if (!c) return <span key={i}>{tok}</span>;
        return (
          <Link
            key={i}
            to="/chat/correction/$id"
            params={{ id: `${messageId}-${c.wrong}` }}
            search={{ w: c.wrong, c: c.correct, r: c.reason, p: c.pronunciation, ipa: c.ipa }}
            className="inline-flex items-baseline gap-1 align-baseline"
          >
            <span className="text-white/70 line-through decoration-white/80">{c.wrong}</span>
            <span className="rounded bg-white/15 px-1 font-semibold text-white underline decoration-dotted underline-offset-2">
              {c.correct}
            </span>
          </Link>
        );
      })}
    </span>
  );
}
