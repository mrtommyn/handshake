import { cn } from "@/lib/utils";

type Tone = "color" | "mono";

/**
 * Handshake mark — two shapes (the two parties) linking to form a connection.
 * - `color`: orange + teal overlap into a green link = trust/agreement.
 * - `mono`: single-colour (currentColor) with the link knocked out as negative space,
 *   so it works on any background (incl. the app-icon tile).
 */
export function HandshakeMark({
  tone = "color",
  className,
}: {
  tone?: Tone;
  className?: string;
}) {
  return (
    <svg
      viewBox="-30 -20 60 40"
      className={cn("h-8 w-auto", className)}
      role="img"
      aria-label="Handshake"
    >
      {tone === "color" ? (
        <>
          <circle cx="-13" cy="0" r="15" fill="#ea580c" />
          <circle cx="13" cy="0" r="15" fill="#2bb7c4" />
          <path d="M0 -7.48 A15 15 0 0 1 0 7.48 A15 15 0 0 1 0 -7.48 Z" fill="#15924f" />
        </>
      ) : (
        <path
          fill="currentColor"
          fillRule="evenodd"
          d="M-28 0 a15 15 0 1 0 30 0 a15 15 0 1 0 -30 0 M-2 0 a15 15 0 1 0 30 0 a15 15 0 1 0 -30 0"
        />
      )}
    </svg>
  );
}

/**
 * Full logo. `variant="lockup"` shows the mark + wordmark; `variant="mark"` is icon-only.
 */
export function Logo({
  variant = "lockup",
  tone = "color",
  className,
  markClassName,
}: {
  variant?: "lockup" | "mark";
  tone?: Tone;
  className?: string;
  markClassName?: string;
}) {
  if (variant === "mark") {
    return <HandshakeMark tone={tone} className={cn("h-8 w-auto", markClassName, className)} />;
  }
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <HandshakeMark tone={tone} className={cn("h-8 w-auto", markClassName)} />
      <span className="text-xl font-extrabold tracking-tight text-foreground">Handshake</span>
    </span>
  );
}
