"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Search,
  FileText,
  AlertTriangle,
  BookOpen,
  Server,
  Clock,
  ArrowRight,
} from "lucide-react"

interface SearchResult {
  type: "article" | "known-error" | "runbook" | "incident" | "service"
  id: string
  title: string
  category?: string
}

const recentSearches = [
  "VPN connection timeout",
  "Database performance",
  "Email delivery failure",
  "Network outage recovery",
]

const mockResults: SearchResult[] = [
  { type: "article", id: "KB0012847", title: "VPN Connection Timeout Resolution", category: "VPN" },
  { type: "article", id: "KB0012654", title: "VPN Certificate Renewal Guide", category: "VPN" },
  { type: "known-error", id: "KE0000234", title: "VPN Disconnection During Peak Hours" },
  { type: "runbook", id: "RB0000089", title: "VPN Service Recovery Procedure" },
  { type: "incident", id: "INC0042781", title: "VPN outage affecting remote workers" },
  { type: "service", id: "SVC0000012", title: "Corporate VPN Gateway" },
]

const getTypeIcon = (type: string) => {
  switch (type) {
    case "article":
      return FileText
    case "known-error":
      return AlertTriangle
    case "runbook":
      return BookOpen
    case "service":
      return Server
    default:
      return FileText
  }
}

const getTypeLabel = (type: string) => {
  switch (type) {
    case "article":
      return "Article"
    case "known-error":
      return "Known Error"
    case "runbook":
      return "Runbook"
    case "incident":
      return "Incident"
    case "service":
      return "Service"
    default:
      return type
  }
}

export function KnowledgeSearch() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-full justify-start gap-2 text-muted-foreground md:w-[400px]"
        >
          <Search className="h-4 w-4" />
          <span>Search knowledge base...</span>
          <kbd className="ml-auto hidden rounded border bg-muted px-1.5 text-[10px] font-medium text-muted-foreground md:inline-flex">
            /
          </kbd>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[400px] p-0" align="start">
        <Command>
          <CommandInput
            placeholder="Search articles, known errors, runbooks..."
            value={query}
            onValueChange={setQuery}
          />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            
            {!query && (
              <CommandGroup heading="Recent Searches">
                {recentSearches.map((search) => (
                  <CommandItem
                    key={search}
                    onSelect={() => setQuery(search)}
                    className="gap-2"
                  >
                    <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                    <span className="text-sm">{search}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}

            {query && (
              <>
                <CommandGroup heading="Articles">
                  {mockResults
                    .filter((r) => r.type === "article")
                    .map((result) => {
                      const Icon = getTypeIcon(result.type)
                      return (
                        <CommandItem key={result.id} className="gap-2">
                          <Icon className="h-3.5 w-3.5 text-muted-foreground" />
                          <div className="flex-1">
                            <p className="text-sm">{result.title}</p>
                            <p className="text-xs text-muted-foreground">{result.id}</p>
                          </div>
                          {result.category && (
                            <Badge variant="secondary" className="text-[10px]">
                              {result.category}
                            </Badge>
                          )}
                        </CommandItem>
                      )
                    })}
                </CommandGroup>
                
                <CommandSeparator />
                
                <CommandGroup heading="Known Errors">
                  {mockResults
                    .filter((r) => r.type === "known-error")
                    .map((result) => {
                      const Icon = getTypeIcon(result.type)
                      return (
                        <CommandItem key={result.id} className="gap-2">
                          <Icon className="h-3.5 w-3.5 text-amber-600" />
                          <div className="flex-1">
                            <p className="text-sm">{result.title}</p>
                            <p className="text-xs text-muted-foreground">{result.id}</p>
                          </div>
                        </CommandItem>
                      )
                    })}
                </CommandGroup>

                <CommandSeparator />

                <CommandGroup heading="Runbooks">
                  {mockResults
                    .filter((r) => r.type === "runbook")
                    .map((result) => {
                      const Icon = getTypeIcon(result.type)
                      return (
                        <CommandItem key={result.id} className="gap-2">
                          <Icon className="h-3.5 w-3.5 text-[#0D3133]" />
                          <div className="flex-1">
                            <p className="text-sm">{result.title}</p>
                            <p className="text-xs text-muted-foreground">{result.id}</p>
                          </div>
                        </CommandItem>
                      )
                    })}
                </CommandGroup>
              </>
            )}

            <CommandSeparator />
            
            <div className="p-2">
              <Button variant="ghost" size="sm" className="w-full justify-between text-xs">
                View all results
                <ArrowRight className="h-3 w-3" />
              </Button>
            </div>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
