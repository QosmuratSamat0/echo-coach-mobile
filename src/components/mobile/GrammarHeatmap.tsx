export type HeatmapItem = { label: string; value: number };

function barColor(v: number) {
  if (v > 70) return "#ef4444";
  if (v >= 40) return "#f59e0b";
  return "#22c55e";
}

export function GrammarHeatmap({ data }: { data: HeatmapItem[] }) {
  return (
    <div className="rounded-xl border border-border bg-white p-4">
      <div className="mb-3 text-sm font-semibold text-foreground">Grammar heatmap</div>
      <ul className="space-y-3">
        {data.map((item) => (
          <li key={item.label}>
            <div className="mb-1 flex items-center justify-between text-xs">
              <span className="text-foreground">{item.label}</span>
              <span className="text-muted-foreground">{item.value}%</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-[#f1f5f9]">
              <div
                className="h-full rounded-full"
                style={{ width: `${item.value}%`, backgroundColor: barColor(item.value) }}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
