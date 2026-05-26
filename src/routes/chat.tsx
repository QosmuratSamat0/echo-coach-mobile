import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { MobileFrame } from "@/components/mobile/MobileFrame";
import { BottomTabs } from "@/components/mobile/BottomTabs";
import { ChatMessage } from "@/components/mobile/ChatMessage";
import { CorrectionCard } from "@/components/mobile/CorrectionCard";
import { MicButton, type MicStatus } from "@/components/mobile/MicButton";

export const Route = createFileRoute("/chat")({ component: ChatScreen });

function ChatScreen() {
  const [status, setStatus] = useState<MicStatus>("idle");

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
        <ChatMessage variant="ai" showPlay>
          Hi Alex! Tell me about your weekend.
        </ChatMessage>
        <ChatMessage variant="user">I goed to the park with my friends.</ChatMessage>
        <CorrectionCard
          wrong="goed"
          correct="went"
          explanation="Past tense of 'go' is irregular — use 'went'."
        />
        <ChatMessage variant="ai" showPlay>
          Nice! What did you do at the park?
        </ChatMessage>
        <ChatMessage variant="user">We play football and eat pizza.</ChatMessage>
        <CorrectionCard
          wrong="play"
          correct="played"
          explanation="Use past tense when describing finished actions."
        />
      </div>

      <div className="border-t border-border bg-white px-5 py-4">
        <div className="flex items-center gap-4">
          <MicButton
            status={status}
            onPressIn={() => setStatus("recording")}
            onPressOut={() => {
              setStatus("processing");
              setTimeout(() => setStatus("idle"), 1200);
            }}
          />
          <div className="flex-1">
            <div className="text-sm font-semibold text-foreground">Hold to speak</div>
            <div className="text-xs text-muted-foreground">Release when done</div>
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
