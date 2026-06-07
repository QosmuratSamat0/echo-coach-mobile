import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Send, ChevronDown, ChevronUp, Sparkles, Flag } from "lucide-react";
import { MobileFrame } from "@/components/mobile/MobileFrame";
import { MicButton, type MicStatus } from "@/components/mobile/MicButton";

export const Route = createFileRoute("/freetalk")({ component: FreeTalk });

type Msg = {
  id: string;
  role: "ai" | "user";
  text: string;
  correction?: { pattern: string; better: string; why: string };
};

const seed: Msg[] = [
  { id: "1", role: "ai", text: "Hey Ayan! What did you do today?" },
  {
    id: "2",
    role: "user",
    text: "I am agree with you, today was good.",
    correction: {
      pattern: "agreement",
      better: "I agree with you.",
      why: "Do not use 'am' with 'agree'.",
    },
  },
  { id: "3", role: "ai", text: "Nice. Tell me about the best part of your day." },
];

function FreeTalk() {
  const [messages, setMessages] = useState<Msg[]>(seed);
  const [draft, setDraft] = useState("");
  const [mic, setMic] = useState<MicStatus>("idle");

  const send = () => {
    const t = draft.trim();
    if (!t) return;
    setMessages((p) => [...p, { id: `u${Date.now()}`, role: "user", text: t }]);
    setDraft("");
    setTimeout(() => {
      setMessages((p) => [
        ...p,
        { id: `a${Date.now()}`, role: "ai", text: "Got it - tell me more!" },
      ]);
    }, 600);
  };

  return (
    <MobileFrame>
      <header className="flex items-center gap-3 px-5 pt-5 pb-3 bg-white border-b border-border">
        <Link
          to="/lesson/start"
          className="grid size-9 place-items-center rounded-full bg-muted text-foreground"
          aria-label="Back"
        >
          <ArrowLeft className="size-4" />
        </Link>
        <div className="flex-1">
          <div className="text-sm font-semibold text-foreground">Free Talk</div>
          <div className="text-[11px] text-muted-foreground">Open practice - AI still corrects you</div>
        </div>
        <Link
          to="/talk-summary"
          className="inline-flex items-center gap-1 rounded-full bg-primary px-2.5 py-1 text-[10px] font-semibold text-white"
        >
          End talk <Flag className="size-3" />
        </Link>
      </header>

      <main className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-[#f6f5fd]">
        <section className="rounded-2xl border border-primary/20 bg-white p-3 text-xs text-muted-foreground shadow-sm">
          Chat naturally. Noona saves repeated patterns quietly and turns them into quick lessons.
        </section>
        {messages.map((m) =>
          m.role === "ai" ? (
            <div key={m.id} className="max-w-[82%] rounded-2xl rounded-tl-md bg-white px-3.5 py-2.5 text-sm text-foreground shadow-sm">
              {m.text}
            </div>
          ) : (
            <div key={m.id} className="ml-auto max-w-[82%] space-y-1.5">
              <div className="rounded-2xl rounded-tr-md bg-primary px-3.5 py-2.5 text-sm text-white">
                {m.text}
              </div>
              {m.correction && <CorrectionBadge c={m.correction} />}
            </div>
          ),
        )}
      </main>

      <div className="border-t border-border bg-white px-4 py-3 space-y-2">
        <div className="flex items-center gap-2">
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder="Type a message..."
            className="flex-1 rounded-full border border-border bg-[#faf9ff] px-4 py-2.5 text-sm outline-none focus:border-primary"
          />
          <button
            onClick={send}
            disabled={!draft.trim()}
            className="grid size-10 place-items-center rounded-full bg-primary text-white disabled:opacity-40"
            aria-label="Send"
          >
            <Send className="size-4" />
          </button>
        </div>
        <div className="flex items-center justify-center gap-3">
          <MicButton
            status={mic}
            size={48}
            onPressIn={() => setMic("recording")}
            onPressOut={() => setMic("idle")}
          />
          <span className="text-[11px] text-muted-foreground">
            {mic === "recording" ? "Listening..." : "or hold to speak"}
          </span>
        </div>
        <Link
          to="/talk-summary"
          className="block text-center text-[11px] font-semibold text-primary"
        >
          Finish and see patterns
        </Link>
      </div>
    </MobileFrame>
  );
}

function CorrectionBadge({ c }: { c: { pattern: string; better: string; why: string } }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="text-xs">
      <button
        onClick={() => setOpen((o) => !o)}
        className="ml-auto flex items-center gap-1.5 rounded-full bg-primary-light px-2.5 py-1 text-primary"
      >
        <Sparkles className="size-3 text-primary" />
        <span className="font-semibold">{c.pattern}</span>
        {open ? <ChevronUp className="size-3.5 text-primary" /> : <ChevronDown className="size-3.5 text-primary" />}
      </button>
      {open && (
        <div className="mt-1.5 rounded-xl border border-primary/20 bg-white p-2.5 shadow-sm">
          <div className="font-semibold text-primary">Better: {c.better}</div>
          <p className="mt-1 text-muted-foreground">{c.why}</p>
        </div>
      )}
    </div>
  );
}
