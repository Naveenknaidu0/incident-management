"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, X, Mail, Bell } from "lucide-react"

interface Watcher {
  id: string
  name: string
  role: string
  avatar?: string
  notified: boolean
  lastUpdate?: string
}

const watchers: Watcher[] = [
  { id: "1", name: "Sarah Chen", role: "Incident Commander", avatar: "SC", notified: true, lastUpdate: "2 min ago" },
  { id: "2", name: "Mike Johnson", role: "On-Call Engineer", avatar: "MJ", notified: true, lastUpdate: "5 min ago" },
  { id: "3", name: "Emily Davis", role: "Platform Lead", avatar: "ED", notified: true, lastUpdate: "8 min ago" },
  { id: "4", name: "James Wilson", role: "Database DBA", avatar: "JW", notified: false, lastUpdate: "1h ago" },
  { id: "5", name: "Lisa Wong", role: "DevOps", avatar: "LW", notified: true, lastUpdate: "just now" },
]

export function WatcherPanel() {
  return (
    <Card>
      <CardHeader className="py-3 px-4 border-b flex items-center justify-between">
        <CardTitle className="text-sm">Watchers ({watchers.length})</CardTitle>
        <Button variant="ghost" size="sm" className="h-7 px-2">
          <Plus className="h-3.5 w-3.5" />
        </Button>
      </CardHeader>
      <CardContent className="p-0">
        <div className="space-y-1">
          {watchers.map((watcher) => (
            <div key={watcher.id} className="flex items-center justify-between px-4 py-2 hover:bg-muted/50 transition-colors group">
              <div className="flex items-center gap-2 min-w-0">
                <Avatar className="h-6 w-6">
                  <AvatarFallback className="text-xs bg-[#0D3133] text-white">
                    {watcher.avatar}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <p className="text-xs font-medium text-foreground truncate">{watcher.name}</p>
                  <p className="text-[10px] text-muted-foreground truncate">{watcher.role}</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {watcher.notified && (
                  <Badge variant="outline" className="text-[10px] px-1 py-0 h-5">
                    <Bell className="h-2.5 w-2.5 mr-0.5" />
                    Notified
                  </Badge>
                )}
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100">
                  <X className="h-3 w-3" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
