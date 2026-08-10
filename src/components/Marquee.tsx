import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Infinite horizontal marquee. Direction left or right.
 * Children are duplicated to create a seamless 50%-shifted track. */
export function Marquee({
  children,
  direction = "left",
  duration = 25,
  paused = false,
  className,
}: {
  children: ReactNode;
  direction?: "left" | "right";
  duration?: number;
  paused?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("overflow-hidden w-full", className)}>
      <div
        className={cn("marquee", direction === "left" ? "marquee-left" : "marquee-right")}
        style={{ animationDuration: `${duration}s`, animationPlayState: paused ? "paused" : "running" }}
      >
        <div className="flex shrink-0">{children}</div>
        <div className="flex shrink-0" aria-hidden>{children}</div>
      </div>
    </div>
  );
}
