import { createFileRoute, Link } from "@tanstack/react-router";
import { User, Mail, Globe, Target, GraduationCap, Bell, LogOut, ChevronRight } from "lucide-react";
import { MobileFrame } from "@/components/mobile/MobileFrame";
import { BottomTabs } from "@/components/mobile/BottomTabs";
import { CEFRBadge } from "@/components/mobile/CEFRBadge";

export const Route = createFileRoute("/profile")({ component: ProfileScreen });

const rows = [
  { icon: User, label: "Name", value: "Ayan" },
  { icon: Mail, label: "Email", value: "ayan@example.com" },
  { icon: Globe, label: "Native language", value: "Russian" },
  { icon: Target, label: "Target language", value: "English" },
  { icon: GraduationCap, label: "Current level", value: "A2" },
  { icon: Bell, label: "Notification time", value: "9:00 AM" },
];

function ProfileScreen() {
  return (
    <MobileFrame>
      <main className="flex-1 overflow-y-auto px-5 pt-8 pb-6 space-y-5 bg-[#f6f5fd]">
        <div className="flex flex-col items-center text-center">
          <div className="grid size-20 place-items-center rounded-full bg-primary-light text-2xl font-semibold text-primary">
            A
          </div>
          <div className="mt-3 text-base font-semibold text-foreground">Ayan</div>
          <div className="text-xs text-muted-foreground">ayan@example.com</div>
          <div className="mt-2">
            <CEFRBadge level="A2" />
          </div>
        </div>

        <div className="rounded-2xl bg-white shadow-sm overflow-hidden">
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
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-white py-3.5 text-sm font-semibold text-destructive shadow-sm"
        >
          <LogOut className="size-4" /> Logout
        </Link>
      </main>
      <BottomTabs />
    </MobileFrame>
  );
}
