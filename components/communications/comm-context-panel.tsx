"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Users,
  CheckCircle,
  AlertCircle,
  Megaphone,
  ArrowUpRight,
  ChevronRight,
} from "lucide-react"
import Link from "next/link"

export function CommContextPanel() {
  return (
    <div className="space-y-4">
      {/* Communication Health */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-600" />
            Communication Health
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Delivery Rate</span>
              <span className="font-medium text-green-600">98.2%</span>
            </div>
            <Progress value={98.2} className="h-1.5" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Read Rate</span>
              <span className="font-medium text-blue-600">87.5%</span>
            </div>
            <Progress value={87.5} className="h-1.5" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Acknowledgement Rate</span>
              <span className="font-medium text-amber-600">72.3%</span>
            </div>
            <Progress value={72.3} className="h-1.5" />
          </div>
        </CardContent>
      </Card>

      {/* Impacted Stakeholders */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Users className="h-4 w-4 text-[#0D3133]" />
              Impacted Stakeholders
            </CardTitle>
            <Badge variant="secondary">24</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          {[
            { name: "John Smith", role: "VP Engineering", status: "notified" },
            { name: "Sarah Chen", role: "Service Owner", status: "acknowledged" },
            { name: "Mike Wilson", role: "Operations Lead", status: "pending" },
          ].map((stakeholder, i) => (
            <div key={i} className="flex items-center justify-between py-1">
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarFallback className="text-[10px] bg-muted">
                    {stakeholder.name.split(" ").map((n) => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-xs font-medium">{stakeholder.name}</p>
                  <p className="text-[10px] text-muted-foreground">{stakeholder.role}</p>
                </div>
              </div>
              <Badge
                variant="secondary"
                className={
                  stakeholder.status === "acknowledged"
                    ? "bg-green-50 text-green-700"
                    : stakeholder.status === "notified"
                    ? "bg-blue-50 text-blue-700"
                    : "bg-slate-100 text-slate-600"
                }
              >
                {stakeholder.status}
              </Badge>
            </div>
          ))}
          <Button variant="ghost" size="sm" className="w-full mt-2 h-7 text-xs" asChild>
            <Link href="/communications/stakeholders">
              View All Stakeholders
              <ChevronRight className="h-3 w-3 ml-1" />
            </Link>
          </Button>
        </CardContent>
      </Card>

      {/* Failed Deliveries */}
      <Card className="border-red-200 bg-red-50/50">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-red-600" />
              Failed Deliveries
            </CardTitle>
            <Badge variant="destructive">3</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          {[
            { recipient: "john.doe@example.com", reason: "Mailbox full" },
            { recipient: "#ops-alerts", reason: "Slack rate limit" },
            { recipient: "+1-555-0123", reason: "Invalid number" },
          ].map((failure, i) => (
            <div key={i} className="flex items-center justify-between py-1">
              <div>
                <p className="text-xs font-medium text-red-800">{failure.recipient}</p>
                <p className="text-[10px] text-red-600">{failure.reason}</p>
              </div>
              <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                Retry
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Recent Broadcasts */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Megaphone className="h-4 w-4 text-purple-600" />
            Recent Broadcasts
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {[
            { subject: "Major Incident Update", time: "5 min ago", reach: 156 },
            { subject: "Service Restoration", time: "1 hour ago", reach: 234 },
            { subject: "Maintenance Complete", time: "3 hours ago", reach: 89 },
          ].map((broadcast, i) => (
            <div key={i} className="flex items-center justify-between py-1">
              <div>
                <p className="text-xs font-medium">{broadcast.subject}</p>
                <p className="text-[10px] text-muted-foreground">{broadcast.time}</p>
              </div>
              <Badge variant="secondary">{broadcast.reach} reached</Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Escalation Chain */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <ArrowUpRight className="h-4 w-4 text-amber-600" />
            Escalation Chain
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {[
              { level: "L1", name: "Operations", status: "notified", time: "15 min" },
              { level: "L2", name: "Engineering Lead", status: "pending", time: "30 min" },
              { level: "L3", name: "VP Engineering", status: "waiting", time: "1 hour" },
              { level: "L4", name: "CTO", status: "waiting", time: "2 hours" },
            ].map((level, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className={`h-6 w-6 rounded-full flex items-center justify-center text-[10px] font-medium ${
                  level.status === "notified" ? "bg-green-100 text-green-700" :
                  level.status === "pending" ? "bg-amber-100 text-amber-700" :
                  "bg-slate-100 text-slate-500"
                }`}>
                  {level.level}
                </div>
                <div className="flex-1">
                  <p className="text-xs font-medium">{level.name}</p>
                </div>
                <span className="text-[10px] text-muted-foreground">{level.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
