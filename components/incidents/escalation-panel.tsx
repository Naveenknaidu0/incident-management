"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, Clock, AlertTriangle } from "lucide-react"

interface EscalationEvent {
  id: string
  level: string
  from: string
  to: string
  reason: string
  timestamp: string
}

const escalations: EscalationEvent[] = [
  {
    id: "1",
    level: "L3",
    from: "Service Desk",
    to: "Engineering Team",
    reason: "SLA threshold reached - P1 incident",
    timestamp: "45 min ago"
  },
  {
    id: "2",
    level: "L2",
    from: "Support Team",
    to: "On-Call Engineer",
    reason: "Awaiting technical investigation",
    timestamp: "1h 12m ago"
  },
  {
    id: "3",
    level: "L1",
    from: "Monitoring System",
    to: "Support Queue",
    reason: "Automatic escalation triggered",
    timestamp: "1h 23m ago"
  },
]

export function EscalationPanel() {
  return (
    <Card>
      <CardHeader className="py-3 px-4 border-b flex items-center justify-between">
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 text-orange-600" />
          <CardTitle className="text-sm">Escalation History</CardTitle>
        </div>
        <Badge variant="secondary" className="text-xs">{escalations.length} events</Badge>
      </CardHeader>
      <CardContent className="p-0">
        <div className="space-y-1">
          {escalations.map((event, index) => (
            <div key={event.id} className="flex gap-3 px-4 py-2 hover:bg-muted/50 transition-colors text-xs">
              <div className="flex flex-col items-center pt-0.5">
                <div className="h-2 w-2 rounded-full bg-orange-600" />
                {index < escalations.length - 1 && <div className="h-6 w-0.5 bg-border my-0.5" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono text-[10px] text-muted-foreground">{event.level}</span>
                  <ArrowUpRight className="h-3 w-3 text-orange-600" />
                  <span className="text-[10px] text-muted-foreground">{event.from}</span>
                  <span className="text-muted-foreground">→</span>
                  <span className="text-[10px] text-muted-foreground">{event.to}</span>
                </div>
                <p className="text-[11px] text-foreground truncate">{event.reason}</p>
                <p className="text-[10px] text-muted-foreground mt-1 flex items-center gap-1">
                  <Clock className="h-2.5 w-2.5" />
                  {event.timestamp}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
