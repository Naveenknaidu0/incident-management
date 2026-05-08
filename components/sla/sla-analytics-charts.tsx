"use client"

import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"

// Breach Trends Chart
interface BreachTrendData {
  date: string
  breaches: number
  warnings: number
}

interface BreachTrendsChartProps {
  data: BreachTrendData[]
  className?: string
}

export function BreachTrendsChart({ data, className }: BreachTrendsChartProps) {
  return (
    <Card className={className}>
      <CardHeader className="py-3 px-4">
        <CardTitle className="text-sm font-medium">Breach Trends</CardTitle>
      </CardHeader>
      <CardContent className="px-4 pb-4 pt-0">
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E0DC" />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 10, fill: "#73847B" }}
                tickLine={false}
                axisLine={{ stroke: "#E2E0DC" }}
              />
              <YAxis
                tick={{ fontSize: 10, fill: "#73847B" }}
                tickLine={false}
                axisLine={{ stroke: "#E2E0DC" }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #E2E0DC",
                  borderRadius: "6px",
                  fontSize: "12px",
                }}
              />
              <Line
                type="monotone"
                dataKey="breaches"
                stroke="#DC2626"
                strokeWidth={2}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="warnings"
                stroke="#D97706"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

// SLA Compliance Chart
interface ComplianceData {
  month: string
  compliance: number
}

interface SLAComplianceChartProps {
  data: ComplianceData[]
  className?: string
}

export function SLAComplianceChart({ data, className }: SLAComplianceChartProps) {
  return (
    <Card className={className}>
      <CardHeader className="py-3 px-4">
        <CardTitle className="text-sm font-medium">SLA Compliance</CardTitle>
      </CardHeader>
      <CardContent className="px-4 pb-4 pt-0">
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E0DC" />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 10, fill: "#73847B" }}
                tickLine={false}
                axisLine={{ stroke: "#E2E0DC" }}
              />
              <YAxis
                tick={{ fontSize: 10, fill: "#73847B" }}
                tickLine={false}
                axisLine={{ stroke: "#E2E0DC" }}
                domain={[0, 100]}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #E2E0DC",
                  borderRadius: "6px",
                  fontSize: "12px",
                }}
                formatter={(value) => [`${value}%`, "Compliance"]}
              />
              <Bar dataKey="compliance" fill="#0D3133" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

// Escalation Frequency Chart
interface EscalationData {
  level: string
  count: number
}

interface EscalationFrequencyChartProps {
  data: EscalationData[]
  className?: string
}

export function EscalationFrequencyChart({ data, className }: EscalationFrequencyChartProps) {
  const COLORS = ["#0D3133", "#E69F50", "#73847B", "#DC2626"]

  return (
    <Card className={className}>
      <CardHeader className="py-3 px-4">
        <CardTitle className="text-sm font-medium">Escalation Distribution</CardTitle>
      </CardHeader>
      <CardContent className="px-4 pb-4 pt-0">
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={2}
                dataKey="count"
              >
                {data.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #E2E0DC",
                  borderRadius: "6px",
                  fontSize: "12px",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-2 flex flex-wrap justify-center gap-3">
          {data.map((item, index) => (
            <div key={item.level} className="flex items-center gap-1.5">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              />
              <span className="text-xs text-muted-foreground">{item.level}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

// Resolution Performance Chart
interface ResolutionData {
  group: string
  avgTime: number
  target: number
}

interface ResolutionPerformanceChartProps {
  data: ResolutionData[]
  className?: string
}

export function ResolutionPerformanceChart({ data, className }: ResolutionPerformanceChartProps) {
  return (
    <Card className={className}>
      <CardHeader className="py-3 px-4">
        <CardTitle className="text-sm font-medium">Resolution Performance</CardTitle>
      </CardHeader>
      <CardContent className="px-4 pb-4 pt-0">
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E0DC" />
              <XAxis
                type="number"
                tick={{ fontSize: 10, fill: "#73847B" }}
                tickLine={false}
                axisLine={{ stroke: "#E2E0DC" }}
              />
              <YAxis
                type="category"
                dataKey="group"
                tick={{ fontSize: 10, fill: "#73847B" }}
                tickLine={false}
                axisLine={{ stroke: "#E2E0DC" }}
                width={100}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #E2E0DC",
                  borderRadius: "6px",
                  fontSize: "12px",
                }}
                formatter={(value, name) => [
                  `${value}h`,
                  name === "avgTime" ? "Avg Time" : "Target",
                ]}
              />
              <Bar dataKey="avgTime" fill="#0D3133" radius={[0, 4, 4, 0]} />
              <Bar dataKey="target" fill="#E69F50" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

// Top Breached Services
interface BreachedService {
  name: string
  breaches: number
  percentage: number
}

interface TopBreachedServicesProps {
  services: BreachedService[]
  className?: string
}

export function TopBreachedServices({ services, className }: TopBreachedServicesProps) {
  return (
    <Card className={className}>
      <CardHeader className="py-3 px-4">
        <CardTitle className="text-sm font-medium">Top Breached Services</CardTitle>
      </CardHeader>
      <CardContent className="px-4 pb-4 pt-0">
        <div className="space-y-3">
          {services.map((service, index) => (
            <div key={service.name} className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-sm">{service.name}</span>
                <span className="text-sm font-medium text-red-600">{service.breaches}</span>
              </div>
              <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-red-500 rounded-full"
                  style={{ width: `${service.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

// Longest Running Incidents
interface LongRunningIncident {
  id: string
  title: string
  duration: string
  group: string
}

interface LongestRunningIncidentsProps {
  incidents: LongRunningIncident[]
  className?: string
}

export function LongestRunningIncidents({ incidents, className }: LongestRunningIncidentsProps) {
  return (
    <Card className={className}>
      <CardHeader className="py-3 px-4">
        <CardTitle className="text-sm font-medium">Longest Running Incidents</CardTitle>
      </CardHeader>
      <CardContent className="px-4 pb-4 pt-0">
        <div className="space-y-2">
          {incidents.map((incident) => (
            <div key={incident.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-[#0D3133]">{incident.id}</p>
                <p className="text-xs text-muted-foreground truncate">{incident.title}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-mono font-medium text-red-600">{incident.duration}</p>
                <p className="text-xs text-muted-foreground">{incident.group}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
