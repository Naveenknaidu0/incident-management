"use client"

import { useState } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { ArticleStatusBadge } from "./article-status-badge"
import { CategoryBadge } from "./category-badge"
import {
  ArrowUpDown,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Copy,
  ExternalLink,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface Article {
  id: string
  title: string
  category: "network" | "infrastructure" | "email" | "cloud" | "vpn" | "security" | "database" | "applications"
  status: "draft" | "review" | "published" | "archived" | "deprecated"
  author: string
  updatedAt: string
  usageCount: number
  successRate: number
}

interface ArticleTableProps {
  articles: Article[]
}

export function ArticleTable({ articles }: ArticleTableProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [sortColumn, setSortColumn] = useState<string>("updatedAt")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")

  const handleSelectAll = (checked: boolean) => {
    setSelectedIds(checked ? articles.map((a) => a.id) : [])
  }

  const handleSelectRow = (id: string, checked: boolean) => {
    setSelectedIds((prev) =>
      checked ? [...prev, id] : prev.filter((i) => i !== id)
    )
  }

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"))
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

  const SortHeader = ({ column, children }: { column: string; children: React.ReactNode }) => (
    <button
      onClick={() => handleSort(column)}
      className="flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground"
    >
      {children}
      <ArrowUpDown className="h-3 w-3" />
    </button>
  )

  return (
    <div className="rounded-lg border border-border bg-card">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="sticky top-0 z-10 border-b border-border bg-muted/50">
            <tr>
              <th className="px-4 py-3 text-left">
                <Checkbox
                  checked={selectedIds.length === articles.length && articles.length > 0}
                  onCheckedChange={handleSelectAll}
                />
              </th>
              <th className="px-3 py-3 text-left">
                <SortHeader column="id">Article ID</SortHeader>
              </th>
              <th className="min-w-[300px] px-3 py-3 text-left">
                <SortHeader column="title">Title</SortHeader>
              </th>
              <th className="px-3 py-3 text-left">
                <SortHeader column="category">Category</SortHeader>
              </th>
              <th className="px-3 py-3 text-left">
                <SortHeader column="status">Status</SortHeader>
              </th>
              <th className="px-3 py-3 text-left">
                <SortHeader column="author">Author</SortHeader>
              </th>
              <th className="px-3 py-3 text-left">
                <SortHeader column="updatedAt">Updated</SortHeader>
              </th>
              <th className="px-3 py-3 text-right">
                <SortHeader column="usageCount">Usage</SortHeader>
              </th>
              <th className="px-3 py-3 text-right">
                <SortHeader column="successRate">Success</SortHeader>
              </th>
              <th className="px-2 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {articles.map((article) => (
              <tr
                key={article.id}
                className={cn(
                  "group border-b border-border transition-colors hover:bg-muted/50",
                  selectedIds.includes(article.id) && "bg-[#E69F50]/5"
                )}
              >
                <td className="px-4 py-3">
                  <Checkbox
                    checked={selectedIds.includes(article.id)}
                    onCheckedChange={(checked) => handleSelectRow(article.id, checked as boolean)}
                  />
                </td>
                <td className="px-3 py-3">
                  <Link
                    href={`/knowledge/articles/${article.id}`}
                    className="font-mono text-xs font-medium text-[#0D3133] hover:underline"
                  >
                    {article.id}
                  </Link>
                </td>
                <td className="px-3 py-3">
                  <Link
                    href={`/knowledge/articles/${article.id}`}
                    className="line-clamp-1 text-sm font-medium text-[#0D3133] hover:underline"
                  >
                    {article.title}
                  </Link>
                </td>
                <td className="px-3 py-3">
                  <CategoryBadge category={article.category} />
                </td>
                <td className="px-3 py-3">
                  <ArticleStatusBadge status={article.status} />
                </td>
                <td className="px-3 py-3 text-xs text-muted-foreground">
                  {article.author}
                </td>
                <td className="px-3 py-3 text-xs text-muted-foreground">
                  {article.updatedAt}
                </td>
                <td className="px-3 py-3 text-right text-xs font-medium">
                  {article.usageCount.toLocaleString()}
                </td>
                <td className="px-3 py-3 text-right">
                  <span className="text-xs font-medium text-green-600">
                    {article.successRate}%
                  </span>
                </td>
                <td className="px-2 py-3">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 opacity-0 group-hover:opacity-100"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href={`/knowledge/articles/${article.id}`} className="gap-2">
                          <Eye className="h-3.5 w-3.5" />
                          View Article
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/knowledge/articles/${article.id}/edit`} className="gap-2">
                          <Edit className="h-3.5 w-3.5" />
                          Edit
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="gap-2">
                        <Copy className="h-3.5 w-3.5" />
                        Duplicate
                      </DropdownMenuItem>
                      <DropdownMenuItem className="gap-2">
                        <ExternalLink className="h-3.5 w-3.5" />
                        Copy Link
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="gap-2 text-red-600">
                        <Trash2 className="h-3.5 w-3.5" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
