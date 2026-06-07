import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { MobileFrame } from "@/components/mobile/MobileFrame";

export const Route = createFileRoute("/lessons/$id")({ component: LessonDetail });

const exercises = [
  {
    prompt: "Tell me what you did yesterday before dinner.",
    you: "I go to park.",
    better: "I went to the park.",
    focus: "Past tense",
  },
  {
    prompt: "Describe your morning routine.",
    you: "I wake up at seven and drink coffee.",
    better: "I wake up at seven and drink coffee.",
    focus: "Great!",
  },
];

function LessonDetail() {
  const { id } = Route.useParams();
  return (
    <MobileFrame>
      <header className="flex items-center gap-3 px-5 pt-5 pb-3 bg-white">
        <Link
          to="/lessons"
          className="grid size-9 place-items-center rounded-full bg-muted text-foreground"
          aria-label="Back"
        >
          <ArrowLeft className="size-4" />
        </Link>
        <div className="flex-1">
          <div className="text-[11px] text-muted-foreground">Mar {id} - Classic</div>
          <div className="text-sm font-semibold text-foreground">Past simple</div>
        </div>
        <div className="text-right">
          <div className="text-xl font-bold text-primary">78</div>
          <div className="text-[10px] text-muted-foreground">score</div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto px-5 pt-4 pb-6 space-y-4 bg-[#f6f5fd]">
        <section className="grid grid-cols-3 gap-2.5">
          <Mini v="12" l="Words" />
          <Mini v="3" l="Fixed" />
          <Mini v="2" l="Exercises" />
        </section>

        <div className="space-y-3">
          {exercises.map((e, i) => (
            <article key={i} className="rounded-2xl bg-white p-4 shadow-sm space-y-2">
              <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                Exercise {i + 1}
              </div>
              <p className="text-sm text-foreground">{e.prompt}</p>
              <div className="rounded-xl bg-muted px-3 py-2 text-sm text-muted-foreground">
                You: {e.you}
              </div>
              <div className="rounded-xl bg-primary-light px-3 py-2 text-sm text-foreground">
                <span className="font-semibold text-primary">Better:</span> {e.better}
              </div>
              <div className="text-[11px] font-semibold text-primary">Focus - {e.focus}</div>
            </article>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-3 pt-1">
          <Link
            to="/lesson/start"
            className="rounded-full border border-border bg-white py-3 text-center text-sm font-semibold text-foreground"
          >
            Practice again
          </Link>
          <Link
            to="/lesson/practice"
            className="inline-flex items-center justify-center gap-1.5 rounded-full bg-primary py-3 text-sm font-semibold text-white"
          >
            Weak point <ArrowRight className="size-4" />
          </Link>
        </div>
      </main>
    </MobileFrame>
  );
}

function Mini({ v, l }: { v: string; l: string }) {
  return (
    <div className="rounded-2xl bg-white p-3 text-center shadow-sm">
      <div className="text-lg font-semibold text-foreground">{v}</div>
      <div className="mt-0.5 text-[10px] uppercase tracking-wider text-muted-foreground">{l}</div>
    </div>
  );
}
