import { ArrowRight } from "lucide-react";

export function CorrectionCard({
  wrong,
  correct,
  explanation,
}: {
  wrong: string;
  correct: string;
  explanation: string;
}) {
  return (
    <div className="ml-auto max-w-[80%] rounded-xl border border-[#bfdbfe] bg-white p-3">
      <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
        Correction
      </div>
      <div className="mt-1.5 flex items-center gap-2 text-sm">
        <span className="text-[#ef4444] line-through">{wrong}</span>
        <ArrowRight className="size-3.5 text-muted-foreground" />
        <span className="font-semibold text-primary">{correct}</span>
      </div>
      <p className="mt-1.5 text-xs text-muted-foreground">{explanation}</p>
    </div>
  );
}
