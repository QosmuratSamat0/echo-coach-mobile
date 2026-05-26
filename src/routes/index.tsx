import { createFileRoute, Link } from "@tanstack/react-router";
import { MobileFrame } from "@/components/mobile/MobileFrame";
import { BottomTabs } from "@/components/mobile/BottomTabs";
import { CEFRBadge } from "@/components/mobile/CEFRBadge";
import { StreakCard } from "@/components/mobile/StreakCard";
import { StatCard } from "@/components/mobile/StatCard";
import { GrammarHeatmap } from "@/components/mobile/GrammarHeatmap";

export const Route = createFileRoute("/")({ component: Dashboard });

function Dashboard() {
  return (
    <MobileFrame>
      <main className="flex-1 overflow-y-auto px-5 pt-8 pb-4">
        <header className="mb-5 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-foreground">Hey, Alex!</h1>
            <p className="text-xs text-muted-foreground">Ready to practice?</p>
          </div>
          <CEFRBadge level="A2" />
        </header>

        <div className="space-y-4">
          <StreakCard days={5} total={7} />

          <div className="grid grid-cols-2 gap-3">
            <StatCard label="Sessions" value={24} />
            <StatCard label="Corrections" value={138} />
            <StatCard label="Vocabulary" value={412} />
            <StatCard label="CEFR level" value="A2" />
          </div>

          <GrammarHeatmap
            data={[
              { label: "Past tense", value: 78 },
              { label: "Articles", value: 52 },
              { label: "Prepositions", value: 38 },
              { label: "Pronunciation", value: 55 },
            ]}
          />

          <Link
            to="/chat"
            className="block w-full rounded-xl bg-primary py-3.5 text-center text-sm font-semibold text-white"
          >
            Start practice
          </Link>
        </div>
      </main>
      <BottomTabs />
    </MobileFrame>
  );
}
