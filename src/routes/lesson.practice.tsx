import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Check, CheckCircle2 } from "lucide-react";
import { MobileFrame } from "@/components/mobile/MobileFrame";
import { MicButton, type MicStatus } from "@/components/mobile/MicButton";

export const Route = createFileRoute("/lesson/practice")({ component: Practice });

function Practice() {
  const [tab, setTab] = useState<"fix" | "say">("fix");
  const [answer, setAnswer] = useState("");
  const [done, setDone] = useState(false);
  const [mic, setMic] = useState<MicStatus>("idle");

  const correct = "I went to school yesterday.";
  const check = () => setDone(answer.trim().toLowerCase().includes("went"));

  return (
    <MobileFrame>
      <header className="flex items-center gap-3 px-5 pt-5 pb-3">
        <Link
          to="/lesson/result"
          className="grid size-9 place-items-center rounded-full bg-white text-foreground shadow-sm"
          aria-label="Back"
        >
          <ArrowLeft className="size-4" />
        </Link>
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-wider text-primary">
            Past tense
          </div>
          <div className="text-sm font-semibold text-foreground">Practice this mistake</div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto px-5 pt-2 pb-6 space-y-4 bg-[#f6f5fd]">
        <section className="rounded-2xl bg-white p-4 shadow-sm">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-destructive line-through">I go to school yesterday.</span>
          </div>
          <div className="mt-1.5 text-sm font-semibold text-primary">{correct}</div>
          <p className="mt-2 text-xs text-muted-foreground">
            Use past tense with <span className="font-semibold text-foreground">yesterday</span>.
          </p>
        </section>

        <div className="flex gap-2 rounded-full bg-white p-1 shadow-sm">
          {(["fix", "say"] as const).map((t) => (
            <button
              key={t}
              onClick={() => {
                setTab(t);
                setDone(false);
              }}
              className={`flex-1 rounded-full py-2 text-xs font-semibold ${
                tab === t ? "bg-primary text-white" : "text-muted-foreground"
              }`}
            >
              {t === "fix" ? "Fix the sentence" : "Say it correctly"}
            </button>
          ))}
        </div>

        {done ? (
          <section className="rounded-2xl bg-[#ecfdf5] p-5 text-center">
            <CheckCircle2 className="mx-auto size-10 text-[#10b981]" />
            <div className="mt-2 text-base font-semibold text-foreground">Great. You fixed it.</div>
            <div className="mt-1 text-xs text-muted-foreground">Keep going - small wins add up.</div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  setDone(false);
                  setAnswer("");
                }}
                className="rounded-full border border-border bg-white py-2.5 text-xs font-semibold text-foreground"
              >
                Practice again
              </button>
              <Link
                to="/lesson/session"
                className="rounded-full bg-primary py-2.5 text-xs font-semibold text-white"
              >
                Back to lesson
              </Link>
            </div>
          </section>
        ) : tab === "fix" ? (
          <section className="rounded-2xl bg-white p-4 shadow-sm">
            <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              Fix this
            </div>
            <div className="mt-1 text-sm text-foreground">I go to school yesterday.</div>
            <textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Type the correct sentence..."
              rows={2}
              className="mt-3 w-full resize-none rounded-xl border border-border bg-[#faf9ff] p-3 text-sm outline-none focus:border-primary"
            />
            <button
              onClick={check}
              disabled={!answer.trim()}
              className="mt-3 inline-flex w-full items-center justify-center gap-1.5 rounded-full bg-primary py-3 text-sm font-semibold text-white disabled:opacity-40"
            >
              <Check className="size-4" /> Check
            </button>
          </section>
        ) : (
          <section className="rounded-2xl bg-white p-5 shadow-sm flex flex-col items-center">
            <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              Say it correctly
            </div>
            <div className="mt-2 text-base font-semibold text-foreground text-center">
              "{correct}"
            </div>
            <div className="mt-5">
              <MicButton
                status={mic}
                size={76}
                onPressIn={() => setMic("recording")}
                onPressOut={() => {
                  setMic("idle");
                  setTimeout(() => setDone(true), 400);
                }}
              />
            </div>
            <div className="mt-3 text-xs font-medium text-foreground">
              {mic === "recording" ? "Listening..." : "Hold to speak"}
            </div>
          </section>
        )}
      </main>
    </MobileFrame>
  );
}
