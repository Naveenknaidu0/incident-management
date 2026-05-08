"use client"

import { Button } from "@/components/ui/button"
import {
  ArrowUpRight,
  UserPlus,
  Pause,
  Play,
  RotateCcw,
  Bell,
  AlertTriangle,
} from "lucide-react"

interface SLAQuickActionsProps {
  onEscalate?: () => void
  onReassign?: () => void
  onPause?: () => void
  onResume?: () => void
  onOverride?: () => void
  onNotify?: () => void
  onLaunchMajorIncident?: () => void
  isPaused?: boolean
  className?: string
}

export function SLAQuickActions({
  onEscalate,
  onReassign,
  onPause,
  onResume,
  onOverride,
  onNotify,
  onLaunchMajorIncident,
  isPaused = false,
  className,
}: SLAQuickActionsProps) {
  return (
    <div className={className}>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
        <Button
          variant="outline"
          size="sm"
          className="h-9 text-xs justify-start"
          onClick={onEscalate}
        >
          <ArrowUpRight className="mr-1.5 h-3.5 w-3.5 text-orange-500" />
          Escalate
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="h-9 text-xs justify-start"
          onClick={onReassign}
        >
          <UserPlus className="mr-1.5 h-3.5 w-3.5 text-blue-500" />
          Reassign
        </Button>
        {isPaused ? (
          <Button
            variant="outline"
            size="sm"
            className="h-9 text-xs justify-start"
            onClick={onResume}
          >
            <Play className="mr-1.5 h-3.5 w-3.5 text-emerald-500" />
            Resume SLA
          </Button>
        ) : (
          <Button
            variant="outline"
            size="sm"
            className="h-9 text-xs justify-start"
            onClick={onPause}
          >
            <Pause className="mr-1.5 h-3.5 w-3.5 text-amber-500" />
            Pause SLA
          </Button>
        )}
        <Button
          variant="outline"
          size="sm"
          className="h-9 text-xs justify-start"
          onClick={onOverride}
        >
          <RotateCcw className="mr-1.5 h-3.5 w-3.5 text-purple-500" />
          Override
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="h-9 text-xs justify-start"
          onClick={onNotify}
        >
          <Bell className="mr-1.5 h-3.5 w-3.5 text-[#0D3133]" />
          Notify
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="h-9 text-xs justify-start text-red-600 border-red-200 hover:bg-red-50"
          onClick={onLaunchMajorIncident}
        >
          <AlertTriangle className="mr-1.5 h-3.5 w-3.5" />
          Major Inc
        </Button>
      </div>
    </div>
  )
}
