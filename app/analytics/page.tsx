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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Home, BarChart3, LineChart, PieChart, FileText, 
  Download, Calendar, Settings 
} from "lucide-react"

import { AnalyticsKPIStrip } from "@/components/analytics/analytics-kpi-strip"
import { AnalyticsFilterBar } from "@/components/analytics/analytics-filter-bar"
import { IncidentTrendsChart } from "@/components/analytics/incident-trends-chart"
import { SLAComplianceChart } from "@/components/analytics/sla-compliance-chart"
import { PriorityDistributionChart } from "@/components/analytics/priority-distribution-chart"
import { ServiceHealthGrid } from "@/components/analytics/service-health-grid"
import { TeamPerformanceTable } from "@/components/analytics/team-performance-table"
import { OperationalHealthScore } from "@/components/analytics/operational-health-score"
import { InsightsPanel } from "@/components/analytics/insights-panel"
import { MajorIncidentsWidget } from "@/components/analytics/major-incidents-widget"

export default function AnalyticsDashboardPage() {
  const [lastUpdated, setLastUpdated] = useState(new Date())
  const [activeTab, setActiveTab] = useState("executive")

  const handleRefresh = () => {
    setLastUpdated(new Date())
  }

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
                <BreadcrumbPage>Analytics & Reporting</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* Page Header */}
        <div className="shrink-0 border-b border-border bg-card px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold text-[#0D3133]">Analytics Command Center</h1>
              <p className="mt-0.5 text-sm text-muted-foreground">
                Enterprise-grade reporting and operational analytics
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" asChild>
                <Link href="/analytics/reports" className="gap-1.5">
                  <FileText className="h-4 w-4" />
                  Custom Reports
                </Link>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <Link href="/analytics/exports" className="gap-1.5">
                  <Download className="h-4 w-4" />
                  Export Center
                </Link>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <Link href="/analytics/scheduled" className="gap-1.5">
                  <Calendar className="h-4 w-4" />
                  Scheduled Reports
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Analytics Tabs */}
        <div className="shrink-0 border-b border-border bg-card px-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="h-10 bg-transparent p-0">
              <TabsTrigger 
                value="executive" 
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#E69F50] data-[state=active]:bg-transparent"
              >
                <BarChart3 className="mr-1.5 h-4 w-4" />
                Executive
              </TabsTrigger>
              <TabsTrigger 
                value="operations" 
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#E69F50] data-[state=active]:bg-transparent"
              >
                <LineChart className="mr-1.5 h-4 w-4" />
                Operations
              </TabsTrigger>
              <TabsTrigger 
                value="sla" 
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#E69F50] data-[state=active]:bg-transparent"
              >
                <PieChart className="mr-1.5 h-4 w-4" />
                SLA Analytics
              </TabsTrigger>
              <TabsTrigger 
                value="services" 
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#E69F50] data-[state=active]:bg-transparent"
              >
                Services
              </TabsTrigger>
              <TabsTrigger 
                value="teams" 
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#E69F50] data-[state=active]:bg-transparent"
              >
                Teams
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Filter Bar */}
        <div className="shrink-0 border-b border-border bg-muted/30 px-6 py-3">
          <AnalyticsFilterBar onRefresh={handleRefresh} lastUpdated={lastUpdated} />
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6 space-y-6">
            {/* KPI Strip */}
            <AnalyticsKPIStrip />

            {/* Tab Content */}
            <Tabs value={activeTab} className="space-y-6">
              {/* Executive Dashboard */}
              <TabsContent value="executive" className="mt-0 space-y-6">
                <div className="grid gap-6 lg:grid-cols-3">
                  <div className="lg:col-span-2">
                    <OperationalHealthScore />
                  </div>
                  <div>
                    <MajorIncidentsWidget />
                  </div>
                </div>

                <div className="grid gap-6 lg:grid-cols-2">
                  <IncidentTrendsChart />
                  <SLAComplianceChart />
                </div>

                <div className="grid gap-6 lg:grid-cols-3">
                  <div className="lg:col-span-2">
                    <ServiceHealthGrid />
                  </div>
                  <PriorityDistributionChart />
                </div>

                <InsightsPanel />
              </TabsContent>

              {/* Operations Analytics */}
              <TabsContent value="operations" className="mt-0 space-y-6">
                <div className="grid gap-6 lg:grid-cols-2">
                  <IncidentTrendsChart title="Incident Inflow/Outflow" variant="line" />
                  <IncidentTrendsChart title="Backlog Trend" variant="area" />
                </div>

                <TeamPerformanceTable />

                <div className="grid gap-6 lg:grid-cols-3">
                  <PriorityDistributionChart />
                  <SLAComplianceChart />
                  <ServiceHealthGrid />
                </div>
              </TabsContent>

              {/* SLA Analytics */}
              <TabsContent value="sla" className="mt-0 space-y-6">
                <div className="grid gap-6 lg:grid-cols-2">
                  <SLAComplianceChart />
                  <IncidentTrendsChart title="SLA Performance Trend" />
                </div>

                <TeamPerformanceTable />

                <InsightsPanel />
              </TabsContent>

              {/* Services */}
              <TabsContent value="services" className="mt-0 space-y-6">
                <ServiceHealthGrid />

                <div className="grid gap-6 lg:grid-cols-2">
                  <IncidentTrendsChart title="Service Incident Trends" />
                  <PriorityDistributionChart />
                </div>

                <MajorIncidentsWidget />
              </TabsContent>

              {/* Teams */}
              <TabsContent value="teams" className="mt-0 space-y-6">
                <TeamPerformanceTable />

                <div className="grid gap-6 lg:grid-cols-2">
                  <SLAComplianceChart />
                  <IncidentTrendsChart title="Resolution Trends by Team" />
                </div>

                <InsightsPanel />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </AppShell>
  )
}
