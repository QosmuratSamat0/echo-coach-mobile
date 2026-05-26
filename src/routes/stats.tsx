import { createFileRoute } from "@tanstack/react-router";
import { MobileFrame } from "@/components/mobile/MobileFrame";
import { BottomTabs } from "@/components/mobile/BottomTabs";

export const Route = createFileRoute("/stats")({ component: StatsScreen });

const week = [3, 5, 2, 6, 4, 7, 5];
const max = Math.max(...week);

const mistakes = [
  { label: "Past tense", count: 24, pct: 32, color: "#ef4444" },
  { label: "Articles (a/the)", count: 18, pct: 24, color: "#f59e0b" },
  { label: "Prepositions", count: 14, pct: 19, color: "#f59e0b" },
  { label: "Pronunciation", count: 11, pct: 15, color: "#22c55e" },
  { label: "Word order", count: 7, pct: 10, color: "#22c55e" },
];

function StatsScreen() {
  return (
    <MobileFrame>
      <main className="flex-1 overflow-y-auto px-5 pt-8 pb-4 space-y-4">
        <h1 className="text-xl font-semibold text-foreground">Progress</h1>

        <div className="rounded-xl border border-border bg-white p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs text-muted-foreground">Current level</div>
              <div className="text-2xl font-semibold text-foreground">A2</div>
            </div>
            <div className="text-xs text-muted-foreground">Next: B1</div>
          </div>
          <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-[#f1f5f9]">
            <div className="h-full rounded-full bg-primary" style={{ width: "62%" }} />
          </div>
          <div className="mt-1.5 text-xs text-muted-foreground">62% to B1</div>
        </div>

        <div className="rounded-xl border border-border bg-white p-4">
          <div className="mb-4 text-sm font-semibold text-foreground">Sessions · last 7 days</div>
          <div className="flex h-32 items-end justify-between gap-2">
            {week.map((v, i) => (
              <div key={i} className="flex flex-1 flex-col items-center gap-2">
                <div
                  className="w-full rounded-md bg-primary"
                  style={{ height: `${(v / max) * 100}%` }}
                />
                <span className="text-[10px] text-muted-foreground">
                  {["M", "T", "W", "T", "F", "S", "S"][i]}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-border bg-white p-4">
          <div className="mb-3 text-sm font-semibold text-foreground">Top mistakes</div>
          <ul className="space-y-3">
            {mistakes.map((m) => (
              <li key={m.label} className="flex items-center gap-3">
                <span className="size-2 rounded-full" style={{ backgroundColor: m.color }} />
                <span className="flex-1 text-sm text-foreground">{m.label}</span>
                <span className="text-xs text-muted-foreground">{m.count}</span>
                <span className="w-10 text-right text-xs font-medium text-foreground">
                  {m.pct}%
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl border border-border bg-white p-4">
          <div className="text-sm font-semibold text-foreground">Vocabulary</div>
          <div className="mt-2 flex items-end justify-between">
            <div>
              <div className="text-2xl font-semibold text-foreground">37</div>
              <div className="text-xs text-muted-foreground">new words this week</div>
            </div>
            <div className="text-xs font-medium text-[#22c55e]">+12% vs last week</div>
          </div>
        </div>
      </main>
      <BottomTabs />
    </MobileFrame>
  );
}
