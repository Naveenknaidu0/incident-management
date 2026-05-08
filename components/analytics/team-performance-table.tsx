"use client"

import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users, Download, ArrowUpDown, TrendingUp, TrendingDown } from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface TeamMetrics {
  team: string
  resolved: number
  avgResponseTime: string
  slaCompliance: number
  escalations: number
  backlog: number
  trend: "up" | "down" | "stable"
}

const teamData: TeamMetrics[] = [
  { team: "Platform Engineering", resolved: 156, avgResponseTime: "8m", slaCompliance: 96.5, escalations: 4, backlog: 12, trend: "up" },
  { team: "Network Operations", resolved: 89, avgResponseTime: "12m", slaCompliance: 92.3, escalations: 8, backlog: 18, trend: "down" },
  { team: "Database Team", resolved: 67, avgResponseTime: "6m", slaCompliance: 98.1, escalations: 2, backlog: 5, trend: "up" },
  { team: "Security Operations", resolved: 45, avgResponseTime: "15m", slaCompliance: 94.8, escalations: 6, backlog: 8, trend: "stable" },
  { team: "Application Support", resolved: 234, avgResponseTime: "18m", slaCompliance: 88.2, escalations: 12, backlog: 34, trend: "down" },
  { team: "Infrastructure", resolved: 78, avgResponseTime: "10m", slaCompliance: 95.6, escalations: 5, backlog: 9, trend: "up" },
]

export function TeamPerformanceTable() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-muted-foreground" />
          <CardTitle className="text-sm font-semibold">Team Performance</CardTitle>
        </div>
        <Button variant="outline" size="sm" className="h-7 gap-1.5 text-xs">
          <Download className="h-3 w-3" />
          Export
        </Button>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="text-[11px] font-medium">Team</TableHead>
                <TableHead className="text-[11px] font-medium text-right">Resolved</TableHead>
                <TableHead className="text-[11px] font-medium text-right">Avg Response</TableHead>
                <TableHead className="text-[11px] font-medium text-right">SLA %</TableHead>
                <TableHead className="text-[11px] font-medium text-right">Escalations</TableHead>
                <TableHead className="text-[11px] font-medium text-right">Backlog</TableHead>
                <TableHead className="text-[11px] font-medium text-center">Trend</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {teamData.map((team) => (
                <TableRow key={team.team} className="hover:bg-muted/50">
                  <TableCell className="text-xs font-medium">{team.team}</TableCell>
                  <TableCell className="text-xs text-right">{team.resolved}</TableCell>
                  <TableCell className="text-xs text-right">{team.avgResponseTime}</TableCell>
                  <TableCell className="text-right">
                    <Badge
                      variant="secondary"
                      className={cn(
                        "text-[10px]",
                        team.slaCompliance >= 95 && "bg-green-100 text-green-700",
                        team.slaCompliance < 95 && team.slaCompliance >= 90 && "bg-amber-100 text-amber-700",
                        team.slaCompliance < 90 && "bg-red-100 text-red-700"
                      )}
                    >
                      {team.slaCompliance}%
                    </Badge>
                  </TableCell>
                  <TableCell className="text-xs text-right">{team.escalations}</TableCell>
                  <TableCell className="text-xs text-right">{team.backlog}</TableCell>
                  <TableCell className="text-center">
                    {team.trend === "up" && <TrendingUp className="mx-auto h-3.5 w-3.5 text-green-600" />}
                    {team.trend === "down" && <TrendingDown className="mx-auto h-3.5 w-3.5 text-red-600" />}
                    {team.trend === "stable" && <span className="text-muted-foreground">-</span>}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
