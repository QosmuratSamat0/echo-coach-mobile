import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { MobileFrame } from "@/components/mobile/MobileFrame";

export const Route = createFileRoute("/login")({ component: LoginScreen });

function LoginScreen() {
  const [show, setShow] = useState(false);

  return (
    <MobileFrame>
      <main className="flex-1 overflow-y-auto px-6 pt-12 pb-8 flex flex-col">
        <div className="text-center">
          <div className="mx-auto grid size-14 place-items-center rounded-2xl bg-primary text-lg font-bold text-white">
            ML
          </div>
          <h1 className="mt-4 text-2xl font-semibold text-foreground">Mini-Loora</h1>
          <p className="mt-1 text-sm text-muted-foreground">AI English Speaking Coach</p>
        </div>

        <form className="mt-8 space-y-3" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="text-xs font-medium text-foreground">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="mt-1.5 w-full rounded-lg border border-border bg-white px-3 py-3 text-sm outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-foreground">Password</label>
            <div className="relative mt-1.5">
              <input
                type={show ? "text" : "password"}
                placeholder="••••••••"
                className="w-full rounded-lg border border-border bg-white px-3 py-3 pr-10 text-sm outline-none focus:border-primary"
              />
              <button
                type="button"
                onClick={() => setShow((s) => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              >
                {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>
          </div>

          <Link
            to="/"
            className="block w-full rounded-xl bg-primary py-3.5 text-center text-sm font-semibold text-white"
          >
            Sign in
          </Link>

          <div className="text-center">
            <button type="button" className="text-xs font-medium text-primary">
              Forgot password?
            </button>
          </div>

          <div className="my-2 flex items-center gap-3">
            <div className="h-px flex-1 bg-border" />
            <span className="text-xs text-muted-foreground">or</span>
            <div className="h-px flex-1 bg-border" />
          </div>

          <button
            type="button"
            className="w-full rounded-xl border border-border bg-white py-3.5 text-sm font-semibold text-foreground"
          >
            Continue with Google
          </button>
        </form>

        <p className="mt-auto pt-6 text-center text-xs text-muted-foreground">
          Don't have an account?{" "}
          <Link to="/register" className="font-semibold text-primary">
            Sign up
          </Link>
        </p>
      </main>
    </MobileFrame>
  );
}
