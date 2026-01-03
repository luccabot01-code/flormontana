"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Copy, Download, Check, LinkIcon, QrCode } from "lucide-react"
import { QRCodeGenerator } from "@/components/qr-code-generator"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import type { Event, RSVP } from "@/lib/types"

interface DashboardActionsProps {
  event: Event
  rsvps: RSVP[]
}

export function DashboardActions({ event, rsvps }: DashboardActionsProps) {
  const [copied, setCopied] = useState(false)
  const [qrDialogOpen, setQrDialogOpen] = useState(false)
  const inviteUrl = `${typeof window !== "undefined" ? window.location.origin : ""}/rsvp/${event.slug}`

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(inviteUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("[v0] Failed to copy:", err)
    }
  }

  const handleExportCSV = () => {
    const validRsvps = rsvps.filter(
      (rsvp) => rsvp.attendance_status === "attending" || rsvp.attendance_status === "not_attending",
    )

    const headers = ["Name", "Status", "Guests", "Contact", "Message", "Submitted At"]
    const rows = validRsvps.map((rsvp) => [
      rsvp.guest_name,
      rsvp.attendance_status === "attending" ? "Attending" : "Not Attending",
      rsvp.number_of_guests,
      [rsvp.guest_email, rsvp.guest_phone].filter(Boolean).join(" | ") || "N/A",
      rsvp.message || "",
      new Date(rsvp.created_at).toLocaleString(),
    ])

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((row) => row.map((cell) => `"${cell}"`).join(","))].join("\n")

    const link = document.createElement("a")
    link.setAttribute("href", encodeURI(csvContent))
    link.setAttribute("download", `${event.slug}-rsvps.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const validRsvpCount = rsvps.filter(
    (rsvp) => rsvp.attendance_status === "attending" || rsvp.attendance_status === "not_attending",
  ).length

  return (
    <>
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Quick Actions</CardTitle>
          <CardDescription className="text-xs">Manage your event</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          {/* Copy Link Button */}
          <Button
            onClick={handleCopyLink}
            variant="outline"
            size="sm"
            className="w-full justify-start gap-2 h-auto py-2.5 px-3 bg-transparent"
          >
            {copied ? (
              <Check className="h-4 w-4 text-green-600" />
            ) : (
              <LinkIcon className="h-4 w-4 text-muted-foreground" />
            )}
            <span className="flex-1 text-left text-sm">{copied ? "Link Copied!" : "Copy Invitation Link"}</span>
            {!copied && <Copy className="h-3.5 w-3.5 text-muted-foreground" />}
          </Button>

          {/* QR Code Button */}
          <Button
            onClick={() => setQrDialogOpen(true)}
            variant="outline"
            size="sm"
            className="w-full justify-start gap-2 py-2.5 px-3"
          >
            <QrCode className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">View QR Code</span>
          </Button>

          {/* Export Button */}
          <Button
            onClick={handleExportCSV}
            variant="outline"
            size="sm"
            className="w-full justify-start gap-2 py-2.5 px-3 bg-transparent"
            disabled={validRsvpCount === 0}
          >
            <Download className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">Export Guest List</span>
          </Button>
        </CardContent>
      </Card>

      {/* QR Code Dialog */}
      <Dialog open={qrDialogOpen} onOpenChange={setQrDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>QR Code</DialogTitle>
          </DialogHeader>
          <div className="flex justify-center py-4">
            <QRCodeGenerator url={inviteUrl} title={event.title} compact />
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
