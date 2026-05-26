import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Volume2, BookOpen, Sparkles, Mic } from "lucide-react";
import { MobileFrame } from "@/components/mobile/MobileFrame";
import { getMessage, type Correction } from "@/lib/corrections";

export const Route = createFileRoute("/chat/correction/$id")({
  component: CorrectionDetail,
  notFoundComponent: () => (
    <MobileFrame>
      <div className="flex-1 grid place-items-center p-6 text-center">
        <div>
          <div className="text-lg font-semibold">Message not found</div>
          <p className="mt-1 text-sm text-muted-foreground">
            Open it again from the chat.
          </p>
          <Link
            to="/chat"
            className="mt-4 inline-block rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white"
          >
            Back to chat
          </Link>
        </div>
      </div>
    </MobileFrame>
  ),
  loader: ({ params }) => {
    const msg = getMessage(params.id);
    if (!msg) throw notFound();
    return msg;
  },
});

function CorrectionDetail() {
  const msg = Route.useLoaderData();
  const corrections = msg.corrections ?? [];

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
          <div className="text-sm font-semibold text-foreground">Message analysis</div>
          <div className="text-xs text-muted-foreground">
            {corrections.length} correction{corrections.length === 1 ? "" : "s"} found
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto px-5 py-5 space-y-5">
        {/* Original message */}
        <section className="rounded-2xl bg-primary px-4 py-3 text-sm text-white">
          <div className="text-[10px] font-semibold uppercase tracking-wider text-white/70">
            You said {msg.source === "audio" && <span>· voice</span>}
          </div>
          <p className="mt-1.5">{msg.text}</p>
          {msg.source === "audio" && (
            <button className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs">
              <Mic className="size-3" /> Play recording
            </button>
          )}
        </section>

        {corrections.length === 0 ? (
          <div className="rounded-2xl border border-border bg-white p-4 text-sm text-muted-foreground">
            Nice — no corrections for this one. ✨
          </div>
        ) : (
          corrections.map((c, i) => <CorrectionBlock key={i} c={c} />)
        )}

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

function CorrectionBlock({ c }: { c: Correction }) {
  return (
    <div className="space-y-3">
      <section className="rounded-2xl border border-[#bfdbfe] bg-[#eff6ff] p-4">
        <div className="text-[10px] font-semibold uppercase tracking-wider text-[#1d4ed8]">
          Correction
        </div>
        <div className="mt-2 flex items-center gap-3 text-lg">
          <span className="text-[#ef4444] line-through">{c.wrong}</span>
          <ArrowRight className="size-4 text-muted-foreground" />
          <span className="font-bold text-primary">{c.correct}</span>
        </div>
      </section>

      <section className="rounded-2xl border border-border bg-white p-4">
        <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <BookOpen className="size-4 text-primary" /> Why
        </div>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.reason}</p>
      </section>

      <section className="rounded-2xl border border-border bg-white p-4">
        <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <Volume2 className="size-4 text-primary" /> Pronunciation
        </div>
        <div className="mt-3 flex items-center justify-between">
          <div>
            <div className="text-base font-semibold text-foreground">{c.correct}</div>
            <div className="text-xs text-muted-foreground">
              {c.pronunciation} · <span className="font-mono">{c.ipa}</span>
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
          <li>· I {c.correct} to the park yesterday.</li>
          <li>· She {c.correct} home after work.</li>
          <li>· We {c.correct} together last weekend.</li>
        </ul>
      </section>
    </div>
  );
}
