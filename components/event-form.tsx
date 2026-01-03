"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { EVENT_TYPE_LABELS, generateSlug, formatDate } from "@/lib/utils/event-helpers"
import type { CreateEventInput, EventType } from "@/lib/types"
import { Upload, X, Eye, Calendar, MapPin } from "lucide-react"
import { RSVPForm } from "@/components/rsvp-form"

export function EventForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [photoPreview, setPhotoPreview] = useState<string | null>(null)
  const [photoUrl, setPhotoUrl] = useState<string | null>(null)
  const [showPreview, setShowPreview] = useState(false)

  const [formData, setFormData] = useState<CreateEventInput>({
    event_type: "wedding",
    title: "",
    date: "",
    location: "",
    location_url: "",
    dress_code: "",
    program_notes: "",
    allow_plusone: true,
    require_meal_choice: false,
    meal_options: [],
    custom_attendance_options: ["attending", "not_attending"],
    theme_color: "#000000",
    host_name: "",
    host_email: "",
  })

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith("image/")) {
      setError("Please select an image file")
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Image must be less than 5MB")
      return
    }

    setIsUploading(true)
    setError(null)

    try {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string)
      }
      reader.readAsDataURL(file)

      const formData = new FormData()
      formData.append("file", file)

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Upload failed")
      }

      const data = await response.json()
      setPhotoUrl(data.url)
      console.log("[v0] Photo uploaded successfully:", data.url)
    } catch (err) {
      console.error("[v0] Photo upload error:", err)
      setError(err instanceof Error ? err.message : "Failed to upload photo")
      setPhotoPreview(null)
    } finally {
      setIsUploading(false)
    }
  }

  const handleRemovePhoto = () => {
    setPhotoPreview(null)
    setPhotoUrl(null)
  }

  const handlePreview = () => {
    if (!formData.title || !formData.date || !formData.location || !formData.host_name || !formData.host_email) {
      setError("Please fill in all required fields before previewing")
      return
    }
    setError(null)
    setShowPreview(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const supabase = createClient()

      const slug = generateSlug(formData.title)

      const insertData = {
        event_type: formData.event_type,
        title: formData.title,
        date: formData.date ? new Date(formData.date).toISOString() : null,
        location: formData.location,
        location_url: formData.location_url || null,
        dress_code: formData.dress_code || null,
        program_notes: formData.program_notes || null,
        allow_plusone: formData.allow_plusone,
        require_meal_choice: formData.require_meal_choice,
        meal_options: formData.meal_options?.filter(Boolean) || [],
        custom_attendance_options: formData.custom_attendance_options,
        theme_color: formData.theme_color,
        cover_image_url: photoUrl || null,
        host_name: formData.host_name,
        host_email: formData.host_email,
        slug,
      }

      console.log("[v0] Inserting event with data:", insertData)

      const { data, error: insertError } = await supabase.from("events").insert([insertData]).select().single()

      if (insertError) {
        console.error("[v0] Supabase insert error:", insertError)
        throw insertError
      }

      console.log("[v0] Event created successfully:", data)

      router.push(`/dashboard/${slug}?email=${encodeURIComponent(formData.host_email)}`)
    } catch (err) {
      console.error("[v0] Event creation error:", err)
      setError(err instanceof Error ? err.message : "Failed to create event")
    } finally {
      setIsLoading(false)
    }
  }

  if (showPreview) {
    const previewEvent = {
      id: "preview",
      slug: "preview",
      event_type: formData.event_type,
      title: formData.title,
      date: formData.date ? new Date(formData.date).toISOString() : new Date().toISOString(),
      location: formData.location,
      location_url: formData.location_url,
      dress_code: formData.dress_code,
      program_notes: formData.program_notes,
      cover_image_url: photoUrl,
      allow_plusone: formData.allow_plusone,
      require_meal_choice: formData.require_meal_choice,
      meal_options: formData.meal_options,
      custom_attendance_options: formData.custom_attendance_options,
      theme_color: formData.theme_color,
      host_name: formData.host_name,
      host_email: formData.host_email,
      is_active: true,
      created_at: new Date().toISOString(),
    }

    return (
      <div className="fixed inset-0 bg-background z-50 overflow-y-auto">
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
          <div className="container mx-auto px-4 py-12">
            <div className="mx-auto max-w-2xl space-y-8">
              {/* Preview Header */}
              <div className="flex items-center justify-between">
                <div className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium">
                  Preview Mode
                </div>
                <Button variant="outline" onClick={() => setShowPreview(false)}>
                  <X className="h-4 w-4 mr-2" />
                  Close Preview
                </Button>
              </div>

              {/* Event Header */}
              <div className="text-center space-y-4">
                <div className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium">
                  {EVENT_TYPE_LABELS[formData.event_type as keyof typeof EVENT_TYPE_LABELS]}
                </div>
                <h1 className="text-5xl font-bold tracking-tight text-balance">{formData.title}</h1>
                <p className="text-xl text-muted-foreground">You're invited!</p>
              </div>

              {photoPreview && (
                <div className="relative w-full rounded-xl overflow-hidden shadow-lg">
                  <img
                    src={photoPreview || "/placeholder.svg"}
                    alt={formData.title}
                    className="w-full h-auto object-contain max-h-[600px] bg-muted"
                  />
                </div>
              )}

              {/* Event Details Card */}
              <Card>
                <CardContent className="pt-6 space-y-6">
                  <div className="flex items-start gap-4">
                    <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="font-semibold">Date & Time</p>
                      <p className="text-muted-foreground">
                        {formData.date ? formatDate(new Date(formData.date).toISOString()) : "Not specified"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div className="flex-1">
                      <p className="font-semibold">Location</p>
                      <p className="text-muted-foreground">{formData.location}</p>
                      {formData.location_url && (
                        <a
                          href={formData.location_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline text-sm mt-1 inline-block"
                        >
                          View on map →
                        </a>
                      )}
                    </div>
                  </div>

                  {formData.dress_code && (
                    <div className="flex items-start gap-4">
                      <div className="h-5 w-5 flex items-center justify-center text-muted-foreground mt-0.5">👔</div>
                      <div>
                        <p className="font-semibold">Dress Code</p>
                        <p className="text-muted-foreground">{formData.dress_code}</p>
                      </div>
                    </div>
                  )}

                  {formData.program_notes && (
                    <div className="pt-4 border-t">
                      <p className="font-semibold mb-2">Event Details</p>
                      <p className="text-muted-foreground whitespace-pre-wrap leading-relaxed">
                        {formData.program_notes}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* RSVP Form Preview */}
              <div>
                <h2 className="text-3xl font-semibold mb-6 text-center">RSVP</h2>
                <RSVPForm event={previewEvent as any} isPreview />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setShowPreview(false)}>
                  Back to Edit
                </Button>
                <Button className="flex-1" onClick={handleSubmit} disabled={isLoading}>
                  {isLoading ? "Creating Event..." : "Create Event"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in">
      <Card className="hover-lift">
        <CardHeader>
          <CardTitle>Event Details</CardTitle>
          <CardDescription>Basic information about your event</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="event_type">Event Type</Label>
            <Select
              value={formData.event_type}
              onValueChange={(value) => setFormData({ ...formData, event_type: value as EventType })}
            >
              <SelectTrigger id="event_type">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(EVENT_TYPE_LABELS).map(([value, label]) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Event Title</Label>
            <Input
              id="title"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Sarah & John's Wedding"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="photo">Event Photo (Optional)</Label>
            <div className="space-y-4">
              {!photoPreview ? (
                <div className="relative">
                  <Input
                    id="photo"
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    disabled={isUploading}
                    className="hidden"
                  />
                  <Label
                    htmlFor="photo"
                    className="flex items-center justify-center gap-2 h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
                  >
                    {isUploading ? (
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                        <span>Uploading...</span>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-2 text-muted-foreground">
                        <Upload className="h-8 w-8" />
                        <span className="text-sm">Click to upload photo</span>
                        <span className="text-xs">Max 5MB</span>
                      </div>
                    )}
                  </Label>
                </div>
              ) : (
                <div className="relative rounded-lg overflow-hidden border">
                  <img
                    src={photoPreview || "/placeholder.svg"}
                    alt="Event preview"
                    className="w-full h-auto object-contain max-h-96 bg-muted"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={handleRemovePhoto}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="date">Date & Time</Label>
              <Input
                id="date"
                type="datetime-local"
                required
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              required
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              placeholder="Grand Hotel Ballroom, 123 Main St"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location_url">Location URL (Optional)</Label>
            <Input
              id="location_url"
              type="url"
              value={formData.location_url}
              onChange={(e) => setFormData({ ...formData, location_url: e.target.value })}
              placeholder="https://maps.google.com/..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="dress_code">Dress Code (Optional)</Label>
            <Input
              id="dress_code"
              value={formData.dress_code}
              onChange={(e) => setFormData({ ...formData, dress_code: e.target.value })}
              placeholder="Formal / Black Tie / Casual"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="program_notes">Program / Notes (Optional)</Label>
            <Textarea
              id="program_notes"
              value={formData.program_notes}
              onChange={(e) => setFormData({ ...formData, program_notes: e.target.value })}
              placeholder="Ceremony starts at 4 PM, followed by cocktail hour..."
              rows={4}
            />
          </div>
        </CardContent>
      </Card>

      <Card className="hover-lift">
        <CardHeader>
          <CardTitle>Host Information</CardTitle>
          <CardDescription>Your contact details to manage the event</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="host_name">Your Name</Label>
            <Input
              id="host_name"
              name="name"
              type="text"
              autoComplete="name"
              required
              value={formData.host_name}
              onChange={(e) => setFormData({ ...formData, host_name: e.target.value })}
              placeholder="Sarah Johnson"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="host_email">Your Email</Label>
            <Input
              id="host_email"
              name="email"
              type="email"
              autoComplete="email"
              inputMode="email"
              required
              value={formData.host_email}
              onChange={(e) => setFormData({ ...formData, host_email: e.target.value })}
              placeholder="sarah@example.com"
            />
            <p className="text-sm text-muted-foreground">Used to access your event dashboard</p>
          </div>
        </CardContent>
      </Card>

      {error && (
        <div className="rounded-lg bg-destructive/10 p-4 text-sm text-destructive animate-scale-in">{error}</div>
      )}

      <div className="space-y-3">
        <Button
          type="button"
          variant="outline"
          size="lg"
          className="w-full bg-transparent hover-scale"
          onClick={handlePreview}
        >
          <Eye className="h-4 w-4 mr-2" />
          Preview RSVP Form
        </Button>
        <Button type="submit" size="lg" className="w-full hover-scale" disabled={isLoading}>
          {isLoading ? (
            <>
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent mr-2" />
              Creating Event...
            </>
          ) : (
            "Create Event"
          )}
        </Button>
      </div>
    </form>
  )
}
