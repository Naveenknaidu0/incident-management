"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Plus, AlertTriangle, FileText, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { QuickCreateModal } from "./quick-create-modal"

interface FloatingCreateButtonProps {
  className?: string
}

export function FloatingCreateButton({ className }: FloatingCreateButtonProps) {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [quickCreateOpen, setQuickCreateOpen] = useState(false)

  const handleQuickCreate = () => {
    setIsOpen(false)
    setQuickCreateOpen(true)
  }

  const handleFullForm = () => {
    setIsOpen(false)
    router.push("/incidents/create")
  }

  return (
    <>
      <div className={cn("fixed bottom-6 right-6 z-50", className)}>
        {/* Expanded Options */}
        {isOpen && (
          <div className="absolute bottom-16 right-0 flex flex-col gap-2">
            <Button
              size="sm"
              variant="secondary"
              className="shadow-lg"
              onClick={handleFullForm}
            >
              <FileText className="mr-2 h-4 w-4" />
              Full Form
            </Button>
            <Button
              size="sm"
              className="bg-[#0D3133] text-white shadow-lg hover:bg-[#0D3133]/90"
              onClick={handleQuickCreate}
            >
              <AlertTriangle className="mr-2 h-4 w-4" />
              Quick Create
            </Button>
          </div>
        )}

        {/* Main FAB */}
        <Button
          size="lg"
          className={cn(
            "h-14 w-14 rounded-full shadow-lg transition-transform",
            isOpen 
              ? "bg-muted text-foreground hover:bg-muted/90 rotate-45" 
              : "bg-[#E69F50] text-[#0D3133] hover:bg-[#E69F50]/90"
          )}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Plus className="h-6 w-6" />
          )}
        </Button>
      </div>

      <QuickCreateModal open={quickCreateOpen} onOpenChange={setQuickCreateOpen} />
    </>
  )
}
