import { createFileRoute, Link } from "@tanstack/react-router";
import { MobileFrame } from "@/components/mobile/MobileFrame";

export const Route = createFileRoute("/login")({ component: LoginScreen });

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" aria-hidden>
      <path
        fill="#EA4335"
        d="M12 10.2v3.9h5.5c-.24 1.4-1.7 4.1-5.5 4.1-3.3 0-6-2.7-6-6.1s2.7-6.1 6-6.1c1.9 0 3.1.8 3.8 1.5l2.6-2.5C16.8 3.4 14.6 2.4 12 2.4 6.7 2.4 2.4 6.7 2.4 12S6.7 21.6 12 21.6c6.9 0 11.5-4.9 11.5-11.7 0-.8-.1-1.4-.2-2H12z"
      />
      <path fill="#34A853" d="M3.9 7.3l3.2 2.3C8 7.7 9.9 6.4 12 6.4c1.9 0 3.1.8 3.8 1.5l2.6-2.5C16.8 3.4 14.6 2.4 12 2.4 8.2 2.4 4.9 4.4 3.9 7.3z" opacity=".0" />
      <path fill="#FBBC05" d="M12 21.6c2.6 0 4.7-.9 6.3-2.4l-3-2.4c-.8.6-1.9 1-3.3 1-2.5 0-4.7-1.7-5.4-4l-3.2 2.5C5 19.4 8.2 21.6 12 21.6z" />
      <path fill="#4285F4" d="M23.5 12c0-.8-.1-1.4-.2-2H12v3.9h5.5c-.3 1.4-1.1 2.4-2.2 3.1l3 2.4c1.8-1.6 3.2-4.1 3.2-7.4z" />
    </svg>
  );
}

function LoginScreen() {
  return (
    <MobileFrame>
      <main className="flex-1 overflow-y-auto px-6 pt-16 pb-8 flex flex-col">
        <div className="text-center">
          <div className="mx-auto grid size-16 place-items-center rounded-2xl bg-primary text-xl font-bold text-white shadow-lg">
            ML
          </div>
          <h1 className="mt-5 text-2xl font-semibold text-foreground">Mini-Loora</h1>
          <p className="mt-1.5 text-sm text-muted-foreground">AI English Speaking Coach</p>
        </div>

        <div className="mt-12 space-y-3">
          <button
            type="button"
            className="flex w-full items-center justify-center gap-3 rounded-xl border border-border bg-white py-4 text-sm font-semibold text-foreground shadow-sm active:opacity-90"
          >
            <GoogleIcon />
            Continue with Google
          </button>

          <Link
            to="/"
            className="flex w-full items-center justify-center rounded-xl bg-secondary py-4 text-sm font-semibold text-foreground active:opacity-90"
          >
            Continue as guest
          </Link>

          <p className="px-2 pt-2 text-center text-[11px] leading-relaxed text-muted-foreground">
            By continuing, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>

        <div className="mt-auto pt-6 space-y-3">
          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-border" />
            <span className="text-[11px] text-muted-foreground">or use email</span>
            <div className="h-px flex-1 bg-border" />
          </div>
          <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <Link to="/login" className="font-medium text-foreground hover:text-primary">
              Sign in
            </Link>
            <span className="text-border">·</span>
            <Link to="/register" className="font-medium text-foreground hover:text-primary">
              Create account
            </Link>
          </div>
        </div>
      </main>
    </MobileFrame>
  );
}
