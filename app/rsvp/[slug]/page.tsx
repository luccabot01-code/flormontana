import { notFound } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { RSVPForm } from "@/components/rsvp-form"
import { Card, CardContent } from "@/components/ui/card"
import { AddToCalendarButton } from "@/components/add-to-calendar-button"
import { RSVPHeader } from "@/components/rsvp-header"
import { Calendar, MapPin } from "lucide-react"
import { formatDate, EVENT_TYPE_LABELS } from "@/lib/utils/event-helpers"
import type { Event } from "@/lib/types"
import type { Metadata } from "next"

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const supabase = await createClient()

  const { data: event } = await supabase
    .from("events")
    .select("title, event_type, cover_image_url")
    .eq("slug", slug)
    .eq("is_active", true)
    .single()

  if (!event) {
    return {
      title: "Event Not Found",
    }
  }

  return {
    title: `RSVP - ${event.title}`,
    description: `You're invited to ${event.title}. Please RSVP to let us know if you can attend.`,
    openGraph: {
      title: `RSVP - ${event.title}`,
      description: `You're invited! Please RSVP for ${event.title}`,
      images: event.cover_image_url ? [{ url: event.cover_image_url }] : [],
    },
    robots: {
      index: false,
      follow: false,
    },
  }
}

export default async function RSVPPage({ params }: PageProps) {
  const { slug } = await params
  const supabase = await createClient()

  const { data: event, error } = await supabase
    .from("events")
    .select("*")
    .eq("slug", slug)
    .eq("is_active", true)
    .single()

  if (error || !event) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <main className="container mx-auto px-4 py-12" role="main">
        <article className="mx-auto max-w-2xl space-y-8">
          <RSVPHeader />

          {/* Event Header */}
          <header className="text-center space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium">
              {EVENT_TYPE_LABELS[event.event_type as keyof typeof EVENT_TYPE_LABELS]}
            </div>
            <h1 className="text-5xl font-bold tracking-tight text-balance">{event.title}</h1>
            <p className="text-xl text-muted-foreground">You're invited!</p>
          </header>

          {event.cover_image_url && (
            <figure className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-75">
              <div className="relative w-full rounded-xl overflow-hidden shadow-lg">
                <img
                  src={event.cover_image_url || "/placeholder.svg"}
                  alt={`${event.title} event cover image`}
                  className="w-full h-auto object-contain max-h-[600px] bg-muted"
                  loading="eager"
                  fetchPriority="high"
                />
              </div>
            </figure>
          )}

          <section
            aria-label="Event details"
            className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100"
          >
            <Card>
              <CardContent className="pt-6 space-y-6">
                <div className="flex items-start gap-4">
                  <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" aria-hidden="true" />
                  <div className="flex-1">
                    <p className="font-semibold mb-2">Date & Time</p>
                    <time dateTime={event.date} className="text-muted-foreground block mb-3">
                      {formatDate(event.date)}
                    </time>
                    <AddToCalendarButton
                      event={{
                        title: event.title,
                        description: event.program_notes,
                        location: event.location,
                        startDate: event.date,
                      }}
                    />
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" aria-hidden="true" />
                  <div className="flex-1">
                    <p className="font-semibold mb-2">Location</p>
                    <address className="text-muted-foreground not-italic mb-3">{event.location}</address>
                    {event.location_url && (
                      <a
                        href={event.location_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 h-10 px-6 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-all duration-200 font-medium text-sm border border-primary/20 hover:border-primary/30 hover:shadow-md active:scale-[0.98]"
                        aria-label={`View ${event.location} on map`}
                      >
                        <MapPin className="h-4 w-4" aria-hidden="true" />
                        View on Map
                      </a>
                    )}
                  </div>
                </div>

                {event.dress_code && (
                  <div className="flex items-start gap-4">
                    <div
                      className="h-5 w-5 flex items-center justify-center text-muted-foreground mt-0.5"
                      aria-hidden="true"
                    >
                      👔
                    </div>
                    <div>
                      <p className="font-semibold">Dress Code</p>
                      <p className="text-muted-foreground">{event.dress_code}</p>
                    </div>
                  </div>
                )}

                {event.program_notes && (
                  <div className="pt-4 border-t">
                    <p className="font-semibold mb-2">Event Details</p>
                    <p className="text-muted-foreground whitespace-pre-wrap leading-relaxed">{event.program_notes}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </section>

          <section
            aria-labelledby="rsvp-heading"
            className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200"
          >
            <h2 id="rsvp-heading" className="text-3xl font-semibold mb-6 text-center">
              RSVP
            </h2>
            <RSVPForm event={event as Event} />
          </section>
        </article>
      </main>
    </div>
  )
}
