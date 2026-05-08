"use client"

import { useState } from "react"
import Link from "next/link"
import { AppShell } from "@/components/layout/app-shell"
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { 
  Home, Download, FileText, FileSpreadsheet, Image, 
  Clock, CheckCircle, Loader2, XCircle, Trash2
} from "lucide-react"

interface ExportJob {
  id: string
  name: string
  format: "pdf" | "csv" | "xlsx" | "png"
  status: "completed" | "processing" | "failed"
  size?: string
  createdAt: string
  expiresAt?: string
}

const recentExports: ExportJob[] = [
  {
    id: "1",
    name: "Weekly SLA Performance Report",
    format: "pdf",
    status: "completed",
    size: "2.4 MB",
    createdAt: "10 minutes ago",
    expiresAt: "in 7 days",
  },
  {
    id: "2",
    name: "Incident Data Export - January 2024",
    format: "csv",
    status: "completed",
    size: "8.1 MB",
    createdAt: "1 hour ago",
    expiresAt: "in 7 days",
  },
  {
    id: "3",
    name: "Team Performance Dashboard",
    format: "png",
    status: "processing",
    createdAt: "5 minutes ago",
  },
  {
    id: "4",
    name: "Service Health Analytics",
    format: "xlsx",
    status: "completed",
    size: "1.2 MB",
    createdAt: "3 hours ago",
    expiresAt: "in 6 days",
  },
  {
    id: "5",
    name: "Major Incident Report - Q4",
    format: "pdf",
    status: "failed",
    createdAt: "2 hours ago",
  },
]

const formatIcons = {
  pdf: FileText,
  csv: FileSpreadsheet,
  xlsx: FileSpreadsheet,
  png: Image,
}

const formatLabels = {
  pdf: "PDF",
  csv: "CSV",
  xlsx: "Excel",
  png: "Image",
}

const statusStyles = {
  completed: { icon: CheckCircle, color: "text-green-600", bg: "bg-green-100" },
  processing: { icon: Loader2, color: "text-blue-600", bg: "bg-blue-100" },
  failed: { icon: XCircle, color: "text-red-600", bg: "bg-red-100" },
}

export default function ExportCenterPage() {
  const [activeTab, setActiveTab] = useState("recent")

  return (
    <AppShell>
      <div className="flex h-full flex-col overflow-hidden">
        {/* Breadcrumb */}
        <div className="shrink-0 border-b border-border bg-muted/30 px-6 py-2">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/" className="flex items-center gap-1">
                    <Home className="h-3.5 w-3.5" />
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/analytics">Analytics</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Export Center</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* Page Header */}
        <div className="shrink-0 border-b border-border bg-card px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold text-[#0D3133]">Export Center</h1>
              <p className="mt-0.5 text-sm text-muted-foreground">
                Download and manage exported reports and data
              </p>
            </div>
          </div>
        </div>

        {/* Quick Export Cards */}
        <div className="shrink-0 border-b border-border bg-muted/30 px-6 py-4">
          <h3 className="mb-3 text-xs font-medium text-muted-foreground">QUICK EXPORT</h3>
          <div className="grid grid-cols-4 gap-3">
            <Card className="cursor-pointer transition-colors hover:border-[#E69F50]">
              <CardContent className="flex items-center gap-3 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100">
                  <FileText className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">Export as PDF</p>
                  <p className="text-[10px] text-muted-foreground">Formatted report</p>
                </div>
              </CardContent>
            </Card>
            <Card className="cursor-pointer transition-colors hover:border-[#E69F50]">
              <CardContent className="flex items-center gap-3 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
                  <FileSpreadsheet className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">Export as CSV</p>
                  <p className="text-[10px] text-muted-foreground">Raw data export</p>
                </div>
              </CardContent>
            </Card>
            <Card className="cursor-pointer transition-colors hover:border-[#E69F50]">
              <CardContent className="flex items-center gap-3 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100">
                  <FileSpreadsheet className="h-5 w-5 text-emerald-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">Export as Excel</p>
                  <p className="text-[10px] text-muted-foreground">Spreadsheet format</p>
                </div>
              </CardContent>
            </Card>
            <Card className="cursor-pointer transition-colors hover:border-[#E69F50]">
              <CardContent className="flex items-center gap-3 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100">
                  <Image className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">Export as Image</p>
                  <p className="text-[10px] text-muted-foreground">PNG snapshot</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Tabs */}
        <div className="shrink-0 border-b border-border bg-card px-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="h-10 bg-transparent p-0">
              <TabsTrigger 
                value="recent" 
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#E69F50] data-[state=active]:bg-transparent"
              >
                Recent Exports
              </TabsTrigger>
              <TabsTrigger 
                value="scheduled" 
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#E69F50] data-[state=active]:bg-transparent"
              >
                Scheduled Exports
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Export List */}
        <div className="flex-1 overflow-y-auto p-6">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="text-[11px] font-medium">Export Name</TableHead>
                    <TableHead className="text-[11px] font-medium">Format</TableHead>
                    <TableHead className="text-[11px] font-medium">Status</TableHead>
                    <TableHead className="text-[11px] font-medium">Size</TableHead>
                    <TableHead className="text-[11px] font-medium">Created</TableHead>
                    <TableHead className="text-[11px] font-medium">Expires</TableHead>
                    <TableHead className="w-24"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentExports.map((exportJob) => {
                    const FormatIcon = formatIcons[exportJob.format]
                    const statusConfig = statusStyles[exportJob.status]
                    const StatusIcon = statusConfig.icon
                    
                    return (
                      <TableRow key={exportJob.id} className="hover:bg-muted/50">
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <FormatIcon className="h-4 w-4 text-muted-foreground" />
                            <span className="text-xs font-medium">{exportJob.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary" className="text-[10px]">
                            {formatLabels[exportJob.format]}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1.5">
                            <StatusIcon className={`h-3.5 w-3.5 ${statusConfig.color} ${
                              exportJob.status === "processing" ? "animate-spin" : ""
                            }`} />
                            <span className="text-xs capitalize">{exportJob.status}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-xs text-muted-foreground">
                          {exportJob.size || "-"}
                        </TableCell>
                        <TableCell className="text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {exportJob.createdAt}
                          </span>
                        </TableCell>
                        <TableCell className="text-xs text-muted-foreground">
                          {exportJob.expiresAt || "-"}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            {exportJob.status === "completed" && (
                              <Button variant="outline" size="sm" className="h-7 gap-1 text-xs">
                                <Download className="h-3 w-3" />
                                Download
                              </Button>
                            )}
                            {exportJob.status === "failed" && (
                              <Button variant="outline" size="sm" className="h-7 text-xs">
                                Retry
                              </Button>
                            )}
                            <Button variant="ghost" size="icon" className="h-7 w-7">
                              <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  )
}
