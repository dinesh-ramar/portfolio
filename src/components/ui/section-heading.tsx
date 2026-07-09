/**
 * SectionHeading — a reusable heading component with optional decorative accent lines.
 * Two variants:
 *   - "left"  : heading aligned left with a gradient underline extending to the right
 *   - "center": heading centered with short gradient lines on both sides
 *
 * Eliminates 6+ duplicate heading patterns across section files.
 */

import { type ReactNode } from "react"
import { cn } from "@/lib/utils"

interface SectionHeadingProps {
  children: ReactNode
  /** @default "center" */
  align?: "left" | "center"
  className?: string
  /** @default "mb-12" */
  marginBottom?: string
}

function LeftAlignedHeading({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      <h2 className="font-heading text-heading-2 font-semibold">{children}</h2>
      <div className="h-px flex-1 bg-gradient-to-r from-primary/40 to-transparent" aria-hidden="true" />
    </div>
  )
}

function CenteredHeading({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center justify-center gap-3">
      <div className="h-px w-16 bg-gradient-to-r from-transparent to-primary/40" aria-hidden="true" />
      <h2 className="font-heading text-heading-2 font-semibold text-center">{children}</h2>
      <div className="h-px w-16 bg-gradient-to-l from-transparent to-primary/40" aria-hidden="true" />
    </div>
  )
}

export function SectionHeading({
  children,
  align = "center",
  className,
  marginBottom = "mb-12",
}: SectionHeadingProps) {
  return (
    <div className={cn(marginBottom, className)}>
      {align === "left" ? (
        <LeftAlignedHeading>{children}</LeftAlignedHeading>
      ) : (
        <CenteredHeading>{children}</CenteredHeading>
      )}
    </div>
  )
}