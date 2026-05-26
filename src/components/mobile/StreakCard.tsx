import { Flame } from "lucide-react";

export function StreakCard({ days = 5, total = 7 }: { days?: number; total?: number }) {
  return (
    <div className="rounded-xl border border-border bg-white p-4">
      <div className="flex items-center gap-3">
        <div className="grid size-10 place-items-center rounded-full bg-[#eff6ff] text-primary">
          <Flame className="size-5" />
        </div>
        <div>
          <div className="text-sm font-semibold text-foreground">{days} day streak</div>
          <div className="text-xs text-muted-foreground">Keep it going!</div>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between gap-1.5">
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            className={`size-3 rounded-full ${i < days ? "bg-primary" : "bg-border"}`}
          />
        ))}
      </div>
    </div>
  );
}
