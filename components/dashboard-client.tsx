"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { DashboardStats } from "@/components/dashboard-stats"
import { RSVPTable } from "@/components/rsvp-table"
import { DashboardActions } from "@/components/dashboard-actions"
import { DashboardHeader } from "@/components/dashboard-header"
import type { Event, RSVP } from "@/lib/types"

interface DashboardClientProps {
  initialEvent: Event
  slug: string
  eventId: string
}

export function DashboardClient({ initialEvent, slug, eventId }: DashboardClientProps) {
  const [event] = useState<Event>(initialEvent)
  const [rsvps, setRsvps] = useState<RSVP[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        document.body.style.overflow = "hidden"
      } else {
        document.body.style.overflow = ""
      }
    }

    // Set initial state
    handleResize()

    // Listen for window resize
    window.addEventListener("resize", handleResize)

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = ""
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  useEffect(() => {
    const fetchRsvps = async () => {
      const supabase = createClient()

      const { data, error } = await supabase
        .from("rsvps")
        .select("*")
        .eq("event_id", eventId)
        .in("attendance_status", ["attending", "not_attending"])
        .order("created_at", { ascending: false })

      if (error) {
        console.error("[v0] Dashboard - Error fetching RSVPs:", error)
      } else {
        console.log("[v0] Dashboard - Fetched RSVPs:", {
          count: data.length,
          event_id: eventId,
          data: data,
        })
        setRsvps(data as RSVP[])
      }

      setIsLoading(false)
    }

    fetchRsvps()
  }, [eventId])

  useEffect(() => {
    const supabase = createClient()

    console.log("[v0] Dashboard - Setting up Realtime for event_id:", eventId)

    const channel = supabase
      .channel(`rsvps-${eventId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "rsvps",
          filter: `event_id=eq.${eventId}`,
        },
        (payload) => {
          console.log("[v0] Dashboard - Realtime INSERT:", payload.new)
          const newRsvp = payload.new as RSVP
          if (newRsvp.attendance_status === "attending" || newRsvp.attendance_status === "not_attending") {
            setRsvps((current) => {
              const updated = [newRsvp, ...current]
              console.log("[v0] Dashboard - State updated, new count:", updated.length)
              return updated
            })
          }
        },
      )
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "rsvps",
          filter: `event_id=eq.${eventId}`,
        },
        (payload) => {
          console.log("[v0] Dashboard - Realtime UPDATE:", payload.new)
          const updatedRsvp = payload.new as RSVP
          setRsvps((current) => current.map((rsvp) => (rsvp.id === updatedRsvp.id ? updatedRsvp : rsvp)))
        },
      )
      .on(
        "postgres_changes",
        {
          event: "DELETE",
          schema: "public",
          table: "rsvps",
          filter: `event_id=eq.${eventId}`,
        },
        (payload) => {
          console.log("[v0] Dashboard - Realtime DELETE:", payload.old)
          setRsvps((current) => current.filter((rsvp) => rsvp.id !== (payload.old as RSVP).id))
        },
      )
      .subscribe((status) => {
        console.log("[v0] Dashboard - Subscription status:", status)
      })

    return () => {
      console.log("[v0] Dashboard - Cleaning up subscription")
      supabase.removeChannel(channel)
    }
  }, [eventId])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading dashboard...</p>
      </div>
    )
  }

  return (
    <div
      data-dashboard="true"
      className="min-h-screen lg:h-screen bg-background overflow-x-hidden overflow-y-auto lg:overflow-hidden flex flex-col"
    >
      <div className="w-full mx-auto px-4 md:px-6 py-4 md:py-4 max-w-[1600px] flex-1 flex flex-col lg:overflow-hidden">
        <DashboardHeader event={event} />

        <div className="mt-6 md:mt-4 flex flex-col lg:grid lg:grid-cols-[1fr_400px] gap-6 md:gap-4 lg:gap-6 flex-1 lg:overflow-hidden">
          <div className="flex flex-col gap-6 md:gap-4 lg:gap-6 lg:overflow-hidden">
            <DashboardStats rsvps={rsvps} />

            <div className="flex-1 lg:overflow-hidden">
              <RSVPTable rsvps={rsvps} eventId={event.id} slug={slug} />
            </div>
          </div>

          <div className="space-y-6 md:space-y-4 lg:space-y-6 lg:order-none order-first lg:overflow-y-auto">
            <DashboardActions event={event} rsvps={rsvps} />

            {event.cover_image_url && (
              <div className="rounded-lg overflow-hidden border bg-muted">
                <img
                  src={event.cover_image_url || "/placeholder.svg"}
                  alt={event.title}
                  className="w-full aspect-video object-cover"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
