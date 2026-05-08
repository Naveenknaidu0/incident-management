"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"

const usageData = [
  { month: "Jan", views: 12450, resolutions: 8320 },
  { month: "Feb", views: 14230, resolutions: 9540 },
  { month: "Mar", views: 15890, resolutions: 10230 },
  { month: "Apr", views: 13240, resolutions: 8890 },
  { month: "May", views: 16780, resolutions: 11450 },
  { month: "Jun", views: 18230, resolutions: 12340 },
]

const deflectionData = [
  { week: "W1", deflected: 234, escalated: 45 },
  { week: "W2", deflected: 267, escalated: 38 },
  { week: "W3", deflected: 289, escalated: 42 },
  { week: "W4", deflected: 312, escalated: 35 },
]

const categoryData = [
  { name: "Network", value: 324 },
  { name: "VPN", value: 256 },
  { name: "Email", value: 198 },
  { name: "Database", value: 167 },
  { name: "Security", value: 145 },
]

const COLORS = ["#0D3133", "#E69F50", "#73847B", "#1A4A4D", "#E2E0DC"]

const topArticles = [
  { title: "VPN Connection Troubleshooting", views: 4523, success: 94 },
  { title: "Email Configuration Guide", views: 3892, success: 91 },
  { title: "Password Reset Procedure", views: 3654, success: 98 },
  { title: "Network Diagnostics Steps", views: 3421, success: 89 },
  { title: "Software Installation Guide", views: 3198, success: 96 },
]

export function KnowledgeAnalytics() {
  return (
    <div className="space-y-6">
      {/* Article Usage Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-semibold">Article Usage Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={usageData}>
                <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip
                  contentStyle={{ fontSize: 12 }}
                  labelStyle={{ fontWeight: 600 }}
                />
                <Line
                  type="monotone"
                  dataKey="views"
                  stroke="#0D3133"
                  strokeWidth={2}
                  dot={false}
                  name="Views"
                />
                <Line
                  type="monotone"
                  dataKey="resolutions"
                  stroke="#E69F50"
                  strokeWidth={2}
                  dot={false}
                  name="Resolutions"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Incident Deflection */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-semibold">Incident Deflection Rate</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[180px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={deflectionData}>
                <XAxis dataKey="week" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip contentStyle={{ fontSize: 12 }} />
                <Bar dataKey="deflected" fill="#0D3133" name="Deflected" radius={[4, 4, 0, 0]} />
                <Bar dataKey="escalated" fill="#E69F50" name="Escalated" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Category Distribution */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-semibold">Usage by Category</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className="h-[120px] w-[120px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={30}
                    outerRadius={50}
                    dataKey="value"
                  >
                    {categoryData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex-1 space-y-1">
              {categoryData.map((cat, idx) => (
                <div key={cat.name} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: COLORS[idx] }}
                    />
                    <span className="text-muted-foreground">{cat.name}</span>
                  </div>
                  <span className="font-medium">{cat.value}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Top Articles */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-semibold">Most Viewed Articles</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {topArticles.map((article, idx) => (
              <div key={article.title} className="flex items-center gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-medium">
                  {idx + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-medium text-[#0D3133]">{article.title}</p>
                  <p className="text-[10px] text-muted-foreground">
                    {article.views.toLocaleString()} views
                  </p>
                </div>
                <span className="text-xs font-medium text-green-600">{article.success}%</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
