import type { EventType } from "@/lib/types"

export const EVENT_TYPE_LABELS: Record<EventType, string> = {
  wedding: "Wedding",
  engagement: "Engagement",
  birthday: "Birthday Party",
  baby_shower: "Baby Shower",
  bridal_shower: "Bridal Shower",
  corporate: "Corporate Event",
  anniversary: "Anniversary",
  graduation: "Graduation",
  custom: "Custom Event",
}

export const EVENT_TYPE_ICONS: Record<EventType, string> = {
  wedding: "💒",
  engagement: "💍",
  birthday: "🎂",
  baby_shower: "🍼",
  bridal_shower: "👰",
  corporate: "🏢",
  anniversary: "🎊",
  graduation: "🎓",
  custom: "🎉",
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date)
}

export function formatShortDate(dateString: string): string {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date)
}

export function isRSVPOpen(event: {
  rsvp_deadline?: string
  is_active: boolean
}): boolean {
  if (!event.is_active) {
    console.log("[v0] RSVP closed: event is not active")
    return false
  }

  if (!event.rsvp_deadline) {
    console.log("[v0] RSVP open: no deadline set")
    return true
  }

  const now = new Date()
  const deadline = new Date(event.rsvp_deadline)
  const isOpen = deadline > now

  console.log("[v0] RSVP check:", {
    now: now.toISOString(),
    deadline: deadline.toISOString(),
    isOpen,
  })

  return isOpen
}

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .concat("-", Math.random().toString(36).substring(2, 10))
}
