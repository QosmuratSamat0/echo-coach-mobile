import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Coffee, Target, User2, Bot } from "lucide-react";
import { MobileFrame } from "@/components/mobile/MobileFrame";

export const Route = createFileRoute("/roleplay")({ component: RolePlay });

function RolePlay() {
  return (
    <MobileFrame>
      <header className="flex items-center gap-3 px-5 pt-5 pb-3">
        <Link
          to="/lesson/start"
          className="grid size-9 place-items-center rounded-full bg-white text-foreground shadow-sm"
          aria-label="Back"
        >
          <ArrowLeft className="size-4" />
        </Link>
        <div className="text-sm font-semibold text-foreground">Role-play</div>
      </header>

      <main className="flex-1 overflow-y-auto px-5 pt-2 pb-6 space-y-5 bg-[#f6f5fd]">
        <section className="rounded-3xl bg-white p-5 shadow-sm">
          <div className="grid size-14 place-items-center rounded-2xl bg-[#fef3c7] text-[#b45309]">
            <Coffee className="size-6" />
          </div>
          <h1 className="mt-4 text-xl font-semibold text-foreground">Coffee shop</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            A short conversation to practice ordering and small talk.
          </p>

          <ul className="mt-5 space-y-3">
            <Row icon={User2} label="Your role" value="Customer" />
            <Row icon={Bot} label="AI role" value="Barista" />
            <Row icon={Target} label="Goal" value="Order a drink and ask about price" />
          </ul>
        </section>

        <div className="grid gap-2">
          <div className="text-xs text-muted-foreground px-1">More scenarios coming up</div>
          <div className="grid grid-cols-2 gap-2">
            {["Airport", "Job interview", "Hotel", "Small talk"].map((s) => (
              <div key={s} className="rounded-2xl bg-white p-3 text-center text-xs font-medium text-muted-foreground shadow-sm">
                {s}
              </div>
            ))}
          </div>
        </div>

        <Link
          to="/lesson/session"
          className="block w-full rounded-full bg-primary py-3.5 text-center text-sm font-semibold text-white"
        >
          Start role-play
        </Link>
      </main>
    </MobileFrame>
  );
}

function Row({ icon: Icon, label, value }: { icon: typeof Coffee; label: string; value: string }) {
  return (
    <li className="flex items-center gap-3">
      <div className="grid size-9 place-items-center rounded-xl bg-primary-light text-primary">
        <Icon className="size-4" />
      </div>
      <div className="flex-1">
        <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
        <div className="text-sm font-semibold text-foreground">{value}</div>
      </div>
    </li>
  );
}
