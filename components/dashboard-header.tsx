"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { RefreshCw, Calendar, MapPin, Pencil, Moon, Sun, Plus } from "lucide-react"
import { EVENT_TYPE_LABELS } from "@/lib/utils/event-helpers"
import { formatDate } from "@/lib/utils/event-helpers"
import type { Event } from "@/lib/types"
import { useState } from "react"
import Link from "next/link"
import { useTheme } from "next-themes"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"

interface DashboardHeaderProps {
  event: Event
}

export function DashboardHeader({ event }: DashboardHeaderProps) {
  const [isRefreshing, setIsRefreshing] = useState(false)
  const { theme, setTheme } = useTheme()

  const handleRefresh = () => {
    setIsRefreshing(true)
    window.location.reload()
  }

  return (
    <div className="flex items-start md:items-center justify-between gap-3 md:gap-4 pb-4 md:pb-6 border-b flex-wrap">
      <div className="flex items-start md:items-center gap-3 md:gap-4 lg:gap-6 flex-1 min-w-0 w-full md:w-auto flex-wrap">
        {/* Event Title & Type */}
        <div className="min-w-0 flex-shrink">
          <div className="flex items-center gap-2 md:gap-3 mb-1 flex-wrap">
            <h1 className="text-lg md:text-xl lg:text-2xl font-semibold tracking-tight truncate">{event.title}</h1>
            <Badge variant="secondary" className="flex-shrink-0 text-xs">
              {EVENT_TYPE_LABELS[event.event_type as keyof typeof EVENT_TYPE_LABELS]}
            </Badge>
          </div>
          <p className="text-xs md:text-sm text-muted-foreground">Event Dashboard</p>
        </div>

        <div className="hidden lg:flex items-center gap-6 text-sm text-muted-foreground flex-shrink-0">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>{formatDate(event.date)}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <span className="truncate max-w-[200px]">{event.location}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 flex-shrink-0">
        <TooltipProvider>
          <Tooltip delayDuration={200}>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                className="bg-transparent text-xs md:text-sm shadow-[0_0_35px_rgba(0,0,0,0.5)] hover:shadow-[0_0_45px_rgba(0,0,0,0.7)] dark:shadow-[0_0_35px_rgba(251,191,36,0.6)] dark:hover:shadow-[0_0_50px_rgba(251,191,36,0.8)] hover:scale-105 active:scale-95 transition-all duration-300"
                aria-label="Toggle theme"
              >
                <Sun className="h-3.5 w-3.5 md:h-4 md:w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-3.5 w-3.5 md:h-4 md:w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>Dark / Light</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <Button variant="outline" size="sm" className="bg-transparent text-xs md:text-sm" asChild>
          <Link href="/">
            <Plus className="h-3.5 w-3.5 md:h-4 md:w-4 md:mr-2" />
            <span className="hidden sm:inline">Create New Event</span>
          </Link>
        </Button>

        <Button variant="outline" size="sm" className="bg-transparent text-xs md:text-sm" asChild>
          <Link href={`/dashboard/${event.slug}/edit`}>
            <Pencil className="h-3.5 w-3.5 md:h-4 md:w-4 md:mr-2" />
            <span className="hidden sm:inline">Edit Event</span>
          </Link>
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="bg-transparent text-xs md:text-sm"
        >
          <RefreshCw className={`h-3.5 w-3.5 md:h-4 md:w-4 md:mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
          <span className="hidden sm:inline">Refresh</span>
        </Button>
      </div>
    </div>
  )
}
