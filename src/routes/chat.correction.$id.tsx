import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Volume2, BookOpen, Sparkles } from "lucide-react";
import { z } from "zod";
import { MobileFrame } from "@/components/mobile/MobileFrame";

const searchSchema = z.object({
  w: z.string().default(""),
  c: z.string().default(""),
  r: z.string().default(""),
  p: z.string().default(""),
  ipa: z.string().default(""),
});

export const Route = createFileRoute("/chat/correction/$id")({
  validateSearch: searchSchema,
  component: CorrectionDetail,
});

function CorrectionDetail() {
  const { w, c, r, p, ipa } = Route.useSearch();

  return (
    <MobileFrame>
      <header className="flex items-center gap-3 border-b border-border px-4 py-4">
        <Link
          to="/chat"
          className="grid size-9 place-items-center rounded-full border border-border text-foreground"
          aria-label="Back"
        >
          <ArrowLeft className="size-4" />
        </Link>
        <div className="flex-1">
          <div className="text-sm font-semibold text-foreground">Correction details</div>
          <div className="text-xs text-muted-foreground">Grammar & pronunciation</div>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto px-5 py-5 space-y-5">
        <section className="rounded-2xl border border-[#bfdbfe] bg-[#eff6ff] p-4">
          <div className="text-[10px] font-semibold uppercase tracking-wider text-[#1d4ed8]">
            Correction
          </div>
          <div className="mt-2 flex items-center gap-3 text-lg">
            <span className="text-[#ef4444] line-through">{w}</span>
            <ArrowRight className="size-4 text-muted-foreground" />
            <span className="font-bold text-primary">{c}</span>
          </div>
        </section>

        <section className="rounded-2xl border border-border bg-white p-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <BookOpen className="size-4 text-primary" /> Why
          </div>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{r}</p>
        </section>

        <section className="rounded-2xl border border-border bg-white p-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <Volume2 className="size-4 text-primary" /> Pronunciation
          </div>
          <div className="mt-3 flex items-center justify-between">
            <div>
              <div className="text-base font-semibold text-foreground">{c}</div>
              <div className="text-xs text-muted-foreground">
                {p} · <span className="font-mono">{ipa}</span>
              </div>
            </div>
            <button className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3.5 py-2 text-xs font-medium text-white">
              <Volume2 className="size-3.5" /> Play
            </button>
          </div>
        </section>

        <section className="rounded-2xl border border-border bg-white p-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <Sparkles className="size-4 text-primary" /> Try saying it
          </div>
          <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
            <li>· I {c} to the park yesterday.</li>
            <li>· She {c} home after work.</li>
            <li>· We {c} together last weekend.</li>
          </ul>
        </section>

        <Link
          to="/chat"
          className="block w-full rounded-full bg-primary py-3 text-center text-sm font-semibold text-white"
        >
          Back to chat
        </Link>
      </div>
    </MobileFrame>
  );
}
