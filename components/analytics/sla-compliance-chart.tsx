"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle } from "lucide-react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  ReferenceLine,
} from "recharts"

const data = [
  { name: "Platform Eng", compliance: 96.5, target: 95, incidents: 124 },
  { name: "Network Ops", compliance: 92.3, target: 95, incidents: 89 },
  { name: "Database", compliance: 98.1, target: 95, incidents: 67 },
  { name: "Security", compliance: 94.8, target: 95, incidents: 45 },
  { name: "App Support", compliance: 88.2, target: 95, incidents: 156 },
  { name: "Infrastructure", compliance: 95.6, target: 95, incidents: 78 },
]

export function SLAComplianceChart() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center gap-2">
          <CheckCircle className="h-4 w-4 text-muted-foreground" />
          <CardTitle className="text-sm font-semibold">SLA Compliance by Team</CardTitle>
        </div>
        <Badge variant="outline" className="text-[10px]">
          Target: 95%
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E0DC" horizontal={true} vertical={false} />
              <XAxis 
                type="number" 
                domain={[80, 100]}
                tick={{ fontSize: 10, fill: "#73847B" }}
                axisLine={{ stroke: "#E2E0DC" }}
                tickLine={false}
                tickFormatter={(value) => `${value}%`}
              />
              <YAxis 
                type="category" 
                dataKey="name" 
                width={90}
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
                formatter={(value: number) => [`${value}%`, "Compliance"]}
              />
              <ReferenceLine x={95} stroke="#E69F50" strokeDasharray="5 5" strokeWidth={2} />
              <Bar dataKey="compliance" radius={[0, 4, 4, 0]} barSize={20}>
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.compliance >= entry.target ? "#059669" : "#DC2626"} 
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-3 flex items-center justify-center gap-4 text-[10px]">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-green-600" />
            <span className="text-muted-foreground">Above Target</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-600" />
            <span className="text-muted-foreground">Below Target</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-0.5 w-4 bg-[#E69F50]" style={{ borderStyle: "dashed" }} />
            <span className="text-muted-foreground">95% Target</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
