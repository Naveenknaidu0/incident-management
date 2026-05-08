"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts"

const deliveryData = [
  { day: "Mon", delivered: 45, failed: 2 },
  { day: "Tue", delivered: 52, failed: 3 },
  { day: "Wed", delivered: 38, failed: 1 },
  { day: "Thu", delivered: 67, failed: 4 },
  { day: "Fri", delivered: 54, failed: 2 },
  { day: "Sat", delivered: 23, failed: 0 },
  { day: "Sun", delivered: 18, failed: 1 },
]

const channelData = [
  { name: "Email", value: 45, color: "#3B82F6" },
  { name: "Slack", value: 28, color: "#8B5CF6" },
  { name: "Teams", value: 15, color: "#6366F1" },
  { name: "SMS", value: 8, color: "#10B981" },
  { name: "Push", value: 4, color: "#F59E0B" },
]

const engagementData = [
  { time: "00:00", rate: 65 },
  { time: "04:00", rate: 42 },
  { time: "08:00", rate: 78 },
  { time: "12:00", rate: 85 },
  { time: "16:00", rate: 72 },
  { time: "20:00", rate: 58 },
]

export function CommAnalytics() {
  return (
    <div className="grid grid-cols-3 gap-4">
      {/* Delivery Success */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Delivery Success Rate</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={deliveryData}>
              <XAxis dataKey="day" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ fontSize: 12, borderRadius: 8 }}
                labelStyle={{ fontWeight: 600 }}
              />
              <Bar dataKey="delivered" fill="#0D3133" radius={[4, 4, 0, 0]} />
              <Bar dataKey="failed" fill="#EF4444" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Channel Usage */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Channel Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center">
            <ResponsiveContainer width="50%" height={180}>
              <PieChart>
                <Pie
                  data={channelData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={70}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {channelData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-1.5">
              {channelData.map((channel) => (
                <div key={channel.name} className="flex items-center gap-2">
                  <div
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: channel.color }}
                  />
                  <span className="text-xs text-muted-foreground">{channel.name}</span>
                  <span className="text-xs font-medium">{channel.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Engagement Rate */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Engagement by Time</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={engagementData}>
              <XAxis dataKey="time" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ fontSize: 12, borderRadius: 8 }}
                labelStyle={{ fontWeight: 600 }}
              />
              <Line
                type="monotone"
                dataKey="rate"
                stroke="#E69F50"
                strokeWidth={2}
                dot={{ fill: "#E69F50", strokeWidth: 0, r: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
