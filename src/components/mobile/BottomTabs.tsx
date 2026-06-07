import { Link, useLocation } from "@tanstack/react-router";
import { Home, BookOpen, TrendingUp, User } from "lucide-react";

const tabs = [
  { to: "/", label: "Home", icon: Home, match: (p: string) => p === "/" },
  { to: "/lessons", label: "Lessons", icon: BookOpen, match: (p: string) => p.startsWith("/lessons") },
  { to: "/progress", label: "Progress", icon: TrendingUp, match: (p: string) => p.startsWith("/progress") },
  { to: "/profile", label: "Profile", icon: User, match: (p: string) => p.startsWith("/profile") },
] as const;

export function BottomTabs() {
  const { pathname } = useLocation();
  return (
    <nav className="border-t border-border bg-white">
      <ul className="grid grid-cols-4">
        {tabs.map(({ to, label, icon: Icon, match }) => {
          const active = match(pathname);
          return (
            <li key={to}>
              <Link
                to={to}
                className={`flex flex-col items-center justify-center gap-1 py-2.5 text-[11px] ${
                  active ? "text-primary" : "text-muted-foreground"
                }`}
              >
                <Icon className="size-5" strokeWidth={active ? 2.4 : 2} />
                <span className={active ? "font-semibold" : ""}>{label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
