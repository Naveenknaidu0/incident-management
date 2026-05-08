"use client"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { ArticleStatusBadge } from "./article-status-badge"
import { CategoryBadge } from "./category-badge"
import { Eye, ThumbsUp, Clock, User } from "lucide-react"

interface ArticleCardProps {
  id: string
  title: string
  summary: string
  category: "network" | "infrastructure" | "email" | "cloud" | "vpn" | "security" | "database" | "applications"
  status: "draft" | "review" | "published" | "archived" | "deprecated"
  author: string
  updatedAt: string
  views: number
  successRate: number
}

export function ArticleCard({
  id,
  title,
  summary,
  category,
  status,
  author,
  updatedAt,
  views,
  successRate,
}: ArticleCardProps) {
  return (
    <Link href={`/knowledge/articles/${id}`}>
      <Card className="h-full transition-all hover:border-[#E69F50]/50 hover:shadow-sm">
        <CardContent className="p-4">
          <div className="flex items-start justify-between gap-2">
            <CategoryBadge category={category} />
            <ArticleStatusBadge status={status} />
          </div>
          <h3 className="mt-3 line-clamp-2 text-sm font-semibold text-[#0D3133]">
            {title}
          </h3>
          <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
            {summary}
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <User className="h-3 w-3" />
              {author}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {updatedAt}
            </span>
          </div>
          <div className="mt-2 flex items-center gap-4 border-t border-border pt-2 text-xs">
            <span className="flex items-center gap-1 text-muted-foreground">
              <Eye className="h-3 w-3" />
              {views.toLocaleString()}
            </span>
            <span className="flex items-center gap-1 text-green-600">
              <ThumbsUp className="h-3 w-3" />
              {successRate}% success
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
