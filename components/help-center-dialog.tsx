"use client"

import { useState } from "react"
import { HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"

export function HelpCenterDialog() {
  const [open, setOpen] = useState(false)

  return (
    <TooltipProvider>
      <Dialog open={open} onOpenChange={setOpen}>
        <Tooltip delayDuration={200}>
          <TooltipTrigger asChild>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="fixed top-6 left-6 z-50 h-16 w-16 rounded-full transition-all duration-300 hover:scale-110 active:scale-95 bg-background border-2"
                aria-label="Help Center"
              >
                <HelpCircle className="h-8 w-8" />
              </Button>
            </DialogTrigger>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p>Help Center</p>
          </TooltipContent>
        </Tooltip>
        <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col overflow-hidden">
          <DialogHeader className="px-6 pt-6 pb-4 border-b shrink-0">
            <DialogTitle className="text-2xl font-bold pr-10">Universal RSVP Platform – Help Center</DialogTitle>
            <p className="text-sm text-muted-foreground mt-2 pr-10">
              A modern web application offering professional invitation and RSVP management for all types of events.
            </p>
          </DialogHeader>
          <div className="flex-1 overflow-y-auto px-6 py-4 select-text">
            <div className="space-y-8 pb-8">
              {/* Quick Start */}
              <section>
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <span className="text-xl">🚀</span>
                  QUICK START
                </h3>
                <ul className="space-y-2 ml-8 list-disc text-sm text-muted-foreground">
                  <li>Fill out event details from the "Create New Event" tab</li>
                  <li>Create your event with "Create Event"</li>
                  <li>Share the RSVP link with your guests</li>
                  <li>Track responses in real-time from the Dashboard</li>
                </ul>
              </section>

              {/* Creating an Event */}
              <section>
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <span className="text-xl">📝</span>
                  CREATING AN EVENT
                </h3>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium text-sm mb-2">Required Fields:</h4>
                    <ul className="ml-6 list-disc text-sm text-muted-foreground space-y-1">
                      <li>Event Type (Wedding, Birthday, Business Event, etc.)</li>
                      <li>Event Name</li>
                      <li>Event Date & Time</li>
                      <li>Location</li>
                      <li>Host Name</li>
                      <li>Host Email (required for Dashboard access)</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm mb-2">Optional Fields:</h4>
                    <ul className="ml-6 list-disc text-sm text-muted-foreground space-y-1">
                      <li>Location URL (Google Maps link)</li>
                      <li>Cover Image (max 4MB)</li>
                      <li>Dress Code</li>
                      <li>Program / Notes</li>
                    </ul>
                  </div>
                  <div className="bg-muted/50 p-3 rounded-lg">
                    <p className="text-sm">
                      <span className="font-medium">Tip:</span> Host email must be an active address. This information
                      is required for Dashboard access.
                    </p>
                  </div>
                </div>
              </section>

              {/* Sharing RSVP Link */}
              <section>
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <span className="text-xl">🔗</span>
                  SHARING THE RSVP LINK
                </h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>A unique RSVP link is created for each event.</p>
                  <p>
                    Use the "Copy Invitation Link" button in the Dashboard to copy the link and share it via WhatsApp,
                    email, or social media.
                  </p>
                  <div className="bg-yellow-500/10 border border-yellow-500/20 p-3 rounded-lg">
                    <p className="text-yellow-700 dark:text-yellow-500 text-sm font-medium">
                      Anyone with this link can submit an RSVP. Only share with your invited guests.
                    </p>
                  </div>
                </div>
              </section>

              {/* Accessing Dashboard */}
              <section>
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <span className="text-xl">🔐</span>
                  ACCESSING THE DASHBOARD
                </h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>
                    <span className="font-medium">1. Automatic:</span> You'll be automatically redirected after creating
                    your event
                  </p>
                  <p>
                    <span className="font-medium">2. Manual:</span> Log in via the "Host Login" tab using your email
                  </p>
                  <div className="bg-muted/50 p-3 rounded-lg">
                    <p className="text-sm">Your session stays active for 24 hours.</p>
                  </div>
                </div>
              </section>

              {/* Editing an Event */}
              <section>
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <span className="text-xl">✏️</span>
                  EDITING AN EVENT
                </h3>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <p>
                    Click the "Edit Event" button in the Dashboard, verify your email, and modify any information you'd
                    like.
                  </p>
                  <div>
                    <h4 className="font-medium text-sm mb-2">Editable Information:</h4>
                    <ul className="ml-6 list-disc space-y-1">
                      <li>Event Type, Name, Date & Time</li>
                      <li>Location & Location URL</li>
                      <li>Cover Image</li>
                      <li>Dress Code, Program / Notes</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm mb-2">Non-Editable Information:</h4>
                    <ul className="ml-6 list-disc space-y-1">
                      <li>Host Name, Host Email (for security reasons)</li>
                    </ul>
                  </div>
                  <div className="bg-muted/50 p-3 rounded-lg">
                    <p className="text-sm">
                      Changes reflect immediately, your RSVP link remains the same, and existing responses are
                      preserved.
                    </p>
                  </div>
                </div>
              </section>

              {/* Guest Responses Management */}
              <section>
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <span className="text-xl">👥</span>
                  GUEST RESPONSES MANAGEMENT
                </h3>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <p>View all RSVP responses on the Dashboard:</p>
                  <div>
                    <h4 className="font-medium text-sm mb-2">Statistics:</h4>
                    <ul className="ml-6 list-disc space-y-1">
                      <li>Total Responses</li>
                      <li>Attending / Not Attending</li>
                      <li>Total Guests (including additional guests)</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm mb-2">Guest Responses Table:</h4>
                    <ul className="ml-6 list-disc space-y-1">
                      <li>Name, Status, Guests</li>
                      <li>Contact (Email & Phone)</li>
                      <li>Message (with "Read more" button for long messages)</li>
                      <li>Submitted (RSVP date)</li>
                      <li>Actions (delete button)</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* QR Code */}
              <section>
                <h3 className="text-lg font-semibold mb-3">QR CODE</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>
                    View the QR code using the "View QR Code" button in the Dashboard and download it in PNG format. Use
                    it on printed or digital invitations.
                  </p>
                  <p>Guests can scan the QR code with their phone camera to access the RSVP form directly.</p>
                </div>
              </section>

              {/* Guest List Export */}
              <section>
                <h3 className="text-lg font-semibold mb-3">GUEST LIST EXPORT</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>
                    Download all RSVP data in CSV format using the "Export Guest List" button. Open with Excel or Google
                    Sheets.
                  </p>
                  <p className="font-medium">
                    CSV Contents: Name, Status, Guests, Email, Phone, Dietary Restrictions, Message, Submitted At
                  </p>
                </div>
              </section>

              {/* Add to Calendar */}
              <section>
                <h3 className="text-lg font-semibold mb-3">ADD TO CALENDAR</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>
                    The "Add to Calendar" button on the RSVP form creates an .ics file for guests. This file is
                    compatible with iOS, Google Calendar, Outlook, and all calendar applications.
                  </p>
                  <p>Automatically adds event name, date, time, location, and a 1-hour reminder.</p>
                </div>
              </section>

              {/* Dark/Light Mode */}
              <section>
                <h3 className="text-lg font-semibold mb-3">THEME TOGGLE</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>
                    Switch between light and dark mode using the theme button in the top right corner. Your theme
                    preference is saved in your browser.
                  </p>
                </div>
              </section>

              {/* FAQ */}
              <section>
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <span className="text-xl">❓</span>
                  FREQUENTLY ASKED QUESTIONS
                </h3>
                <div className="space-y-3">
                  <div className="bg-muted/50 p-3 rounded-lg">
                    <p className="font-medium text-sm mb-1">Can I edit my event?</p>
                    <p className="text-sm text-muted-foreground">
                      Yes, you can change the date, location, photo, and more with "Edit Event".
                    </p>
                  </div>
                  <div className="bg-muted/50 p-3 rounded-lg">
                    <p className="font-medium text-sm mb-1">Can I create multiple events with the same email?</p>
                    <p className="text-sm text-muted-foreground">Yes, you can create unlimited events.</p>
                  </div>
                  <div className="bg-muted/50 p-3 rounded-lg">
                    <p className="font-medium text-sm mb-1">Will the RSVP link change?</p>
                    <p className="text-sm text-muted-foreground">
                      No, the link and QR code remain the same after editing.
                    </p>
                  </div>
                  <div className="bg-muted/50 p-3 rounded-lg">
                    <p className="font-medium text-sm mb-1">How many guests can I invite?</p>
                    <p className="text-sm text-muted-foreground">Unlimited, the platform has no RSVP limit.</p>
                  </div>
                  <div className="bg-muted/50 p-3 rounded-lg">
                    <p className="font-medium text-sm mb-1">How long can I access the Dashboard?</p>
                    <p className="text-sm text-muted-foreground">Your session stays active for 24 hours.</p>
                  </div>
                </div>
              </section>

              {/* Support */}
              <section className="border-t pt-6">
                <div className="bg-primary/5 p-4 rounded-lg space-y-2">
                  <p className="text-sm font-medium">Technical Support:</p>
                  <a href="mailto:sahinturkzehra@gmail.com" className="text-sm text-primary hover:underline block">
                    sahinturkzehra@gmail.com
                  </a>
                  <p className="text-sm font-medium mt-3">Shop:</p>
                  <a
                    href="https://www.etsy.com/shop/FlorMontana"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline block"
                  >
                    https://www.etsy.com/shop/FlorMontana
                  </a>
                </div>
              </section>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </TooltipProvider>
  )
}
