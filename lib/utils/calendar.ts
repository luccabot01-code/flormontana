export interface CalendarEvent {
  title: string
  description?: string
  location: string
  startDate: string
  endDate?: string
}

export function generateICSFile(event: CalendarEvent): string {
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString)
    return date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z"
  }

  const startDate = formatDate(event.startDate)
  // Default end date is 2 hours after start if not provided
  const endDate = event.endDate
    ? formatDate(event.endDate)
    : formatDate(new Date(new Date(event.startDate).getTime() + 2 * 60 * 60 * 1000).toISOString())

  const icsContent = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//RSVP Platform//Event Calendar//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `DTSTART:${startDate}`,
    `DTEND:${endDate}`,
    `SUMMARY:${event.title}`,
    event.description ? `DESCRIPTION:${event.description.replace(/\n/g, "\\n")}` : "",
    `LOCATION:${event.location}`,
    "STATUS:CONFIRMED",
    "BEGIN:VALARM",
    "TRIGGER:-PT1H",
    "ACTION:DISPLAY",
    "DESCRIPTION:Event reminder",
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  ]
    .filter(Boolean)
    .join("\r\n")

  return icsContent
}

export function downloadICSFile(event: CalendarEvent): void {
  const icsContent = generateICSFile(event)
  const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" })
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = url
  link.download = `${event.title.replace(/\s+/g, "_")}.ics`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

export function getCalendarUrl(event: CalendarEvent): string {
  // For mobile devices, use native calendar protocol
  if (typeof window !== "undefined" && /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
    const icsContent = generateICSFile(event)
    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" })
    return URL.createObjectURL(blob)
  }

  // For desktop, return empty string (will trigger download instead)
  return ""
}
