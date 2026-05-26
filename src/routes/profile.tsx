import { createFileRoute, Link } from "@tanstack/react-router";
import { Bell, Target, Globe, LogOut, ChevronRight } from "lucide-react";
import { MobileFrame } from "@/components/mobile/MobileFrame";
import { BottomTabs } from "@/components/mobile/BottomTabs";
import { CEFRBadge } from "@/components/mobile/CEFRBadge";

export const Route = createFileRoute("/profile")({ component: ProfileScreen });

const rows = [
  { icon: Bell, label: "Notification preferences", value: "On" },
  { icon: Target, label: "Daily goal", value: "10 min" },
  { icon: Globe, label: "Language interface", value: "English" },
];

function ProfileScreen() {
  return (
    <MobileFrame>
      <main className="flex-1 overflow-y-auto px-5 pt-8 pb-4 space-y-5">
        <div className="flex flex-col items-center text-center">
          <div className="grid size-20 place-items-center rounded-full bg-[#eff6ff] text-xl font-semibold text-primary">
            AS
          </div>
          <div className="mt-3 text-base font-semibold text-foreground">Alex Smith</div>
          <div className="text-xs text-muted-foreground">alex@example.com</div>
          <div className="mt-2">
            <CEFRBadge level="A2" />
          </div>
        </div>

        <div className="rounded-xl border border-border bg-white">
          {rows.map((row, i) => (
            <button
              key={row.label}
              className={`flex w-full items-center gap-3 px-4 py-3.5 text-left ${
                i !== rows.length - 1 ? "border-b border-border" : ""
              }`}
            >
              <row.icon className="size-4 text-muted-foreground" />
              <span className="flex-1 text-sm text-foreground">{row.label}</span>
              <span className="text-xs text-muted-foreground">{row.value}</span>
              <ChevronRight className="size-4 text-muted-foreground" />
            </button>
          ))}
        </div>

        <Link
          to="/login"
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-white py-3.5 text-sm font-semibold text-[#ef4444]"
        >
          <LogOut className="size-4" /> Logout
        </Link>
      </main>
      <BottomTabs />
    </MobileFrame>
  );
}
