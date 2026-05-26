import { Play } from "lucide-react";
import type { ReactNode } from "react";

export function ChatMessage({
  variant,
  children,
  showPlay,
}: {
  variant: "ai" | "user";
  children: ReactNode;
  showPlay?: boolean;
}) {
  if (variant === "user") {
    return (
      <div className="flex justify-end">
        <div className="max-w-[80%] rounded-xl rounded-tr-[4px] bg-primary px-3.5 py-2.5 text-sm text-white">
          {children}
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col items-start gap-2">
      <div className="max-w-[80%] rounded-xl rounded-tl-[4px] border border-[#bfdbfe] bg-[#eff6ff] px-3.5 py-2.5 text-sm text-foreground">
        {children}
      </div>
      {showPlay && (
        <button className="inline-flex items-center gap-1.5 rounded-full border border-border bg-white px-3 py-1 text-xs text-foreground">
          <Play className="size-3" /> Play
        </button>
      )}
    </div>
  );
}
