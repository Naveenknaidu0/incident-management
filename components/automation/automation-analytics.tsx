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

const executionTrendData = [
  { date: "Mon", executions: 145, failed: 3 },
  { date: "Tue", executions: 178, failed: 5 },
  { date: "Wed", executions: 156, failed: 2 },
  { date: "Thu", executions: 189, failed: 4 },
  { date: "Fri", executions: 201, failed: 6 },
  { date: "Sat", executions: 87, failed: 1 },
  { date: "Sun", executions: 65, failed: 0 },
]

const workflowTypeData = [
  { name: "Assignment", value: 35, color: "#0D3133" },
  { name: "SLA", value: 28, color: "#E69F50" },
  { name: "Escalation", value: 20, color: "#73847B" },
  { name: "Notification", value: 12, color: "#1A4A4D" },
  { name: "Lifecycle", value: 5, color: "#E2E0DC" },
]

const timeSavedData = [
  { month: "Jan", hours: 120 },
  { month: "Feb", hours: 145 },
  { month: "Mar", hours: 168 },
  { month: "Apr", hours: 189 },
  { month: "May", hours: 210 },
  { month: "Jun", hours: 235 },
]

const topWorkflowsData = [
  { name: "Auto Assignment", runs: 1245, successRate: 98.2 },
  { name: "SLA Breach Escalation", runs: 892, successRate: 99.1 },
  { name: "VIP Routing", runs: 654, successRate: 97.8 },
  { name: "Executive Notification", runs: 432, successRate: 96.5 },
  { name: "Major Incident Trigger", runs: 78, successRate: 100 },
]

export function AutomationAnalytics() {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      {/* Execution Trends */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold">Execution Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={executionTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E0DC" />
                <XAxis dataKey="date" tick={{ fontSize: 12 }} stroke="#73847B" />
                <YAxis tick={{ fontSize: 12 }} stroke="#73847B" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #E2E0DC",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="executions"
                  name="Executions"
                  stroke="#0D3133"
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="failed"
                  name="Failed"
                  stroke="#DC2626"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Workflow Distribution */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold">Workflow Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={workflowTypeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {workflowTypeData.map((entry, index) => (
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
                <Legend
                  layout="vertical"
                  verticalAlign="middle"
                  align="right"
                  wrapperStyle={{ fontSize: "12px" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Time Saved */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold">Time Saved (Hours)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={timeSavedData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E0DC" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#73847B" />
                <YAxis tick={{ fontSize: 12 }} stroke="#73847B" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #E2E0DC",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                />
                <Bar dataKey="hours" fill="#E69F50" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Top Workflows */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold">Top Performing Workflows</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {topWorkflowsData.map((workflow, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-muted text-xs font-medium">
                    {index + 1}
                  </span>
                  <div>
                    <p className="text-sm font-medium">{workflow.name}</p>
                    <p className="text-xs text-muted-foreground">{workflow.runs} runs</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-1.5 w-16 rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-green-500"
                      style={{ width: `${workflow.successRate}%` }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {workflow.successRate}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
