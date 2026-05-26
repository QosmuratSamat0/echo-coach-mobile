import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { MobileFrame } from "@/components/mobile/MobileFrame";

export const Route = createFileRoute("/register")({ component: RegisterScreen });

function strength(pw: string): 0 | 1 | 2 | 3 | 4 {
  let s = 0;
  if (pw.length >= 8) s++;
  if (/[A-Z]/.test(pw)) s++;
  if (/[0-9]/.test(pw)) s++;
  if (/[^A-Za-z0-9]/.test(pw)) s++;
  return s as 0 | 1 | 2 | 3 | 4;
}

function RegisterScreen() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");

  const emailError = email.length > 0 && !email.includes("@");
  const s = useMemo(() => strength(pw), [pw]);
  const labels = ["", "Weak", "Weak", "Medium", "Strong"];
  const colors = ["#e2e8f0", "#ef4444", "#ef4444", "#f59e0b", "#22c55e"];

  return (
    <MobileFrame>
      <main className="flex-1 overflow-y-auto px-6 pt-12 pb-8 flex flex-col">
        <div className="text-center">
          <div className="mx-auto grid size-14 place-items-center rounded-2xl bg-primary text-lg font-bold text-white">
            ML
          </div>
          <h1 className="mt-4 text-2xl font-semibold text-foreground">Create account</h1>
          <p className="mt-1 text-sm text-muted-foreground">Start practicing English today</p>
        </div>

        <form className="mt-8 space-y-3" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="text-xs font-medium text-foreground">Full name</label>
            <input
              type="text"
              placeholder="Alex Smith"
              className="mt-1.5 w-full rounded-lg border border-border bg-white px-3 py-3 text-sm outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="text-xs font-medium text-foreground">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className={`mt-1.5 w-full rounded-lg border bg-white px-3 py-3 text-sm outline-none ${
                emailError ? "border-[#ef4444]" : "border-border focus:border-primary"
              }`}
            />
            {emailError && (
              <p className="mt-1 text-xs text-[#ef4444]">Please enter a valid email address</p>
            )}
          </div>

          <div>
            <label className="text-xs font-medium text-foreground">Password</label>
            <div className="relative mt-1.5">
              <input
                type={show ? "text" : "password"}
                value={pw}
                onChange={(e) => setPw(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-lg border border-border bg-white px-3 py-3 pr-10 text-sm outline-none focus:border-primary"
              />
              <button
                type="button"
                onClick={() => setShow((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              >
                {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>
            <div className="mt-2 flex items-center gap-2">
              <div className="flex flex-1 gap-1">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="h-1 flex-1 rounded-full"
                    style={{ backgroundColor: i <= s ? colors[s] : "#e2e8f0" }}
                  />
                ))}
              </div>
              <span className="text-[10px] font-medium text-muted-foreground">{labels[s]}</span>
            </div>
          </div>

          <Link
            to="/"
            className="block w-full rounded-xl bg-primary py-3.5 text-center text-sm font-semibold text-white"
          >
            Create account
          </Link>
        </form>

        <p className="mt-auto pt-6 text-center text-xs text-muted-foreground">
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-primary">
            Sign in
          </Link>
        </p>
      </main>
    </MobileFrame>
  );
}
