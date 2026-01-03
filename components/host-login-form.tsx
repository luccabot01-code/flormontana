"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { EventSelectorDialog } from "@/components/event-selector-dialog"
import type { Event } from "@/lib/types"
import { verifyAndCreateSession } from "@/app/verify/actions"

export function HostLoginForm() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showEventSelector, setShowEventSelector] = useState(false)
  const [userEvents, setUserEvents] = useState<
    Pick<Event, "id" | "slug" | "title" | "event_type" | "date" | "cover_image_url">[]
  >([])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const supabase = createClient()

      const { data: events, error: queryError } = await supabase
        .from("events")
        .select("id, slug, title, event_type, date, cover_image_url")
        .eq("host_email", email)
        .eq("is_active", true)
        .order("created_at", { ascending: false })

      if (queryError) throw queryError

      if (!events || events.length === 0) {
        setError("No events found for this email address. Please create an event first.")
        setIsLoading(false)
        return
      }

      if (events.length === 1) {
        await verifyAndCreateSession(events[0].slug, email)
        // Redirect will be handled by the server action
      } else {
        setUserEvents(events)
        setShowEventSelector(true)
        setIsLoading(false)
      }
    } catch (err) {
      console.error("[v0] Host login error:", err)
      setError(err instanceof Error ? err.message : "Failed to login")
      setIsLoading(false)
    }
  }

  const handleEventSelect = async (slug: string) => {
    await verifyAndCreateSession(slug, email)
    // Redirect will be handled by the server action
  }

  const handleCloseEventSelector = () => {
    setShowEventSelector(false)
    setUserEvents([])
    setIsLoading(false)
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Access Your Dashboard</CardTitle>
          <CardDescription>Enter your email to manage your events</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="login-email">Your Email</Label>
              <Input
                id="login-email"
                type="email"
                name="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="sarah@example.com"
                inputMode="email"
              />
            </div>

            {error && <div className="rounded-lg bg-destructive/10 p-4 text-sm text-destructive">{error}</div>}

            <Button type="submit" size="lg" className="w-full" disabled={isLoading}>
              {isLoading ? "Checking..." : "Access Dashboard"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {showEventSelector && (
        <EventSelectorDialog
          open={showEventSelector}
          events={userEvents}
          email={email}
          onSelectEvent={handleEventSelect}
          onClose={handleCloseEventSelector}
        />
      )}
    </>
  )
}
