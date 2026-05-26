import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { Send, Mic, Play, ChevronRight, AlertCircle } from "lucide-react";
import { MobileFrame } from "@/components/mobile/MobileFrame";
import { BottomTabs } from "@/components/mobile/BottomTabs";
import { MicButton, type MicStatus } from "@/components/mobile/MicButton";
import { seedMessages, saveMessage, type ChatMsg, type Correction } from "@/lib/corrections";

export const Route = createFileRoute("/chat")({ component: ChatScreen });

function ChatScreen() {
  const navigate = useNavigate();
  const [status, setStatus] = useState<MicStatus>("idle");
  const [messages, setMessages] = useState<ChatMsg[]>(seedMessages);
  const [draft, setDraft] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const pushMessage = (m: ChatMsg) => {
    saveMessage(m);
    setMessages((prev) => [...prev, m]);
  };

  const sendText = () => {
    const t = draft.trim();
    if (!t) return;
    pushMessage({ id: `u-${Date.now()}`, role: "user", source: "text", text: t });
    setDraft("");
    inputRef.current?.focus();
  };

  const simulateAudio = () => {
    setStatus("processing");
    setTimeout(() => {
      pushMessage({
        id: `u-${Date.now()}`,
        role: "user",
        source: "audio",
        text: "I have went there yesterday.",
        corrections: [
          {
            wrong: "have went",
            correct: "went",
            reason:
              "Use simple past with a specific past time like ‘yesterday’. Don’t mix present perfect with a finished time.",
            pronunciation: "wehnt",
            ipa: "/wɛnt/",
          },
        ],
      });
      setStatus("idle");
    }, 900);
  };

  return (
    <MobileFrame>
      <header className="flex items-center gap-3 border-b border-border px-5 py-4">
        <div className="grid size-10 place-items-center rounded-full bg-primary text-sm font-semibold text-white">
          AI
        </div>
        <div className="flex-1">
          <div className="text-sm font-semibold text-foreground">AI Coach</div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span className="size-1.5 rounded-full bg-[#22c55e]" /> Online
          </div>
        </div>
      </header>

      <div className="flex-1 space-y-4 overflow-y-auto px-5 py-4">
        {messages.map((m) =>
          m.role === "ai" ? (
            <div key={m.id} className="flex flex-col items-start gap-2">
              <div className="max-w-[80%] rounded-xl rounded-tl-[4px] border border-[#bfdbfe] bg-[#eff6ff] px-3.5 py-2.5 text-sm text-foreground">
                {m.text}
              </div>
              <button className="inline-flex items-center gap-1.5 rounded-full border border-border bg-white px-3 py-1 text-xs text-foreground">
                <Play className="size-3" /> Play
              </button>
            </div>
          ) : (
            <UserBubble
              key={m.id}
              msg={m}
              onOpen={() => navigate({ to: "/chat/correction/$id", params: { id: m.id } })}
            />
          ),
        )}
      </div>

      <div className="border-t border-border bg-white px-4 py-3 space-y-3">
        <div className="flex items-center gap-2">
          <input
            ref={inputRef}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendText()}
            placeholder="Type a message..."
            className="flex-1 rounded-full border border-border bg-white px-4 py-2.5 text-sm outline-none focus:border-primary"
          />
          <button
            onClick={sendText}
            disabled={!draft.trim()}
            className="grid size-10 place-items-center rounded-full bg-primary text-white disabled:opacity-40"
            aria-label="Send message"
          >
            <Send className="size-4" />
          </button>
        </div>

        <div className="flex items-center gap-3">
          <MicButton
            status={status}
            onPressIn={() => setStatus("recording")}
            onPressOut={simulateAudio}
          />
          <div className="flex-1">
            <div className="text-sm font-semibold text-foreground inline-flex items-center gap-1.5">
              <Mic className="size-3.5" /> Hold to speak
            </div>
            <div className="text-xs text-muted-foreground">
              Release to send audio · or type above
            </div>
          </div>
          {status === "processing" && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#eff6ff] px-3 py-1 text-xs font-medium text-[#1d4ed8]">
              <span className="size-1.5 rounded-full bg-primary animate-pulse-dot" />
              Processing...
            </span>
          )}
        </div>
      </div>

      <BottomTabs />
    </MobileFrame>
  );
}

function UserBubble({ msg, onOpen }: { msg: ChatMsg; onOpen: () => void }) {
  const hasCorrections = !!msg.corrections && msg.corrections.length > 0;

  // Render text with subtle highlights so the user knows what was corrected,
  // but the WHOLE bubble is the clickable target.
  const renderText = () => {
    if (!hasCorrections) return msg.text;
    const corrections = msg.corrections!;
    // Replace each wrong phrase (longest first to handle multi-word) with inline correction.
    const sorted = [...corrections].sort((a, b) => b.wrong.length - a.wrong.length);
    const placeholders: Correction[] = [];
    let working = msg.text;
    sorted.forEach((c, idx) => {
      const re = new RegExp(`\\b${c.wrong.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "i");
      if (re.test(working)) {
        working = working.replace(re, `\u0000${idx}\u0000`);
        placeholders[idx] = c;
      }
    });
    const parts = working.split(/\u0000(\d+)\u0000/);
    return parts.map((p, i) => {
      if (i % 2 === 1) {
        const c = placeholders[Number(p)];
        return (
          <span key={i} className="inline-flex flex-wrap items-baseline gap-1">
            <span className="text-white/70 line-through decoration-white/80">{c.wrong}</span>
            <span className="rounded bg-white/20 px-1 font-semibold text-white">
              {c.correct}
            </span>
          </span>
        );
      }
      return <span key={i}>{p}</span>;
    });
  };

  const Wrapper: React.ElementType = hasCorrections ? "button" : "div";

  return (
    <div className="flex flex-col items-end gap-1.5">
      <Wrapper
        {...(hasCorrections ? { onClick: onOpen } : {})}
        className={`max-w-[85%] text-left rounded-xl rounded-tr-[4px] bg-primary px-3.5 py-2.5 text-sm text-white ${
          hasCorrections ? "cursor-pointer active:opacity-90" : ""
        }`}
      >
        <div>{renderText()}</div>
        {hasCorrections && (
          <div className="mt-2 flex items-center justify-between gap-2 border-t border-white/20 pt-1.5 text-[11px] text-white/90">
            <span className="inline-flex items-center gap-1">
              <AlertCircle className="size-3" />
              {msg.corrections!.length} correction
              {msg.corrections!.length > 1 ? "s" : ""} · tap to view
            </span>
            <ChevronRight className="size-3.5" />
          </div>
        )}
      </Wrapper>
      {msg.source === "audio" && (
        <Link
          to="/chat"
          className="text-[11px] text-muted-foreground"
          onClick={(e) => e.preventDefault()}
        >
          voice message
        </Link>
      )}
    </div>
  );
}
