import { Mic } from "lucide-react";

export type MicStatus = "idle" | "recording" | "processing";

export function MicButton({
  status,
  onPressIn,
  onPressOut,
  size = 88,
}: {
  status: MicStatus;
  onPressIn?: () => void;
  onPressOut?: () => void;
  size?: number;
}) {
  const recording = status === "recording";
  return (
    <div className="relative grid place-items-center" style={{ width: size + 24, height: size + 24 }}>
      {recording && (
        <>
          <span
            className="absolute rounded-full bg-primary/30 animate-mic-ring"
            style={{ width: size, height: size }}
          />
          <span
            className="absolute rounded-full bg-primary/20 animate-mic-ring"
            style={{ width: size, height: size, animationDelay: "0.4s" }}
          />
        </>
      )}
      <button
        onMouseDown={onPressIn}
        onMouseUp={onPressOut}
        onMouseLeave={onPressOut}
        onTouchStart={onPressIn}
        onTouchEnd={onPressOut}
        className={`relative grid place-items-center rounded-full text-white shadow-lg transition-all ${
          recording ? "bg-destructive scale-105" : "bg-primary active:scale-95"
        }`}
        style={{ width: size, height: size, boxShadow: "0 12px 30px -10px rgba(109,94,252,0.55)" }}
        aria-label="Hold to speak"
      >
        <Mic className="size-8" strokeWidth={2.4} />
      </button>
    </div>
  );
}
