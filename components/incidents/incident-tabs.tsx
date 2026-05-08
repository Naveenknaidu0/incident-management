"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

const tabs = [
  { id: "overview", label: "Overview" },
  { id: "activity", label: "Activity" },
  { id: "tasks", label: "Tasks" },
  { id: "communications", label: "Communications" },
  { id: "sla", label: "SLA" },
  { id: "related", label: "Related Records" },
  { id: "timeline", label: "Timeline" },
  { id: "audit", label: "Audit" },
  { id: "knowledge", label: "Knowledge" },
  { id: "ai-insights", label: "AI Insights" },
]

interface IncidentTabsProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export function IncidentTabs({ activeTab, onTabChange }: IncidentTabsProps) {
  return (
    <div className="shrink-0 border-b border-border bg-card">
      <div className="flex overflow-x-auto px-6 scrollbar-thin">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              "relative whitespace-nowrap px-4 py-3 text-sm font-medium transition-colors",
              activeTab === tab.id
                ? "text-[#0D3133]"
                : "text-muted-foreground hover:text-[#0D3133]"
            )}
          >
            {tab.label}
            {activeTab === tab.id && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#E69F50]"
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
