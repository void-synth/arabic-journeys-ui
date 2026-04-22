/** Visual incision between major landing bands — no content, pure rhythm. */
export function LandingSectionDivider() {
  return (
    <div className="relative mx-auto max-w-5xl px-6" aria-hidden>
      <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-400/35 to-transparent" />
      <div className="mx-auto mt-px h-px w-2/3 max-w-md bg-gradient-to-r from-transparent via-[hsl(160_32%_38%/0.2)] to-transparent" />
    </div>
  );
}
