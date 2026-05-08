// Queue configuration for dynamic incident list views
export type QueueType = 
  | "all" 
  | "open" 
  | "in-progress" 
  | "resolved" 
  | "closed" 
  | "escalated" 
  | "vip" 
  | "watchlist"

export interface QueueConfig {
  title: string
  description: string
  defaultFilters: {
    status?: string[]
    tags?: string[]
    escalated?: boolean
    watchlist?: boolean
    vip?: boolean
  }
  breadcrumbLabel: string
}

export const queueConfigs: Record<QueueType, QueueConfig> = {
  all: {
    title: "All Incidents",
    description: "View and manage all incidents across the organization",
    defaultFilters: {},
    breadcrumbLabel: "All Incidents",
  },
  open: {
    title: "Open Incidents",
    description: "New and unassigned incidents awaiting triage",
    defaultFilters: {
      status: ["new", "assigned"],
    },
    breadcrumbLabel: "Open",
  },
  "in-progress": {
    title: "In Progress",
    description: "Incidents currently being worked on",
    defaultFilters: {
      status: ["in-progress", "pending", "waiting-vendor"],
    },
    breadcrumbLabel: "In Progress",
  },
  resolved: {
    title: "Resolved Incidents",
    description: "Incidents that have been resolved and awaiting closure",
    defaultFilters: {
      status: ["resolved"],
    },
    breadcrumbLabel: "Resolved",
  },
  closed: {
    title: "Closed Incidents",
    description: "Archived incidents that have been fully closed",
    defaultFilters: {
      status: ["closed"],
    },
    breadcrumbLabel: "Closed",
  },
  escalated: {
    title: "Escalated Incidents",
    description: "High-priority incidents requiring immediate attention",
    defaultFilters: {
      escalated: true,
    },
    breadcrumbLabel: "Escalated",
  },
  vip: {
    title: "VIP Incidents",
    description: "Incidents from VIP customers and critical accounts",
    defaultFilters: {
      vip: true,
      tags: ["vip", "executive", "premium"],
    },
    breadcrumbLabel: "VIP Incidents",
  },
  watchlist: {
    title: "Watchlist",
    description: "Incidents you are monitoring",
    defaultFilters: {
      watchlist: true,
    },
    breadcrumbLabel: "Watchlist",
  },
}

// Mock counts for each queue (in production, these would come from API)
export const queueCounts: Record<QueueType, number> = {
  all: 847,
  open: 42,
  "in-progress": 18,
  resolved: 156,
  closed: 1243,
  escalated: 5,
  vip: 3,
  watchlist: 7,
}

export function getQueueConfig(queueType: QueueType): QueueConfig {
  return queueConfigs[queueType] || queueConfigs.all
}

export function getQueueCount(queueType: QueueType): number {
  return queueCounts[queueType] || 0
}
