"use client"

import { type ReactNode } from "react"
import { SettingsNav } from "./settings-nav"

interface SettingsLayoutProps {
  children: ReactNode
}

export function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <div className="flex h-full min-h-0">
      {/* Settings Navigation */}
      <SettingsNav />
      
      {/* Settings Content */}
      <div className="flex-1 overflow-y-auto">
        {children}
      </div>
    </div>
  )
}
