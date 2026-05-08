"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, AlertTriangle, Pause, Play, Shield } from "lucide-react"

interface SLAStatus {
  type: "response" | "resolution"
  target: string
  elapsed: string
  remaining: string
  status: "on-track" | "at-risk" | "breached"
  isPaused: boolean
}

const slaStatuses: SLAStatus[] = [
  {
    type: "response",
    target: "1 hour",
    elapsed: "45 minutes",
    remaining: "15 minutes",
    status: "on-track",
    isPaused: false
  },
  {
    type: "resolution",
    target: "4 hours",
    elapsed: "2 hours 30 minutes",
    remaining: "1 hour 30 minutes",
    status: "at-risk",
    isPaused: false
  },
]

const statusConfig = {
  "on-track": { color: "bg-green-100 text-green-700 border-green-200", icon: "✓" },
  "at-risk": { color: "bg-orange-100 text-orange-700 border-orange-200", icon: "⚠" },
  "breached": { color: "bg-red-100 text-red-700 border-red-200", icon: "✕" },
}

export function SLAOverridePanel() {
  return (
    <Card>
      <CardHeader className="py-3 px-4 border-b flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <CardTitle className="text-sm">SLA Status</CardTitle>
        </div>
        <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">
          <Shield className="h-3 w-3 mr-1" />
          Override
        </Button>
      </CardHeader>
      <CardContent className="p-0">
        <div className="space-y-1">
          {slaStatuses.map((sla) => (
            <div key={sla.type} className="px-4 py-3 border-b border-border/50 last:border-0 hover:bg-muted/30 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-foreground capitalize">
                    {sla.type} SLA
                  </span>
                  <Badge className={`text-xs px-1.5 py-0.5 h-5 border ${statusConfig[sla.status].color}`}>
                    {sla.status === "on-track" && "✓"}
                    {sla.status === "at-risk" && "⚠"}
                    {sla.status === "breached" && "✕"}
                    {" "}{sla.status.replace("-", " ")}
                  </Badge>
                  {sla.isPaused && (
                    <Badge variant="outline" className="text-[10px] px-1 py-0 h-5">
                      <Pause className="h-2.5 w-2.5 mr-0.5" />
                      Paused
                    </Badge>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 text-[10px]">
                <div>
                  <p className="text-muted-foreground">Target</p>
                  <p className="font-mono font-medium text-foreground">{sla.target}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Elapsed</p>
                  <p className="font-mono font-medium text-foreground">{sla.elapsed}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Remaining</p>
                  <p className={`font-mono font-medium ${sla.status === "on-track" ? "text-green-700" : "text-orange-700"}`}>
                    {sla.remaining}
                  </p>
                </div>
              </div>
              <div className="mt-2 w-full h-1.5 bg-muted rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${
                    sla.status === "on-track"
                      ? "bg-green-600"
                      : sla.status === "at-risk"
                      ? "bg-orange-600"
                      : "bg-red-600"
                  }`}
                  style={{
                    width: sla.type === "response" ? "75%" : "63%"
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
