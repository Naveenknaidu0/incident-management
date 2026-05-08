"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"
import { RefreshCw, PieChart as PieChartIcon, TrendingUp, Target } from "lucide-react"

const recurringTrends = [
  { month: "Aug", problems: 8, recurring: 3 },
  { month: "Sep", problems: 12, recurring: 5 },
  { month: "Oct", problems: 9, recurring: 4 },
  { month: "Nov", problems: 15, recurring: 6 },
  { month: "Dec", problems: 11, recurring: 3 },
  { month: "Jan", problems: 14, recurring: 5 },
]

const rootCauseDistribution = [
  { name: "Infrastructure", value: 28, color: "#ef4444" },
  { name: "Network", value: 22, color: "#f97316" },
  { name: "Application", value: 18, color: "#8b5cf6" },
  { name: "Capacity", value: 15, color: "#3b82f6" },
  { name: "Human Error", value: 10, color: "#eab308" },
  { name: "Third-Party", value: 7, color: "#64748b" },
]

const serviceStability = [
  { service: "API Gateway", mtbf: 168, incidents: 4 },
  { service: "Database", mtbf: 336, incidents: 2 },
  { service: "Payment", mtbf: 504, incidents: 3 },
  { service: "Auth", mtbf: 720, incidents: 1 },
]

const resolutionEffectiveness = [
  { month: "Aug", resolved: 85, recurring: 15 },
  { month: "Sep", resolved: 82, recurring: 18 },
  { month: "Oct", resolved: 88, recurring: 12 },
  { month: "Nov", resolved: 80, recurring: 20 },
  { month: "Dec", resolved: 90, recurring: 10 },
  { month: "Jan", resolved: 87, recurring: 13 },
]

interface ProblemAnalyticsProps {
  className?: string
}

export function ProblemAnalytics({ className }: ProblemAnalyticsProps) {
  return (
    <div className={cn("grid grid-cols-2 gap-4", className)}>
      {/* Recurring Incident Trends */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-sm font-semibold">
            <RefreshCw className="h-4 w-4 text-red-600" />
            Recurring Incident Trends
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={recurringTrends}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip
                contentStyle={{ fontSize: 12 }}
                formatter={(value, name) => [value, name === "problems" ? "Total Problems" : "Recurring"]}
              />
              <Bar dataKey="problems" fill="#0D3133" radius={[2, 2, 0, 0]} />
              <Bar dataKey="recurring" fill="#ef4444" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Root Cause Distribution */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-sm font-semibold">
            <PieChartIcon className="h-4 w-4 text-purple-600" />
            Root Cause Distribution
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={rootCauseDistribution}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={70}
                paddingAngle={2}
                dataKey="value"
              >
                {rootCauseDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ fontSize: 12 }}
                formatter={(value) => [`${value}%`, ""]}
              />
              <Legend
                wrapperStyle={{ fontSize: 10 }}
                layout="vertical"
                align="right"
                verticalAlign="middle"
              />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Service Stability Trends */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-sm font-semibold">
            <TrendingUp className="h-4 w-4 text-green-600" />
            Service Stability (MTBF hours)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={serviceStability} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis type="number" tick={{ fontSize: 11 }} />
              <YAxis type="category" dataKey="service" tick={{ fontSize: 11 }} width={80} />
              <Tooltip contentStyle={{ fontSize: 12 }} />
              <Bar dataKey="mtbf" fill="#0D3133" radius={[0, 2, 2, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Resolution Effectiveness */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-sm font-semibold">
            <Target className="h-4 w-4 text-blue-600" />
            Resolution Effectiveness
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={resolutionEffectiveness}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} domain={[0, 100]} />
              <Tooltip
                contentStyle={{ fontSize: 12 }}
                formatter={(value) => [`${value}%`, ""]}
              />
              <Line
                type="monotone"
                dataKey="resolved"
                stroke="#0D3133"
                strokeWidth={2}
                dot={{ fill: "#0D3133", r: 3 }}
                name="Resolved Permanently"
              />
              <Line
                type="monotone"
                dataKey="recurring"
                stroke="#ef4444"
                strokeWidth={2}
                dot={{ fill: "#ef4444", r: 3 }}
                name="Recurred"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
