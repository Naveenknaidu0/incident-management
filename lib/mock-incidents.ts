import type { Incident } from "@/components/queue/incident-queue-table"

// Comprehensive mock data for incidents
export const mockIncidents: Incident[] = [
  {
    id: "INC0042781",
    title: "Payment Gateway Timeout - Multiple Transaction Failures",
    status: "in-progress",
    priority: "critical",
    severity: "1",
    sla: { remaining: "0:45:22", status: "warning" },
    assignmentGroup: "Payment Operations",
    assignedTo: { name: "Sarah Chen", avatar: "" },
    service: "Payment Gateway",
    updatedAt: "2 mins ago",
    createdAt: "Jan 15, 2024",
    tags: ["payment", "production", "vip"],
    isPinned: true,
    isRecentlyUpdated: true,
  },
  {
    id: "INC0042780",
    title: "Database Connection Pool Exhaustion on Primary Cluster",
    status: "major-incident",
    priority: "critical",
    severity: "1",
    sla: { remaining: "-0:15:00", status: "breached" },
    assignmentGroup: "Database Team",
    assignedTo: { name: "John Smith", avatar: "" },
    service: "Core Database",
    updatedAt: "5 mins ago",
    createdAt: "Jan 15, 2024",
    tags: ["database", "critical", "escalated"],
    isPinned: true,
    isRecentlyUpdated: true,
  },
  {
    id: "INC0042779",
    title: "User Authentication Service Degraded Performance",
    status: "assigned",
    priority: "high",
    severity: "2",
    sla: { remaining: "2:30:00", status: "safe" },
    assignmentGroup: "Identity Services",
    assignedTo: { name: "Emily Davis", avatar: "" },
    service: "User Authentication",
    updatedAt: "15 mins ago",
    createdAt: "Jan 15, 2024",
    tags: ["auth", "performance"],
  },
  {
    id: "INC0042778",
    title: "Mobile App Crash on iOS 17.2 After Latest Update",
    status: "pending",
    priority: "high",
    severity: "2",
    sla: { remaining: "1:45:30", status: "warning" },
    assignmentGroup: "Mobile Development",
    assignedTo: { name: "Michael Brown", avatar: "" },
    service: "Mobile App",
    updatedAt: "30 mins ago",
    createdAt: "Jan 14, 2024",
    tags: ["mobile", "ios", "vip"],
  },
  {
    id: "INC0042777",
    title: "Email Notification Service Queue Backlog",
    status: "in-progress",
    priority: "medium",
    severity: "3",
    sla: { remaining: "4:15:00", status: "safe" },
    assignmentGroup: "Messaging Team",
    assignedTo: { name: "Lisa Wilson", avatar: "" },
    service: "Notification Service",
    updatedAt: "45 mins ago",
    createdAt: "Jan 14, 2024",
    tags: ["email", "queue"],
  },
  {
    id: "INC0042776",
    title: "API Rate Limiting Not Working Correctly",
    status: "new",
    priority: "medium",
    severity: "3",
    sla: { remaining: "7:30:00", status: "safe" },
    assignmentGroup: "API Platform",
    service: "API Gateway",
    updatedAt: "1 hour ago",
    createdAt: "Jan 14, 2024",
    tags: ["api", "security"],
  },
  {
    id: "INC0042775",
    title: "Report Generation Failing for Large Datasets",
    status: "waiting-vendor",
    priority: "medium",
    severity: "3",
    sla: { remaining: "5:00:00", status: "safe" },
    assignmentGroup: "Reporting Team",
    assignedTo: { name: "David Lee", avatar: "" },
    service: "Analytics Platform",
    updatedAt: "2 hours ago",
    createdAt: "Jan 13, 2024",
    tags: ["reports", "performance", "escalated"],
  },
  {
    id: "INC0042774",
    title: "SSL Certificate Expiring in 7 Days",
    status: "assigned",
    priority: "low",
    severity: "4",
    sla: { remaining: "23:45:00", status: "safe" },
    assignmentGroup: "Security Operations",
    assignedTo: { name: "Anna Martinez", avatar: "" },
    service: "Infrastructure",
    updatedAt: "3 hours ago",
    createdAt: "Jan 13, 2024",
    tags: ["security", "maintenance"],
  },
  {
    id: "INC0042773",
    title: "Search Functionality Returning Incorrect Results",
    status: "in-progress",
    priority: "high",
    severity: "2",
    sla: { remaining: "3:20:00", status: "safe" },
    assignmentGroup: "Search Team",
    assignedTo: { name: "Robert Taylor", avatar: "" },
    service: "Search Engine",
    updatedAt: "4 hours ago",
    createdAt: "Jan 13, 2024",
    tags: ["search", "bug", "executive"],
  },
  {
    id: "INC0042772",
    title: "CDN Cache Invalidation Not Propagating",
    status: "resolved",
    priority: "medium",
    severity: "3",
    sla: { remaining: "Completed", status: "safe" },
    assignmentGroup: "Infrastructure",
    assignedTo: { name: "James Anderson", avatar: "" },
    service: "CDN",
    updatedAt: "5 hours ago",
    createdAt: "Jan 12, 2024",
    tags: ["cdn", "caching"],
  },
  {
    id: "INC0042771",
    title: "Login Page Slow Load Times in EU Region",
    status: "in-progress",
    priority: "medium",
    severity: "3",
    sla: { remaining: "2:10:00", status: "warning" },
    assignmentGroup: "Web Platform",
    assignedTo: { name: "Sophie Turner", avatar: "" },
    service: "Web Portal",
    updatedAt: "6 hours ago",
    createdAt: "Jan 12, 2024",
    tags: ["web", "performance", "escalated"],
  },
  {
    id: "INC0042770",
    title: "Backup Job Failed on Secondary Storage",
    status: "new",
    priority: "low",
    severity: "4",
    sla: { remaining: "12:00:00", status: "safe" },
    assignmentGroup: "Infrastructure",
    service: "Backup Systems",
    updatedAt: "8 hours ago",
    createdAt: "Jan 12, 2024",
    tags: ["backup", "storage"],
    isStale: true,
  },
  {
    id: "INC0042769",
    title: "Customer Portal Session Timeout Issues",
    status: "resolved",
    priority: "medium",
    severity: "3",
    sla: { remaining: "Completed", status: "safe" },
    assignmentGroup: "Web Platform",
    assignedTo: { name: "Chris Evans", avatar: "" },
    service: "Customer Portal",
    updatedAt: "10 hours ago",
    createdAt: "Jan 11, 2024",
    tags: ["portal", "session"],
  },
  {
    id: "INC0042768",
    title: "Inventory Sync Failing Between Systems",
    status: "closed",
    priority: "high",
    severity: "2",
    sla: { remaining: "Completed", status: "safe" },
    assignmentGroup: "Integration Team",
    assignedTo: { name: "Maria Garcia", avatar: "" },
    service: "Inventory System",
    updatedAt: "1 day ago",
    createdAt: "Jan 10, 2024",
    tags: ["inventory", "sync"],
  },
  {
    id: "INC0042767",
    title: "Dashboard Widgets Not Loading for Some Users",
    status: "closed",
    priority: "low",
    severity: "4",
    sla: { remaining: "Completed", status: "safe" },
    assignmentGroup: "Frontend Team",
    assignedTo: { name: "Kevin Park", avatar: "" },
    service: "Dashboard",
    updatedAt: "2 days ago",
    createdAt: "Jan 9, 2024",
    tags: ["dashboard", "ui"],
  },
  {
    id: "INC0042766",
    title: "Executive Dashboard Access Issues",
    status: "in-progress",
    priority: "critical",
    severity: "1",
    sla: { remaining: "0:30:00", status: "breach" },
    assignmentGroup: "Security Operations",
    assignedTo: { name: "Tom Harris", avatar: "" },
    service: "Executive Portal",
    updatedAt: "20 mins ago",
    createdAt: "Jan 15, 2024",
    tags: ["executive", "vip", "access", "escalated"],
    isRecentlyUpdated: true,
  },
]

export type QueueType = 
  | "all" 
  | "open" 
  | "in-progress" 
  | "resolved" 
  | "closed" 
  | "escalated" 
  | "vip" 
  | "watchlist"

// Filter incidents based on queue type
export function filterIncidentsByQueue(incidents: Incident[], queueType: QueueType): Incident[] {
  switch (queueType) {
    case "open":
      return incidents.filter((i) => i.status === "new" || i.status === "assigned")
    case "in-progress":
      return incidents.filter((i) => 
        i.status === "in-progress" || i.status === "pending" || i.status === "waiting-vendor"
      )
    case "resolved":
      return incidents.filter((i) => i.status === "resolved")
    case "closed":
      return incidents.filter((i) => i.status === "closed")
    case "escalated":
      return incidents.filter((i) => 
        i.tags.includes("escalated") || i.status === "major-incident"
      )
    case "vip":
      return incidents.filter((i) => 
        i.tags.some((tag) => ["vip", "executive", "premium"].includes(tag))
      )
    case "watchlist":
      // For demo, return a subset as "watched" incidents
      return incidents.filter((_, index) => index % 2 === 0).slice(0, 7)
    case "all":
    default:
      return incidents
  }
}

// Get summary metrics for the dashboard
export function getQueueMetrics(incidents: Incident[]) {
  return {
    open: incidents.filter((i) => i.status === "new" || i.status === "assigned").length,
    critical: incidents.filter((i) => i.priority === "critical").length,
    slaBreached: incidents.filter((i) => i.sla.status === "breached" || i.sla.status === "breach").length,
    assignedToMe: 15, // Mock value
    escalated: incidents.filter((i) => i.tags.includes("escalated") || i.status === "major-incident").length,
    majorIncidents: incidents.filter((i) => i.status === "major-incident").length,
  }
}
