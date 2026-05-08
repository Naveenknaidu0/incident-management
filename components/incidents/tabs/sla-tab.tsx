"use client"

import { Clock, AlertTriangle, CheckCircle2, XCircle, TrendingUp } from "lucide-react"

interface SLAMetric {
  id: string
  name: string
  target: string
  elapsed: string
  remaining: string
  status: "safe" | "warning" | "breach" | "breached" | "met"
  percentage: number
}

const slaMetrics: SLAMetric[] = [
  {
    id: "response",
    name: "Response SLA",
    target: "15 minutes",
    elapsed: "8 minutes",
    remaining: "N/A",
    status: "met",
    percentage: 100,
  },
  {
    id: "acknowledge",
    name: "Acknowledge SLA",
    target: "30 minutes",
    elapsed: "12 minutes",
    remaining: "N/A",
    status: "met",
    percentage: 100,
  },
  {
    id: "resolution",
    name: "Resolution SLA",
    target: "4 hours",
    elapsed: "1h 45m",
    remaining: "2h 15m",
    status: "warning",
    percentage: 44,
  },
  {
    id: "communication",
    name: "Stakeholder Update SLA",
    target: "30 minutes",
    elapsed: "25 minutes",
    remaining: "5 minutes",
    status: "warning",
    percentage: 83,
  },
]

const slaHistory = [
  { event: "Response SLA Met", time: "14:40 UTC", delta: "8 min (target: 15 min)", status: "met" },
  { event: "Acknowledge SLA Met", time: "14:44 UTC", delta: "12 min (target: 30 min)", status: "met" },
  { event: "First stakeholder update sent", time: "14:55 UTC", delta: "23 min (target: 30 min)", status: "met" },
  { event: "Resolution SLA Warning (50%)", time: "16:32 UTC", delta: "2h elapsed", status: "warning" },
]

const statusConfig = {
  safe: { color: "text-green-600", bg: "bg-green-100", barColor: "bg-green-500" },
  warning: { color: "text-amber-600", bg: "bg-amber-100", barColor: "bg-amber-500" },
  breach: { color: "text-red-600", bg: "bg-red-100", barColor: "bg-red-500" },
  breached: { color: "text-red-700", bg: "bg-red-200", barColor: "bg-red-600" },
  met: { color: "text-green-600", bg: "bg-green-100", barColor: "bg-green-500" },
}

export function SLATab() {
  return (
    <div className="space-y-6">
      {/* SLA Overview Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {slaMetrics.map((sla) => {
          const config = statusConfig[sla.status]
          const isMet = sla.status === "met"

          return (
            <div key={sla.id} className="rounded-lg border border-border bg-card p-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-muted-foreground">{sla.name}</span>
                {isMet ? (
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                ) : sla.status === "breached" ? (
                  <XCircle className="h-4 w-4 text-red-600" />
                ) : sla.status === "warning" || sla.status === "breach" ? (
                  <AlertTriangle className={`h-4 w-4 ${config.color}`} />
                ) : (
                  <Clock className="h-4 w-4 text-muted-foreground" />
                )}
              </div>
              
              <div className="mt-2">
                <div className="flex items-baseline gap-2">
                  <span className={`text-xl font-bold ${config.color}`}>
                    {isMet ? "Met" : sla.remaining}
                  </span>
                  {!isMet && (
                    <span className="text-xs text-muted-foreground">remaining</span>
                  )}
                </div>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  Target: {sla.target}
                </p>
              </div>

              {/* Progress Bar */}
              <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className={`h-full transition-all ${config.barColor}`}
                  style={{ width: `${sla.percentage}%` }}
                />
              </div>
              <div className="mt-1 flex justify-between text-[10px] text-muted-foreground">
                <span>Elapsed: {sla.elapsed}</span>
                <span>{sla.percentage}%</span>
              </div>
            </div>
          )
        })}
      </div>

      {/* SLA Details Table */}
      <div className="rounded-lg border border-border bg-card">
        <div className="flex items-center gap-2 border-b border-border px-4 py-3">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <h3 className="text-sm font-semibold text-card-foreground">SLA Breakdown</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground">SLA Type</th>
                <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground">Target</th>
                <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground">Elapsed</th>
                <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground">Remaining</th>
                <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground">Progress</th>
                <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {slaMetrics.map((sla) => {
                const config = statusConfig[sla.status]

                return (
                  <tr key={sla.id} className="hover:bg-muted/20">
                    <td className="px-4 py-2.5 text-sm font-medium text-card-foreground">{sla.name}</td>
                    <td className="px-4 py-2.5 text-sm text-muted-foreground">{sla.target}</td>
                    <td className="px-4 py-2.5 text-sm text-muted-foreground">{sla.elapsed}</td>
                    <td className="px-4 py-2.5">
                      <span className={`font-mono text-sm ${config.color}`}>
                        {sla.remaining}
                      </span>
                    </td>
                    <td className="px-4 py-2.5">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-24 overflow-hidden rounded-full bg-muted">
                          <div
                            className={`h-full ${config.barColor}`}
                            style={{ width: `${sla.percentage}%` }}
                          />
                        </div>
                        <span className="text-xs text-muted-foreground">{sla.percentage}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-2.5">
                      <span className={`inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-xs font-medium ${config.bg} ${config.color}`}>
                        {sla.status === "met" && <CheckCircle2 className="h-3 w-3" />}
                        {sla.status === "warning" && <AlertTriangle className="h-3 w-3" />}
                        {sla.status === "breach" && <AlertTriangle className="h-3 w-3" />}
                        {sla.status === "breached" && <XCircle className="h-3 w-3" />}
                        {sla.status.charAt(0).toUpperCase() + sla.status.slice(1)}
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* SLA Event History */}
      <div className="rounded-lg border border-border bg-card">
        <div className="flex items-center gap-2 border-b border-border px-4 py-3">
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
          <h3 className="text-sm font-semibold text-card-foreground">SLA Event History</h3>
        </div>
        <div className="divide-y divide-border">
          {slaHistory.map((event, idx) => {
            const isMet = event.status === "met"

            return (
              <div key={idx} className="flex items-center justify-between px-4 py-3 hover:bg-muted/20">
                <div className="flex items-center gap-3">
                  {isMet ? (
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                  ) : (
                    <AlertTriangle className="h-4 w-4 text-amber-600" />
                  )}
                  <div>
                    <p className="text-sm text-card-foreground">{event.event}</p>
                    <p className="text-xs text-muted-foreground">{event.delta}</p>
                  </div>
                </div>
                <span className="text-xs text-muted-foreground">{event.time}</span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
