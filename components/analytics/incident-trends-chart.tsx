"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Download } from "lucide-react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Area,
  AreaChart,
} from "recharts"

const data = [
  { date: "Jan 1", created: 45, resolved: 42, backlog: 87 },
  { date: "Jan 2", created: 52, resolved: 48, backlog: 91 },
  { date: "Jan 3", created: 38, resolved: 55, backlog: 74 },
  { date: "Jan 4", created: 61, resolved: 45, backlog: 90 },
  { date: "Jan 5", created: 49, resolved: 52, backlog: 87 },
  { date: "Jan 6", created: 35, resolved: 40, backlog: 82 },
  { date: "Jan 7", created: 28, resolved: 35, backlog: 75 },
  { date: "Jan 8", created: 55, resolved: 48, backlog: 82 },
  { date: "Jan 9", created: 48, resolved: 51, backlog: 79 },
  { date: "Jan 10", created: 62, resolved: 58, backlog: 83 },
  { date: "Jan 11", created: 44, resolved: 52, backlog: 75 },
  { date: "Jan 12", created: 39, resolved: 45, backlog: 69 },
  { date: "Jan 13", created: 31, resolved: 38, backlog: 62 },
  { date: "Jan 14", created: 25, resolved: 30, backlog: 57 },
]

interface IncidentTrendsChartProps {
  title?: string
  variant?: "line" | "area"
}

export function IncidentTrendsChart({ title = "Incident Trends", variant = "area" }: IncidentTrendsChartProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
          <CardTitle className="text-sm font-semibold">{title}</CardTitle>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-[10px]">
            Last 14 days
          </Badge>
          <Button variant="ghost" size="icon" className="h-7 w-7">
            <Download className="h-3.5 w-3.5" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            {variant === "area" ? (
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorCreated" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0D3133" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#0D3133" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorResolved" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#059669" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#059669" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E0DC" vertical={false} />
                <XAxis 
                  dataKey="date" 
                  tick={{ fontSize: 10, fill: "#73847B" }}
                  axisLine={{ stroke: "#E2E0DC" }}
                  tickLine={false}
                />
                <YAxis 
                  tick={{ fontSize: 10, fill: "#73847B" }}
                  axisLine={{ stroke: "#E2E0DC" }}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #E2E0DC",
                    borderRadius: "6px",
                    fontSize: "12px",
                  }}
                />
                <Legend 
                  wrapperStyle={{ fontSize: "11px" }}
                  iconType="circle"
                  iconSize={8}
                />
                <Area
                  type="monotone"
                  dataKey="created"
                  stroke="#0D3133"
                  strokeWidth={2}
                  fill="url(#colorCreated)"
                  name="Created"
                />
                <Area
                  type="monotone"
                  dataKey="resolved"
                  stroke="#059669"
                  strokeWidth={2}
                  fill="url(#colorResolved)"
                  name="Resolved"
                />
              </AreaChart>
            ) : (
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E0DC" vertical={false} />
                <XAxis 
                  dataKey="date" 
                  tick={{ fontSize: 10, fill: "#73847B" }}
                  axisLine={{ stroke: "#E2E0DC" }}
                  tickLine={false}
                />
                <YAxis 
                  tick={{ fontSize: 10, fill: "#73847B" }}
                  axisLine={{ stroke: "#E2E0DC" }}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #E2E0DC",
                    borderRadius: "6px",
                    fontSize: "12px",
                  }}
                />
                <Legend 
                  wrapperStyle={{ fontSize: "11px" }}
                  iconType="circle"
                  iconSize={8}
                />
                <Line
                  type="monotone"
                  dataKey="created"
                  stroke="#0D3133"
                  strokeWidth={2}
                  dot={{ r: 3, fill: "#0D3133" }}
                  name="Created"
                />
                <Line
                  type="monotone"
                  dataKey="resolved"
                  stroke="#059669"
                  strokeWidth={2}
                  dot={{ r: 3, fill: "#059669" }}
                  name="Resolved"
                />
                <Line
                  type="monotone"
                  dataKey="backlog"
                  stroke="#E69F50"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={{ r: 3, fill: "#E69F50" }}
                  name="Backlog"
                />
              </LineChart>
            )}
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
