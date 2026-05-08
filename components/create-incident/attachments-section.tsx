"use client"

import { useState, useCallback } from "react"
import { cn } from "@/lib/utils"
import { Upload, File, X, Image, FileText, FileCode, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Attachment {
  id: string
  name: string
  size: number
  type: string
  progress: number
  status: "uploading" | "complete" | "error"
}

interface AttachmentsSectionProps {
  attachments: Attachment[]
  onAttachmentsChange: (attachments: Attachment[]) => void
}

export function AttachmentsSection({ attachments, onAttachmentsChange }: AttachmentsSectionProps) {
  const [isDragging, setIsDragging] = useState(false)

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    
    const files = Array.from(e.dataTransfer.files)
    handleFiles(files)
  }, [])

  const handleFiles = (files: File[]) => {
    const newAttachments: Attachment[] = files.map((file, idx) => ({
      id: `file-${Date.now()}-${idx}`,
      name: file.name,
      size: file.size,
      type: file.type,
      progress: 0,
      status: "uploading" as const,
    }))

    onAttachmentsChange([...attachments, ...newAttachments])

    // Simulate upload progress
    newAttachments.forEach((attachment) => {
      let progress = 0
      const interval = setInterval(() => {
        progress += Math.random() * 30
        if (progress >= 100) {
          progress = 100
          clearInterval(interval)
          onAttachmentsChange(prev => 
            prev.map(a => a.id === attachment.id ? { ...a, progress: 100, status: "complete" } : a)
          )
        } else {
          onAttachmentsChange(prev => 
            prev.map(a => a.id === attachment.id ? { ...a, progress } : a)
          )
        }
      }, 200)
    })
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(Array.from(e.target.files))
    }
  }

  const removeAttachment = (id: string) => {
    onAttachmentsChange(attachments.filter(a => a.id !== id))
  }

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }

  const getFileIcon = (type: string) => {
    if (type.startsWith("image/")) return Image
    if (type.includes("text") || type.includes("log")) return FileText
    if (type.includes("json") || type.includes("xml") || type.includes("code")) return FileCode
    return File
  }

  return (
    <div className="space-y-3">
      {/* Drop Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          "relative flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-6 transition-colors",
          isDragging
            ? "border-[#E69F50] bg-[#E69F50]/5"
            : "border-border hover:border-[#0D3133]/30"
        )}
      >
        <Upload className={cn(
          "mb-2 h-8 w-8",
          isDragging ? "text-[#E69F50]" : "text-muted-foreground"
        )} />
        <p className="text-sm font-medium">
          {isDragging ? "Drop files here" : "Drag & drop files here"}
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          or click to browse
        </p>
        <input
          type="file"
          multiple
          onChange={handleFileInput}
          className="absolute inset-0 cursor-pointer opacity-0"
        />
        <div className="mt-3 flex flex-wrap justify-center gap-1.5">
          <span className="rounded bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
            Logs
          </span>
          <span className="rounded bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
            Screenshots
          </span>
          <span className="rounded bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
            Documents
          </span>
          <span className="rounded bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
            Error Exports
          </span>
        </div>
      </div>

      {/* Attachment List */}
      {attachments.length > 0 && (
        <div className="space-y-2">
          {attachments.map((attachment) => {
            const Icon = getFileIcon(attachment.type)
            
            return (
              <div
                key={attachment.id}
                className="flex items-center gap-3 rounded-lg border border-border p-2.5"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted">
                  <Icon className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="truncate text-sm font-medium">{attachment.name}</p>
                    <span className="shrink-0 text-xs text-muted-foreground">
                      {formatFileSize(attachment.size)}
                    </span>
                  </div>
                  {attachment.status === "uploading" && (
                    <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full rounded-full bg-[#E69F50] transition-all"
                        style={{ width: `${attachment.progress}%` }}
                      />
                    </div>
                  )}
                  {attachment.status === "complete" && (
                    <p className="mt-0.5 text-xs text-green-600">Upload complete</p>
                  )}
                  {attachment.status === "error" && (
                    <p className="mt-0.5 text-xs text-destructive">Upload failed</p>
                  )}
                </div>
                {attachment.status === "uploading" ? (
                  <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                ) : (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 shrink-0"
                    onClick={() => removeAttachment(attachment.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
