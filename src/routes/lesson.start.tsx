import { createFileRoute, Link } from "@tanstack/react-router";
import { X, BookOpen, Users, Zap, MessageCircle, ArrowRight } from "lucide-react";
import { MobileFrame } from "@/components/mobile/MobileFrame";

export const Route = createFileRoute("/lesson/start")({ component: ModeSelect });

const modes = [
  {
    id: "classic",
    title: "Classic",
    desc: "Guided practice with simple prompts.",
    icon: BookOpen,
    color: "bg-primary-light text-primary",
    to: "/lesson/session" as const,
    recommended: true,
  },
  {
    id: "roleplay",
    title: "Role-play",
    desc: "Coffee shop, airport, interview...",
    icon: Users,
    color: "bg-[#fef3c7] text-[#b45309]",
    to: "/roleplay" as const,
  },
  {
    id: "unexpected",
    title: "Unexpected Case",
    desc: "Sudden situations. React fast.",
    icon: Zap,
    color: "bg-[#fee2e2] text-[#dc2626]",
    to: "/lesson/session" as const,
  },
  {
    id: "free",
    title: "Free Talk",
    desc: "Open chat with AI · still corrected.",
    icon: MessageCircle,
    color: "bg-[#dcfce7] text-[#15803d]",
    to: "/freetalk" as const,
  },
] as const;

function ModeSelect() {
  return (
    <MobileFrame>
      <header className="flex items-center justify-between px-5 pt-6 pb-2">
        <Link
          to="/"
          className="grid size-9 place-items-center rounded-full bg-white text-foreground shadow-sm"
          aria-label="Close"
        >
          <X className="size-4" />
        </Link>
        <div className="text-sm font-semibold">Choose a mode</div>
        <div className="size-9" />
      </header>

      <main className="flex-1 overflow-y-auto px-5 pt-2 pb-6 space-y-3 bg-[#f6f5fd]">
        <p className="px-1 text-xs text-muted-foreground">
          How do you want to practice today?
        </p>
        {modes.map((m) => (
          <Link
            key={m.id}
            to={m.to}
            className="flex items-center gap-3 rounded-2xl bg-white p-4 shadow-sm active:scale-[0.99] transition-transform"
          >
            <div className={`grid size-12 place-items-center rounded-xl ${m.color}`}>
              <m.icon className="size-5" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <div className="text-sm font-semibold text-foreground">{m.title}</div>
                {m.recommended && (
                  <span className="rounded-full bg-primary px-2 py-0.5 text-[10px] font-semibold text-white">
                    Recommended
                  </span>
                )}
              </div>
              <div className="mt-0.5 text-xs text-muted-foreground">{m.desc}</div>
            </div>
            <ArrowRight className="size-4 text-muted-foreground" />
          </Link>
        ))}
      </main>
    </MobileFrame>
  );
}
