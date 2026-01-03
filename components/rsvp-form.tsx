"use client"

import type React from "react"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle2 } from "lucide-react"
import type { Event, CreateRSVPInput } from "@/lib/types"

interface RSVPFormProps {
  event: Event
  isPreview?: boolean
}

export function RSVPForm({ event, isPreview = false }: RSVPFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState<Omit<CreateRSVPInput, "event_id">>({
    guest_name: "",
    guest_email: "",
    guest_phone: "",
    attendance_status: "attending",
    number_of_guests: 1,
    has_plusone: false,
    plusone_name: "",
    meal_choices: [],
    message: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (isPreview) {
      setIsSubmitted(true)
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const supabase = createClient()

      const ip_address = "unknown"
      const user_agent = navigator.userAgent

      const rsvpData = {
        event_id: event.id,
        ...formData,
        ip_address,
        user_agent,
      }

      console.log("[v0] RSVP Form - Submitting data:", {
        event_id: event.id,
        guest_name: formData.guest_name,
        attendance_status: formData.attendance_status,
        number_of_guests: formData.number_of_guests,
      })

      const { data, error: insertError } = await supabase.from("rsvps").insert([rsvpData]).select()

      if (insertError) {
        console.error("[v0] RSVP Form - Insert error:", insertError)
        throw insertError
      }

      console.log("[v0] RSVP Form - Successfully inserted:", data)
      console.log("[v0] RSVP Form - Total guests added:", formData.number_of_guests)

      setIsSubmitted(true)
    } catch (err) {
      console.error("[v0] RSVP Form - Submission error:", err)
      setError(err instanceof Error ? err.message : "Failed to submit RSVP")
    } finally {
      setIsLoading(false)
    }
  }

  if (isSubmitted) {
    return (
      <Card className="bg-card border-border">
        <CardContent className="flex flex-col items-center justify-center py-12 text-center space-y-4">
          <div className="rounded-full bg-green-100 p-3">
            <CheckCircle2 className="h-12 w-12 text-green-600" />
          </div>
          <h3 className="text-2xl font-semibold">Thank You!</h3>
          <p className="text-muted-foreground max-w-md">
            {isPreview
              ? "This is how guests will see the confirmation message after submitting their RSVP."
              : "Your RSVP has been received. We look forward to seeing you at the event!"}
          </p>
          {!isPreview && (
            <Button
              onClick={() => {
                setIsSubmitted(false)
                setFormData({
                  guest_name: "",
                  guest_email: "",
                  guest_phone: "",
                  attendance_status: "attending",
                  number_of_guests: 1,
                  has_plusone: false,
                  plusone_name: "",
                  meal_choices: [],
                  message: "",
                })
              }}
              variant="outline"
              className="mt-4"
            >
              Submit Another Response
            </Button>
          )}
        </CardContent>
      </Card>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardContent className="pt-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="guest_name">Your Name *</Label>
            <Input
              id="guest_name"
              required
              value={formData.guest_name}
              onChange={(e) => setFormData({ ...formData, guest_name: e.target.value })}
              placeholder="John Doe"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="guest_email">Email</Label>
              <Input
                id="guest_email"
                type="email"
                value={formData.guest_email}
                onChange={(e) => setFormData({ ...formData, guest_email: e.target.value })}
                placeholder="john@example.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="guest_phone">Phone</Label>
              <Input
                id="guest_phone"
                type="tel"
                value={formData.guest_phone}
                onChange={(e) => setFormData({ ...formData, guest_phone: e.target.value })}
                placeholder="+1 (555) 123-4567"
              />
            </div>
          </div>

          <div className="space-y-3">
            <Label>Will you be attending? *</Label>
            <RadioGroup
              value={formData.attendance_status}
              onValueChange={(value) =>
                setFormData({ ...formData, attendance_status: value as "attending" | "not_attending" })
              }
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="attending" id="attending" />
                <Label htmlFor="attending" className="font-normal cursor-pointer">
                  Attending
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="not_attending" id="not_attending" />
                <Label htmlFor="not_attending" className="font-normal cursor-pointer">
                  Not Attending
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="number_of_guests">Number of Guests *</Label>
            <Input
              id="number_of_guests"
              type="number"
              min="1"
              max="10"
              required
              value={formData.number_of_guests}
              onChange={(e) => setFormData({ ...formData, number_of_guests: Number.parseInt(e.target.value) || 1 })}
            />
            <p className="text-sm text-muted-foreground">Include yourself and any additional guests</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Message to Host (Optional)</Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Any special notes or dietary restrictions..."
              rows={4}
            />
          </div>
        </CardContent>
      </Card>

      {error && <div className="rounded-lg bg-destructive/10 p-4 text-sm text-destructive">{error}</div>}

      <Button type="submit" size="lg" className="w-full" disabled={isLoading}>
        {isLoading ? "Submitting..." : "Submit RSVP"}
      </Button>
    </form>
  )
}
