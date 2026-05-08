"use client"

import { type ReactNode } from "react"
import { SidebarProvider, useSidebar } from "@/contexts/sidebar-context"
import { Sidebar } from "./sidebar"
import { TopHeader } from "./top-header"

function AppShellInner({ children }: { children: ReactNode }) {
  const { isCollapsed } = useSidebar()

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div
        className="flex flex-1 flex-col transition-all duration-300"
        style={{
          marginLeft: isCollapsed ? "64px" : "280px",
        }}
      >
        {/* Top Header */}
        <TopHeader />

        {/* Main Content - height calculated to account for top header (64px) */}
        <main className="flex-1 overflow-hidden">
          {children}
        </main>
      </div>
    </div>
  )
}

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <AppShellInner>{children}</AppShellInner>
    </SidebarProvider>
  )
}
