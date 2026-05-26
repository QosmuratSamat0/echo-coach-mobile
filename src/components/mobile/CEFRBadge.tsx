export function CEFRBadge({ level }: { level: string }) {
  return (
    <span className="inline-flex items-center rounded-full bg-[#eff6ff] px-3 py-1 text-xs font-semibold text-[#1d4ed8]">
      {level}
    </span>
  );
}
