import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, ChevronRight, Plus } from "lucide-react";
import { MobileFrame } from "@/components/mobile/MobileFrame";
import { BottomTabs } from "@/components/mobile/BottomTabs";

export const Route = createFileRoute("/lessons")({ component: Lessons });

const month = Array.from({ length: 30 }, (_, i) => {
  const day = i + 1;
  const done = [1, 2, 4, 5, 6, 9, 10, 11, 13, 14, 15, 17, 18, 20, 21].includes(day);
  const missed = [3, 7, 8, 12, 19].includes(day);
  const today = day === 22;
  return { day, done, missed, today };
});

const past = [
  { id: "21", date: "Yesterday", mode: "Classic", topic: "Past simple", score: 78, fixed: 3 },
  { id: "20", date: "Mar 20", mode: "Role-play", topic: "Coffee shop", score: 85, fixed: 2 },
  { id: "18", date: "Mar 18", mode: "Unexpected", topic: "Lost luggage", score: 71, fixed: 4 },
  { id: "17", date: "Mar 17", mode: "Classic", topic: "Articles", score: 88, fixed: 1 },
];

function Lessons() {
  return (
    <MobileFrame>
      <main className="flex-1 overflow-y-auto px-5 pt-7 pb-6 space-y-5 bg-[#f6f5fd]">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-foreground">Your lessons</h1>
            <p className="text-xs text-muted-foreground">March 2026</p>
          </div>
          <Link
            to="/lesson/start"
            className="grid size-9 place-items-center rounded-full bg-primary text-white shadow-sm"
            aria-label="New lesson"
          >
            <Plus className="size-4" />
          </Link>
        </header>

        <section className="rounded-2xl bg-white p-4 shadow-sm">
          <div className="mb-3 grid grid-cols-7 gap-1 text-center text-[10px] text-muted-foreground">
            {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
              <span key={i}>{d}</span>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1.5">
            {month.map((d) => (
              <div
                key={d.day}
                className={`aspect-square grid place-items-center rounded-lg text-[11px] font-medium ${
                  d.today
                    ? "ring-2 ring-primary text-primary bg-primary-light font-semibold"
                    : d.done
                      ? "bg-primary text-white"
                      : d.missed
                        ? "bg-muted text-muted-foreground"
                        : "text-muted-foreground"
                }`}
              >
                {d.done ? <CheckCircle2 className="size-3.5" /> : d.day}
              </div>
            ))}
          </div>
          <div className="mt-3 flex items-center gap-3 text-[10px] text-muted-foreground">
            <span className="inline-flex items-center gap-1">
              <span className="size-2 rounded-full bg-primary" /> done
            </span>
            <span className="inline-flex items-center gap-1">
              <span className="size-2 rounded-full bg-muted" /> missed
            </span>
            <span className="inline-flex items-center gap-1">
              <span className="size-2 rounded-full ring-2 ring-primary" /> today
            </span>
          </div>
        </section>

        <section>
          <div className="mb-2 px-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Recent
          </div>
          <ul className="space-y-2.5">
            {past.map((l) => (
              <li key={l.id}>
                <Link
                  to="/lessons/$id"
                  params={{ id: l.id }}
                  className="flex items-center gap-3 rounded-2xl bg-white p-4 shadow-sm"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{l.date}</span>
                      <span>-</span>
                      <span className="font-medium text-primary">{l.mode}</span>
                    </div>
                    <div className="mt-0.5 text-sm font-semibold text-foreground">{l.topic}</div>
                    <div className="mt-1 text-[11px] text-muted-foreground">
                      {l.fixed} mistakes fixed
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-foreground">{l.score}</div>
                    <div className="text-[10px] text-muted-foreground">score</div>
                  </div>
                  <ChevronRight className="size-4 text-muted-foreground" />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <BottomTabs />
    </MobileFrame>
  );
}
