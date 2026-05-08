"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"

const data = [
  { date: "Mon", opened: 24, resolved: 18, critical: 3 },
  { date: "Tue", opened: 32, resolved: 28, critical: 5 },
  { date: "Wed", opened: 28, resolved: 31, critical: 2 },
  { date: "Thu", opened: 45, resolved: 38, critical: 8 },
  { date: "Fri", opened: 38, resolved: 42, critical: 4 },
  { date: "Sat", opened: 12, resolved: 15, critical: 1 },
  { date: "Sun", opened: 8, resolved: 10, critical: 0 },
]

export function IncidentTrendChart() {
  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-card-foreground">Incident Trends</h3>
        <select className="rounded border border-border bg-background px-2 py-1 text-xs text-card-foreground">
          <option>Last 7 days</option>
          <option>Last 30 days</option>
          <option>Last 90 days</option>
        </select>
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E0DC" vertical={false} />
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: "#73847B" }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: "#73847B" }}
              width={30}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #E2E0DC",
                borderRadius: "8px",
                fontSize: "12px",
              }}
            />
            <Legend
              verticalAlign="bottom"
              height={36}
              iconSize={8}
              formatter={(value) => (
                <span style={{ color: "#0D3133", fontSize: "11px" }}>{value}</span>
              )}
            />
            <Line
              type="monotone"
              dataKey="opened"
              stroke="#0D3133"
              strokeWidth={2}
              dot={{ fill: "#0D3133", strokeWidth: 0, r: 3 }}
              activeDot={{ r: 5 }}
              name="Opened"
            />
            <Line
              type="monotone"
              dataKey="resolved"
              stroke="#059669"
              strokeWidth={2}
              dot={{ fill: "#059669", strokeWidth: 0, r: 3 }}
              activeDot={{ r: 5 }}
              name="Resolved"
            />
            <Line
              type="monotone"
              dataKey="critical"
              stroke="#DC2626"
              strokeWidth={2}
              dot={{ fill: "#DC2626", strokeWidth: 0, r: 3 }}
              activeDot={{ r: 5 }}
              name="Critical"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
