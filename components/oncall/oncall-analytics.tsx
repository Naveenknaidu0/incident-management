"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"

const responseTimeData = [
  { day: "Mon", time: 2.5 },
  { day: "Tue", time: 3.1 },
  { day: "Wed", time: 2.8 },
  { day: "Thu", time: 4.2 },
  { day: "Fri", time: 2.1 },
  { day: "Sat", time: 1.8 },
  { day: "Sun", time: 2.0 },
]

const escalationData = [
  { week: "W1", L1: 45, L2: 12, L3: 4 },
  { week: "W2", L1: 52, L2: 15, L3: 6 },
  { week: "W3", L1: 38, L2: 10, L3: 3 },
  { week: "W4", L1: 48, L2: 14, L3: 5 },
]

const workloadData = [
  { name: "Sarah Chen", value: 24 },
  { name: "John Smith", value: 18 },
  { name: "Emily Davis", value: 15 },
  { name: "Mike Wilson", value: 12 },
  { name: "Others", value: 31 },
]

const COLORS = ["#0D3133", "#E69F50", "#73847B", "#1A4A4D", "#E2E0DC"]

export function OnCallAnalytics() {
  return (
    <div className="grid grid-cols-2 gap-4">
      {/* Response Time Trend */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold text-[#0D3133]">
            Avg Response Time (min)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={responseTimeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E0DC" />
              <XAxis dataKey="day" tick={{ fontSize: 11 }} stroke="#73847B" />
              <YAxis tick={{ fontSize: 11 }} stroke="#73847B" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="time"
                stroke="#E69F50"
                strokeWidth={2}
                dot={{ fill: "#E69F50" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Escalation Frequency */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold text-[#0D3133]">
            Escalation Frequency
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={escalationData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E0DC" />
              <XAxis dataKey="week" tick={{ fontSize: 11 }} stroke="#73847B" />
              <YAxis tick={{ fontSize: 11 }} stroke="#73847B" />
              <Tooltip />
              <Bar dataKey="L1" stackId="a" fill="#0D3133" />
              <Bar dataKey="L2" stackId="a" fill="#E69F50" />
              <Bar dataKey="L3" stackId="a" fill="#73847B" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Responder Workload */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold text-[#0D3133]">
            Responder Workload
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie
                data={workloadData}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={70}
                paddingAngle={2}
                dataKey="value"
              >
                {workloadData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Shift Coverage */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold text-[#0D3133]">
            Shift Coverage Rate
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { team: "Platform", coverage: 98 },
              { team: "Database", coverage: 92 },
              { team: "Network", coverage: 100 },
              { team: "Security", coverage: 85 },
            ].map((item) => (
              <div key={item.team}>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-muted-foreground">{item.team}</span>
                  <span className="font-medium text-[#0D3133]">{item.coverage}%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${item.coverage}%`,
                      backgroundColor: item.coverage >= 95 ? "#059669" :
                        item.coverage >= 85 ? "#E69F50" : "#DC2626"
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
