import { createFileRoute, Link } from "@tanstack/react-router";
import { Trophy, ArrowRight } from "lucide-react";
import { MobileFrame } from "@/components/mobile/MobileFrame";

export const Route = createFileRoute("/lesson/summary")({ component: Summary });

function Summary() {
  return (
    <MobileFrame>
      <main className="flex-1 overflow-y-auto px-5 pt-10 pb-6 space-y-5 bg-[#f6f5fd]">
        <div className="text-center">
          <div className="mx-auto grid size-16 place-items-center rounded-2xl bg-primary-light text-primary">
            <Trophy className="size-7" />
          </div>
          <h1 className="mt-4 text-2xl font-semibold text-foreground">Daily Lesson Complete</h1>
          <p className="mt-1 text-sm text-muted-foreground">Nice work, Ayan. Small steps every day.</p>
        </div>

        <section className="rounded-2xl bg-white p-5 shadow-sm">
          <div className="flex items-end justify-between">
            <div>
              <div className="text-[11px] uppercase tracking-wider text-muted-foreground">Score</div>
              <div className="text-3xl font-bold text-primary">82</div>
            </div>
            <div className="text-right">
              <div className="text-[11px] uppercase tracking-wider text-muted-foreground">
                Main focus
              </div>
              <div className="text-sm font-semibold text-foreground">Past tense</div>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-3 gap-2.5">
          <SummaryStat v="3" l="Exercises" />
          <SummaryStat v="12" l="Words" />
          <SummaryStat v="2" l="Fixed" />
        </section>

        <section className="rounded-2xl bg-white p-4 shadow-sm">
          <div className="text-[10px] font-semibold uppercase tracking-wider text-[#10b981]">
            Best improvement
          </div>
          <div className="mt-1 text-sm font-semibold text-foreground">Articles (a / the)</div>
          <div className="text-xs text-muted-foreground">+18% accuracy vs yesterday</div>
        </section>

        <div className="grid grid-cols-2 gap-3 pt-1">
          <Link
            to="/lessons"
            className="rounded-full border border-border bg-white py-3 text-center text-sm font-semibold text-foreground"
          >
            View details
          </Link>
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-1.5 rounded-full bg-primary py-3 text-sm font-semibold text-white"
          >
            Done <ArrowRight className="size-4" />
          </Link>
        </div>
      </main>
    </MobileFrame>
  );
}

function SummaryStat({ v, l }: { v: string; l: string }) {
  return (
    <div className="rounded-2xl bg-white p-3 text-center shadow-sm">
      <div className="text-lg font-semibold text-foreground">{v}</div>
      <div className="mt-0.5 text-[10px] uppercase tracking-wider text-muted-foreground">{l}</div>
    </div>
  );
}
