import { Mic } from "lucide-react";

export type MicStatus = "idle" | "recording" | "processing";

export function MicButton({
  status,
  onPressIn,
  onPressOut,
}: {
  status: MicStatus;
  onPressIn?: () => void;
  onPressOut?: () => void;
}) {
  return (
    <button
      onMouseDown={onPressIn}
      onMouseUp={onPressOut}
      onMouseLeave={onPressOut}
      onTouchStart={onPressIn}
      onTouchEnd={onPressOut}
      className={`grid size-14 place-items-center rounded-full text-white transition-colors ${
        status === "recording" ? "bg-[#ef4444]" : "bg-primary"
      }`}
      aria-label="Hold to speak"
    >
      <Mic className="size-6" />
    </button>
  );
}
