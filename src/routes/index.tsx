import { createFileRoute, Link } from "@tanstack/react-router";
import { Flame, Sparkles, ArrowRight, MessageCircle, CheckCircle2, Zap } from "lucide-react";
import { MobileFrame } from "@/components/mobile/MobileFrame";
import { BottomTabs } from "@/components/mobile/BottomTabs";

export const Route = createFileRoute("/")({ component: Home });

const week = [
  { d: "M", done: true },
  { d: "T", done: true },
  { d: "W", done: false, missed: true },
  { d: "T", done: true },
  { d: "F", done: true },
  { d: "S", today: true },
  { d: "S" },
];

function Home() {
  const status: "not_started" | "in_progress" | "completed" = "in_progress" as
    | "not_started"
    | "in_progress"
    | "completed";
  const cta =
    status === "not_started" ? "Start Lesson" : status === "in_progress" ? "Continue" : "View Summary";

  return (
    <MobileFrame>
      <main className="flex-1 overflow-y-auto px-5 pt-7 pb-6 space-y-5 bg-[#f6f5fd]">
        {/* Greeting */}
        <header className="flex items-center justify-between">
          <div>
            <div className="text-xs text-muted-foreground">Good morning</div>
            <h1 className="text-[22px] font-semibold tracking-tight text-foreground">Ayan ✨</h1>
          </div>
          <div className="flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-foreground shadow-sm">
            <Flame className="size-3.5 text-[#f97316]" /> 5
          </div>
        </header>

        {/* Daily Lesson hero */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-primary-dark p-5 text-white shadow-[0_18px_40px_-18px_rgba(109,94,252,0.7)]">
          <div className="absolute -right-10 -top-10 size-40 rounded-full bg-white/10 blur-2xl" />
          <div className="relative">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider">
              <Sparkles className="size-3" /> Today’s lesson
            </div>
            <h2 className="mt-3 text-xl font-semibold leading-tight">Past tense in everyday talk</h2>
            <p className="mt-1 text-sm text-white/80">3 short exercises · ~6 min</p>

            <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-white/20">
              <div className="h-full rounded-full bg-white" style={{ width: "33%" }} />
            </div>
            <div className="mt-1.5 flex items-center justify-between text-[11px] text-white/80">
              <span>Exercise 1 of 3</span>
              <span>In progress</span>
            </div>

            <Link
              to="/lesson/session"
              className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-white py-3 text-sm font-semibold text-primary"
            >
              {cta} <ArrowRight className="size-4" />
            </Link>
          </div>
        </section>

        {/* Today stats */}
        <section className="grid grid-cols-3 gap-2.5">
          <MiniStat value="5" label="Day streak" />
          <MiniStat value="1/3" label="Exercises" />
          <MiniStat value="12" label="Words" />
        </section>

        {/* Weekly calendar */}
        <section className="rounded-2xl bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="text-sm font-semibold text-foreground">This week</div>
            <Link to="/lessons" className="text-xs font-medium text-primary">View all</Link>
          </div>
          <div className="mt-3 flex items-center justify-between">
            {week.map((d, i) => (
              <div key={i} className="flex flex-col items-center gap-1.5">
                <span className="text-[10px] text-muted-foreground">{d.d}</span>
                <div
                  className={`grid size-8 place-items-center rounded-full text-[11px] font-semibold ${
                    d.today
                      ? "ring-2 ring-primary text-primary bg-primary-light"
                      : d.done
                        ? "bg-primary text-white"
                        : d.missed
                          ? "bg-muted text-muted-foreground"
                          : "border border-border text-muted-foreground"
                  }`}
                >
                  {d.done ? <CheckCircle2 className="size-4" strokeWidth={2.5} /> : i + 1}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Quick fix */}
        <Link
          to="/lesson/practice"
          className="flex items-center gap-3 rounded-2xl border border-border bg-white p-4 shadow-sm"
        >
          <div className="grid size-10 place-items-center rounded-xl bg-[#fff3e8] text-[#f97316]">
            <Zap className="size-5" />
          </div>
          <div className="flex-1">
            <div className="text-[10px] font-semibold uppercase tracking-wider text-[#f97316]">
              Quick fix
            </div>
            <div className="text-sm font-semibold text-foreground">Practice past tense</div>
            <div className="text-xs text-muted-foreground">Your top weak point this week</div>
          </div>
          <ArrowRight className="size-4 text-muted-foreground" />
        </Link>

        {/* Free Talk shortcut */}
        <Link
          to="/freetalk"
          className="flex items-center gap-3 rounded-2xl bg-white p-4 shadow-sm"
        >
          <div className="grid size-10 place-items-center rounded-xl bg-primary-light text-primary">
            <MessageCircle className="size-5" />
          </div>
          <div className="flex-1">
            <div className="text-sm font-semibold text-foreground">Want to just talk?</div>
            <div className="text-xs text-muted-foreground">Free chat with AI, still corrected.</div>
          </div>
          <span className="rounded-full bg-primary px-3 py-1.5 text-xs font-semibold text-white">
            Free Talk
          </span>
        </Link>
      </main>
      <BottomTabs />
    </MobileFrame>
  );
}

function MiniStat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-2xl bg-white p-3 text-center shadow-sm">
      <div className="text-lg font-semibold text-foreground">{value}</div>
      <div className="mt-0.5 text-[10px] uppercase tracking-wider text-muted-foreground">
        {label}
      </div>
    </div>
  );
}
