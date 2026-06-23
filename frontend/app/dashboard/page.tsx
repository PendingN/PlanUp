"use client"

import { useState } from "react"
import { PanelLeft, MessageSquare, ClipboardList } from "lucide-react"
import { TripSidebar } from "@/components/dashboard/trip-sidebar"
import { ChatPanel } from "@/components/dashboard/chat-panel"
import { PlanSidebar } from "@/components/dashboard/plan-sidebar"
import { cn } from "@/lib/utils"

type MobileView = "trip" | "chat" | "plan"

const tabs: { id: MobileView; label: string; icon: React.ElementType }[] = [
  { id: "trip", label: "Chuyến đi", icon: PanelLeft },
  { id: "chat", label: "Trò chuyện", icon: MessageSquare },
  { id: "plan", label: "Kế hoạch", icon: ClipboardList },
]

export default function DashboardPage() {
  const [view, setView] = useState<MobileView>("chat")

  return (
    <div className="flex h-dvh flex-col bg-background">
      {/* desktop: three columns */}
      <div className="hidden flex-1 overflow-hidden lg:grid lg:grid-cols-[320px_1fr_360px] xl:grid-cols-[340px_1fr_400px]">
        <TripSidebar />
        <ChatPanel />
        <PlanSidebar />
      </div>

      {/* mobile / tablet: single column with tab switcher */}
      <div className="flex flex-1 flex-col overflow-hidden lg:hidden">
        <div className="flex-1 overflow-hidden">
          {view === "trip" && <TripSidebar />}
          {view === "chat" && <ChatPanel />}
          {view === "plan" && <PlanSidebar />}
        </div>
        <nav className="grid grid-cols-3 border-t border-border bg-card">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setView(tab.id)}
              className={cn(
                "flex flex-col items-center gap-1 py-3 text-xs font-medium transition-colors",
                view === tab.id
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              <tab.icon className="h-5 w-5" />
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
    </div>
  )
}
