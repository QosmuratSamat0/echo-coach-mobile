import type { ReactNode } from "react";

export function MobileFrame({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-100 md:py-6">
      <div className="relative w-full md:w-[390px] md:h-[844px] md:rounded-[2.5rem] md:border md:border-slate-300 bg-white overflow-hidden flex flex-col min-h-screen md:min-h-0">
        {children}
      </div>
    </div>
  );
}
