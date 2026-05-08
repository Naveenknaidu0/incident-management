"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
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

const activityTrendData = [
  { date: "Mon", events: 1245, violations: 3 },
  { date: "Tue", events: 1456, violations: 5 },
  { date: "Wed", events: 1678, violations: 2 },
  { date: "Thu", events: 1234, violations: 8 },
  { date: "Fri", events: 1567, violations: 4 },
  { date: "Sat", events: 892, violations: 1 },
  { date: "Sun", events: 756, violations: 2 },
]

const violationsByTypeData = [
  { type: "SLA Override", count: 23 },
  { type: "Escalation Bypass", count: 12 },
  { type: "Unauthorized Edit", count: 8 },
  { type: "Missing Approval", count: 15 },
  { type: "Config Anomaly", count: 6 },
]

const eventDistributionData = [
  { name: "Status Changes", value: 35, color: "#0D3133" },
  { name: "Assignments", value: 25, color: "#E69F50" },
  { name: "Escalations", value: 15, color: "#73847B" },
  { name: "Config Updates", value: 12, color: "#1A4A4D" },
  { name: "Other", value: 13, color: "#E2E0DC" },
]

const workflowChangesData = [
  { week: "W1", created: 5, modified: 12, deleted: 2 },
  { week: "W2", created: 8, modified: 15, deleted: 1 },
  { week: "W3", created: 3, modified: 9, deleted: 3 },
  { week: "W4", created: 6, modified: 18, deleted: 0 },
]

export function AuditActivityTrendChart() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm">Audit Activity Trend</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={activityTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E0DC" />
              <XAxis dataKey="date" tick={{ fontSize: 10 }} stroke="#73847B" />
              <YAxis tick={{ fontSize: 10 }} stroke="#73847B" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #E2E0DC",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
              />
              <Legend wrapperStyle={{ fontSize: "10px" }} />
              <Line
                type="monotone"
                dataKey="events"
                name="Audit Events"
                stroke="#0D3133"
                strokeWidth={2}
                dot={{ fill: "#0D3133", strokeWidth: 0, r: 3 }}
              />
              <Line
                type="monotone"
                dataKey="violations"
                name="Violations"
                stroke="#DC2626"
                strokeWidth={2}
                dot={{ fill: "#DC2626", strokeWidth: 0, r: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

export function ViolationsByTypeChart() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm">Governance Violations by Type</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={violationsByTypeData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E0DC" />
              <XAxis type="number" tick={{ fontSize: 10 }} stroke="#73847B" />
              <YAxis dataKey="type" type="category" tick={{ fontSize: 10 }} width={100} stroke="#73847B" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #E2E0DC",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
              />
              <Bar dataKey="count" fill="#E69F50" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

export function EventDistributionChart() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm">Event Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={eventDistributionData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={70}
                paddingAngle={2}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                labelLine={false}
              >
                {eventDistributionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #E2E0DC",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

export function WorkflowChangesChart() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm">Workflow Changes</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={workflowChangesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E0DC" />
              <XAxis dataKey="week" tick={{ fontSize: 10 }} stroke="#73847B" />
              <YAxis tick={{ fontSize: 10 }} stroke="#73847B" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #E2E0DC",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
              />
              <Legend wrapperStyle={{ fontSize: "10px" }} />
              <Bar dataKey="created" name="Created" fill="#059669" radius={[2, 2, 0, 0]} />
              <Bar dataKey="modified" name="Modified" fill="#E69F50" radius={[2, 2, 0, 0]} />
              <Bar dataKey="deleted" name="Deleted" fill="#DC2626" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
