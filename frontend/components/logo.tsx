import { Plane } from "lucide-react"
import { cn } from "@/lib/utils"

export function Logo({
  className,
  showText = true,
}: {
  className?: string
  showText?: boolean
}) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
        <Plane className="h-5 w-5 -rotate-45" />
      </span>
      {showText && (
        <span className="text-lg font-semibold tracking-tight text-foreground">
          PlanUp
        </span>
      )}
    </div>
  )
}
