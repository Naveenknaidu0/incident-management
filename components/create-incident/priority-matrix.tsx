"use client"

import { cn } from "@/lib/utils"
import { AlertTriangle, AlertCircle, Minus, ChevronDown } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"

interface PriorityMatrixProps {
  impact: string
  urgency: string
  onImpactChange: (value: string) => void
  onUrgencyChange: (value: string) => void
}

const impactOptions = [
  { value: "1", label: "1 - Enterprise Wide", description: "All users affected" },
  { value: "2", label: "2 - Multiple Departments", description: "Multiple teams affected" },
  { value: "3", label: "3 - Single Department", description: "One team affected" },
  { value: "4", label: "4 - Individual User", description: "Single user affected" },
]

const urgencyOptions = [
  { value: "1", label: "1 - Critical", description: "Service completely down" },
  { value: "2", label: "2 - High", description: "Severely degraded" },
  { value: "3", label: "3 - Medium", description: "Partially degraded" },
  { value: "4", label: "4 - Low", description: "Minimal impact" },
]

// Priority matrix: [impact][urgency] = priority
const priorityMatrix: Record<string, Record<string, string>> = {
  "1": { "1": "critical", "2": "critical", "3": "high", "4": "medium" },
  "2": { "1": "critical", "2": "high", "3": "medium", "4": "medium" },
  "3": { "1": "high", "2": "medium", "3": "medium", "4": "low" },
  "4": { "1": "medium", "2": "medium", "3": "low", "4": "low" },
}

const priorityConfig = {
  critical: { 
    label: "P1 - Critical", 
    icon: AlertTriangle, 
    bg: "bg-red-100", 
    text: "text-red-700",
    border: "border-red-300",
    sla: "Response: 15 min | Resolution: 4 hr"
  },
  high: { 
    label: "P2 - High", 
    icon: AlertCircle, 
    bg: "bg-orange-100", 
    text: "text-orange-700",
    border: "border-orange-300",
    sla: "Response: 30 min | Resolution: 8 hr"
  },
  medium: { 
    label: "P3 - Medium", 
    icon: Minus, 
    bg: "bg-yellow-100", 
    text: "text-yellow-700",
    border: "border-yellow-300",
    sla: "Response: 4 hr | Resolution: 24 hr"
  },
  low: { 
    label: "P4 - Low", 
    icon: ChevronDown, 
    bg: "bg-green-100", 
    text: "text-green-700",
    border: "border-green-300",
    sla: "Response: 8 hr | Resolution: 72 hr"
  },
}

export function PriorityMatrix({ impact, urgency, onImpactChange, onUrgencyChange }: PriorityMatrixProps) {
  const calculatedPriority = impact && urgency ? priorityMatrix[impact]?.[urgency] || "medium" : null
  const config = calculatedPriority ? priorityConfig[calculatedPriority as keyof typeof priorityConfig] : null

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        {/* Impact Select */}
        <div className="space-y-1.5">
          <Label className="text-xs font-medium text-muted-foreground">Impact</Label>
          <Select value={impact} onValueChange={onImpactChange}>
            <SelectTrigger className="h-9">
              <SelectValue placeholder="Select impact" />
            </SelectTrigger>
            <SelectContent>
              {impactOptions.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  <div className="flex flex-col">
                    <span className="font-medium">{opt.label}</span>
                    <span className="text-xs text-muted-foreground">{opt.description}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Urgency Select */}
        <div className="space-y-1.5">
          <Label className="text-xs font-medium text-muted-foreground">Urgency</Label>
          <Select value={urgency} onValueChange={onUrgencyChange}>
            <SelectTrigger className="h-9">
              <SelectValue placeholder="Select urgency" />
            </SelectTrigger>
            <SelectContent>
              {urgencyOptions.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  <div className="flex flex-col">
                    <span className="font-medium">{opt.label}</span>
                    <span className="text-xs text-muted-foreground">{opt.description}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Calculated Priority Display */}
      {config && (
        <div className={cn(
          "flex items-center justify-between rounded-lg border p-3",
          config.bg,
          config.border
        )}>
          <div className="flex items-center gap-2">
            <config.icon className={cn("h-5 w-5", config.text)} />
            <div>
              <p className={cn("text-sm font-semibold", config.text)}>{config.label}</p>
              <p className="text-xs text-muted-foreground">{config.sla}</p>
            </div>
          </div>
          <span className={cn(
            "rounded-full px-2.5 py-1 text-xs font-semibold",
            config.bg,
            config.text
          )}>
            Calculated
          </span>
        </div>
      )}

      {/* Visual Matrix Preview */}
      <div className="rounded-lg border border-border bg-muted/30 p-3">
        <p className="mb-2 text-xs font-medium text-muted-foreground">Priority Matrix</p>
        <div className="grid grid-cols-5 gap-0.5 text-[10px]">
          <div className="p-1"></div>
          <div className="rounded bg-muted p-1 text-center font-medium">U1</div>
          <div className="rounded bg-muted p-1 text-center font-medium">U2</div>
          <div className="rounded bg-muted p-1 text-center font-medium">U3</div>
          <div className="rounded bg-muted p-1 text-center font-medium">U4</div>
          
          <div className="rounded bg-muted p-1 font-medium">I1</div>
          <MatrixCell priority="critical" active={impact === "1" && urgency === "1"} />
          <MatrixCell priority="critical" active={impact === "1" && urgency === "2"} />
          <MatrixCell priority="high" active={impact === "1" && urgency === "3"} />
          <MatrixCell priority="medium" active={impact === "1" && urgency === "4"} />
          
          <div className="rounded bg-muted p-1 font-medium">I2</div>
          <MatrixCell priority="critical" active={impact === "2" && urgency === "1"} />
          <MatrixCell priority="high" active={impact === "2" && urgency === "2"} />
          <MatrixCell priority="medium" active={impact === "2" && urgency === "3"} />
          <MatrixCell priority="medium" active={impact === "2" && urgency === "4"} />
          
          <div className="rounded bg-muted p-1 font-medium">I3</div>
          <MatrixCell priority="high" active={impact === "3" && urgency === "1"} />
          <MatrixCell priority="medium" active={impact === "3" && urgency === "2"} />
          <MatrixCell priority="medium" active={impact === "3" && urgency === "3"} />
          <MatrixCell priority="low" active={impact === "3" && urgency === "4"} />
          
          <div className="rounded bg-muted p-1 font-medium">I4</div>
          <MatrixCell priority="medium" active={impact === "4" && urgency === "1"} />
          <MatrixCell priority="medium" active={impact === "4" && urgency === "2"} />
          <MatrixCell priority="low" active={impact === "4" && urgency === "3"} />
          <MatrixCell priority="low" active={impact === "4" && urgency === "4"} />
        </div>
      </div>
    </div>
  )
}

function MatrixCell({ priority, active }: { priority: string; active: boolean }) {
  const colors = {
    critical: "bg-red-200 text-red-800",
    high: "bg-orange-200 text-orange-800",
    medium: "bg-yellow-200 text-yellow-800",
    low: "bg-green-200 text-green-800",
  }
  
  return (
    <div className={cn(
      "rounded p-1 text-center font-medium transition-all",
      colors[priority as keyof typeof colors],
      active && "ring-2 ring-[#0D3133] ring-offset-1"
    )}>
      {priority.charAt(0).toUpperCase()}
    </div>
  )
}

export function getCalculatedPriority(impact: string, urgency: string): string | null {
  if (!impact || !urgency) return null
  return priorityMatrix[impact]?.[urgency] || "medium"
}
