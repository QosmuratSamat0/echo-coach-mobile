import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Send, ChevronDown, ChevronUp, Sparkles } from "lucide-react";
import { MobileFrame } from "@/components/mobile/MobileFrame";
import { MicButton, type MicStatus } from "@/components/mobile/MicButton";

export const Route = createFileRoute("/freetalk")({ component: FreeTalk });

type Msg = {
  id: string;
  role: "ai" | "user";
  text: string;
  correction?: { better: string; why: string };
};

const seed: Msg[] = [
  { id: "1", role: "ai", text: "Hey Ayan! What did you do today?" },
  {
    id: "2",
    role: "user",
    text: "I am agree with you, today was good.",
    correction: { better: "I agree with you.", why: "Don’t use ‘am’ with ‘agree’." },
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
        { id: `a${Date.now()}`, role: "ai", text: "Got it — tell me more!" },
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
          <div className="text-[11px] text-muted-foreground">Open practice · AI still corrects you</div>
        </div>
        <span className="rounded-full bg-primary-light px-2.5 py-1 text-[10px] font-semibold text-primary">
          Practice
        </span>
      </header>

      <main className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-[#f6f5fd]">
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
              {m.correction && <CorrectionCard c={m.correction} />}
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
      </div>
    </MobileFrame>
  );
}

function CorrectionCard({ c }: { c: { better: string; why: string } }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-xl border border-primary/30 bg-primary-light p-2.5 text-xs">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center gap-1.5 text-left"
      >
        <Sparkles className="size-3 text-primary" />
        <span className="font-semibold text-primary">Better:</span>
        <span className="flex-1 text-foreground">{c.better}</span>
        {open ? <ChevronUp className="size-3.5 text-primary" /> : <ChevronDown className="size-3.5 text-primary" />}
      </button>
      {open && <p className="mt-1.5 text-muted-foreground">{c.why}</p>}
    </div>
  );
}
