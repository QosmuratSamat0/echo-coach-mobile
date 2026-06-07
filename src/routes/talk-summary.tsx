import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, CheckCircle2, Sparkles, Zap } from "lucide-react";
import { MobileFrame } from "@/components/mobile/MobileFrame";

export const Route = createFileRoute("/talk-summary")({ component: TalkSummary });

const patterns = [
  {
    title: "Agreement phrases",
    count: 3,
    wrong: "I am agree",
    correct: "I agree",
  },
  {
    title: "Past tense",
    count: 2,
    wrong: "yesterday I go",
    correct: "yesterday I went",
  },
  {
    title: "Prepositions",
    count: 1,
    wrong: "in Monday",
    correct: "on Monday",
  },
];

function TalkSummary() {
  return (
    <MobileFrame>
      <header className="flex items-center gap-3 px-5 pt-5 pb-3">
        <Link
          to="/freetalk"
          className="grid size-9 place-items-center rounded-full bg-white text-foreground shadow-sm"
          aria-label="Back"
        >
          <ArrowLeft className="size-4" />
        </Link>
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-wider text-primary">
            Talk summary
          </div>
          <div className="text-sm font-semibold text-foreground">Here is what Noona noticed</div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto px-5 pt-2 pb-6 space-y-4 bg-[#f6f5fd]">
        <section className="rounded-3xl bg-gradient-to-br from-primary to-primary-dark p-5 text-white shadow-lg">
          <div className="inline-flex items-center gap-1.5 text-xs">
            <Sparkles className="size-3.5" /> Talk first, fix after
          </div>
          <h1 className="mt-2 text-2xl font-semibold leading-tight">
            3 patterns from your real words
          </h1>
          <p className="mt-1 text-sm text-white/80">
            Noona kept the conversation flowing and saved only the useful fixes.
          </p>
        </section>

        <section className="space-y-2.5">
          {patterns.map((p) => (
            <article key={p.title} className="rounded-2xl bg-white p-4 shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-sm font-semibold text-foreground">{p.title}</div>
                  <div className="mt-0.5 text-xs text-muted-foreground">
                    Appeared {p.count} {p.count === 1 ? "time" : "times"} in this talk
                  </div>
                </div>
                <span className="rounded-full bg-primary-light px-2.5 py-1 text-[10px] font-semibold text-primary">
                  pattern
                </span>
              </div>
              <div className="mt-3 flex items-center gap-2 text-sm">
                <span className="text-destructive line-through">{p.wrong}</span>
                <ArrowRight className="size-3.5 text-muted-foreground" />
                <span className="font-semibold text-primary">{p.correct}</span>
              </div>
            </article>
          ))}
        </section>

        <section className="rounded-2xl border border-primary/20 bg-white p-4 shadow-sm">
          <div className="flex items-center gap-2">
            <div className="grid size-9 place-items-center rounded-xl bg-primary-light text-primary">
              <Zap className="size-4" />
            </div>
            <div>
              <div className="text-sm font-semibold text-foreground">Fix in 3 minutes</div>
              <div className="text-xs text-muted-foreground">
                A quick lesson built from these exact mistakes.
              </div>
            </div>
          </div>
          <Link
            to="/lesson/practice"
            className="mt-4 inline-flex w-full items-center justify-center gap-1.5 rounded-full bg-primary py-3 text-sm font-semibold text-white"
          >
            Start quick fix <ArrowRight className="size-4" />
          </Link>
        </section>

        <section className="rounded-2xl bg-[#ecfdf5] p-4">
          <div className="flex gap-2">
            <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-[#10b981]" />
            <div>
              <div className="text-sm font-semibold text-foreground">
                Tomorrow's Daily Lesson is ready
              </div>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                It will focus on agreement phrases and past tense, because those came from your
                own conversation.
              </p>
            </div>
          </div>
        </section>

        <Link
          to="/"
          className="inline-flex w-full items-center justify-center rounded-full border border-border bg-white py-3 text-sm font-semibold text-foreground"
        >
          Back home
        </Link>
      </main>
    </MobileFrame>
  );
}
