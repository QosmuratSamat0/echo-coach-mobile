import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { X, Type, Send } from "lucide-react";
import { MobileFrame } from "@/components/mobile/MobileFrame";
import { MicButton, type MicStatus } from "@/components/mobile/MicButton";

export const Route = createFileRoute("/lesson/session")({ component: Session });

function Session() {
  const navigate = useNavigate();
  const [status, setStatus] = useState<MicStatus>("idle");
  const [typing, setTyping] = useState(false);
  const [draft, setDraft] = useState("");

  const submit = () => {
    setStatus("processing");
    setTimeout(() => navigate({ to: "/lesson/result" }), 700);
  };

  return (
    <MobileFrame>
      {/* Top bar */}
      <header className="px-5 pt-5 pb-3">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="grid size-9 place-items-center rounded-full bg-white text-foreground shadow-sm"
            aria-label="Close"
          >
            <X className="size-4" />
          </Link>
          <span className="rounded-full bg-primary-light px-3 py-1 text-[11px] font-semibold text-primary">
            Classic
          </span>
          <span className="text-xs font-medium text-muted-foreground">2 of 3</span>
        </div>
        <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-border">
          <div className="h-full rounded-full bg-primary" style={{ width: "66%" }} />
        </div>
      </header>

      <main className="flex-1 overflow-y-auto px-5 pt-2 pb-6 space-y-5 bg-[#f6f5fd]">
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            Lesson
          </div>
          <h1 className="text-xl font-semibold text-foreground">Past Perfect Tense</h1>
        </div>

        <section className="rounded-2xl bg-white p-5 shadow-sm">
          <div className="text-[10px] font-semibold uppercase tracking-wider text-primary">
            Your prompt
          </div>
          <p className="mt-2 text-[17px] leading-relaxed text-foreground">
            Tell me what you did yesterday before dinner.
          </p>
        </section>

        {status === "processing" && (
          <div className="rounded-2xl border border-border bg-white p-4 text-sm text-foreground">
            <span className="inline-flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-primary animate-pulse-dot" />
              Saved. Checking your English...
            </span>
          </div>
        )}
      </main>

      {/* Input area */}
      <div className="border-t border-border bg-white px-5 py-5">
        {typing ? (
          <div className="space-y-3">
            <textarea
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Type your answer..."
              rows={3}
              className="w-full resize-none rounded-2xl border border-border bg-[#faf9ff] p-3 text-sm outline-none focus:border-primary"
            />
            <div className="flex items-center gap-2">
              <button
                onClick={() => setTyping(false)}
                className="rounded-full border border-border px-4 py-2.5 text-xs font-medium text-foreground"
              >
                Voice
              </button>
              <button
                onClick={submit}
                disabled={!draft.trim()}
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-primary py-3 text-sm font-semibold text-white disabled:opacity-40"
              >
                <Send className="size-4" /> Check my English
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <p className="mb-3 text-xs text-muted-foreground">
              {status === "recording"
                ? "Listening..."
                : "Hold the button and speak clearly"}
            </p>
            <MicButton
              status={status}
              onPressIn={() => setStatus("recording")}
              onPressOut={() => (status === "recording" ? submit() : setStatus("idle"))}
            />
            <div className="mt-3 text-sm font-semibold text-foreground">
              {status === "recording" ? "Release to send" : "Hold to speak"}
            </div>
            <button
              onClick={() => setTyping(true)}
              className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-primary"
            >
              <Type className="size-3.5" /> Type instead
            </button>
          </div>
        )}
      </div>
    </MobileFrame>
  );
}
