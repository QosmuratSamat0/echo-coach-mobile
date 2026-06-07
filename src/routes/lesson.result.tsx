import { createFileRoute, Link } from "@tanstack/react-router";
import { X, ArrowRight, Sparkles } from "lucide-react";
import { MobileFrame } from "@/components/mobile/MobileFrame";

export const Route = createFileRoute("/lesson/result")({ component: Result });

function Result() {
  const score = 82;
  return (
    <MobileFrame>
      <header className="flex items-center justify-between px-5 pt-5 pb-2">
        <Link
          to="/"
          className="grid size-9 place-items-center rounded-full bg-white text-foreground shadow-sm"
          aria-label="Close"
        >
          <X className="size-4" />
        </Link>
        <span className="rounded-full bg-primary-light px-3 py-1 text-[11px] font-semibold text-primary">
          Feedback
        </span>
        <div className="size-9" />
      </header>

      <main className="flex-1 overflow-y-auto px-5 pt-2 pb-6 space-y-4 bg-[#f6f5fd]">
        <section className="rounded-3xl bg-gradient-to-br from-primary to-primary-dark p-5 text-white shadow-lg">
          <div className="inline-flex items-center gap-1.5 text-xs">
            <Sparkles className="size-3.5" /> Nice try
          </div>
          <div className="mt-2 flex items-end justify-between">
            <div>
              <div className="text-[11px] uppercase tracking-wider text-white/70">Your score</div>
              <div className="text-4xl font-bold">{score}</div>
            </div>
            <div className="text-right text-xs text-white/80">
              Main focus<br />
              <span className="font-semibold text-white">Past tense</span>
            </div>
          </div>
        </section>

        <section className="rounded-2xl bg-white p-4 shadow-sm">
          <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            You said
          </div>
          <p className="mt-1.5 text-sm leading-relaxed text-foreground">
            I <span className="text-destructive line-through">go</span> to school yesterday.
          </p>
        </section>

        <section className="rounded-2xl border-2 border-primary/30 bg-primary-light p-4">
          <div className="text-[10px] font-semibold uppercase tracking-wider text-primary">
            Better
          </div>
          <p className="mt-1.5 text-sm leading-relaxed text-foreground">
            I <span className="rounded bg-primary px-1.5 py-0.5 font-semibold text-white">went</span>{" "}
            to school yesterday.
          </p>
        </section>

        <section className="rounded-2xl bg-white p-4 shadow-sm">
          <div className="text-sm font-semibold text-foreground">Why</div>
          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
            Use the past tense with <span className="font-semibold text-foreground">yesterday</span>.
            “Go” becomes “went”.
          </p>
        </section>

        <div className="grid grid-cols-2 gap-3 pt-1">
          <Link
            to="/lesson/practice"
            className="rounded-full border-2 border-primary bg-white py-3 text-center text-sm font-semibold text-primary"
          >
            Practice mistake
          </Link>
          <Link
            to="/lesson/summary"
            className="inline-flex items-center justify-center gap-1.5 rounded-full bg-primary py-3 text-center text-sm font-semibold text-white"
          >
            Next <ArrowRight className="size-4" />
          </Link>
        </div>
      </main>
    </MobileFrame>
  );
}
