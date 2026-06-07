import { createFileRoute, Link } from "@tanstack/react-router";
import { TrendingUp, ArrowRight } from "lucide-react";
import { MobileFrame } from "@/components/mobile/MobileFrame";
import { BottomTabs } from "@/components/mobile/BottomTabs";

export const Route = createFileRoute("/progress")({ component: ProgressScreen });

const skills = [
  { label: "Speaking", value: 72, delta: 12 },
  { label: "Vocabulary", value: 64, delta: 8 },
  { label: "Grammar", value: 58, delta: 4 },
  { label: "Fluency", value: 66, delta: 6 },
  { label: "Pronunciation", value: 70, delta: 3 },
];

const mistakes = [
  { wrong: "I am agree", correct: "I agree" },
  { wrong: "yesterday I go", correct: "yesterday I went" },
  { wrong: "in Monday", correct: "on Monday" },
];

function ProgressScreen() {
  return (
    <MobileFrame>
      <main className="flex-1 overflow-y-auto px-5 pt-7 pb-6 space-y-5 bg-[#f6f5fd]">
        <header>
          <h1 className="text-xl font-semibold text-foreground">Your progress</h1>
          <p className="text-xs text-muted-foreground">How you’re improving this week</p>
        </header>

        <section className="rounded-3xl bg-gradient-to-br from-primary to-primary-dark p-5 text-white shadow-lg">
          <div className="inline-flex items-center gap-1.5 text-xs">
            <TrendingUp className="size-3.5" /> This week
          </div>
          <div className="mt-2 text-2xl font-semibold">Speaking +12%</div>
          <p className="mt-1 text-sm text-white/80">+34 new words · 7 mistakes fixed</p>
        </section>

        <section className="rounded-2xl bg-white p-4 shadow-sm">
          <div className="mb-3 text-sm font-semibold text-foreground">Skills</div>
          <ul className="space-y-3">
            {skills.map((s) => (
              <li key={s.label}>
                <div className="mb-1 flex items-center justify-between text-xs">
                  <span className="text-foreground">{s.label}</span>
                  <span className="font-medium text-[#10b981]">+{s.delta}%</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-primary"
                    style={{ width: `${s.value}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-2xl bg-white p-4 shadow-sm">
          <div className="mb-3 text-sm font-semibold text-foreground">Common mistakes</div>
          <ul className="space-y-2.5">
            {mistakes.map((m, i) => (
              <li key={i} className="flex items-center gap-2 text-sm">
                <span className="text-muted-foreground">{i + 1}.</span>
                <span className="text-destructive line-through">{m.wrong}</span>
                <ArrowRight className="size-3.5 text-muted-foreground" />
                <span className="font-semibold text-primary">{m.correct}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-2xl bg-white p-4 shadow-sm">
          <div className="text-[10px] font-semibold uppercase tracking-wider text-primary">
            Weak point
          </div>
          <div className="mt-1 text-sm font-semibold text-foreground">Past tense</div>
          <p className="mt-1 text-xs text-muted-foreground">
            Recommended: Role-play · Talking about yesterday
          </p>
          <Link
            to="/lesson/practice"
            className="mt-3 inline-flex w-full items-center justify-center gap-1.5 rounded-full bg-primary py-2.5 text-sm font-semibold text-white"
          >
            Practice weak point <ArrowRight className="size-4" />
          </Link>
        </section>
      </main>
      <BottomTabs />
    </MobileFrame>
  );
}
