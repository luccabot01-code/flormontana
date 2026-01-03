"use client"

import { EventForm } from "@/components/event-form"
import { HostLoginForm } from "@/components/host-login-form"
import { HelpCenterDialog } from "@/components/help-center-dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export function HomePageClient() {
  const [activeTab, setActiveTab] = useState("create")

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <HelpCenterDialog />
      <ThemeToggle />
      <main className="container mx-auto px-4 py-12" role="main">
        <div className="mx-auto max-w-3xl space-y-8 animate-fade-in-up">
          <header className="text-center space-y-4">
            <h1 className="text-5xl font-bold tracking-tight text-balance">Event RSVP Platform</h1>
            <p className="text-xl text-muted-foreground text-balance">
              Beautiful digital invitations with seamless RSVP management
            </p>
          </header>

          <div className="grid grid-cols-2 gap-4 w-full">
            <Button size="lg" className="w-full hover-scale" onClick={() => setActiveTab("create")}>
              Create New Event
            </Button>
            <Button size="lg" className="w-full hover-scale" onClick={() => setActiveTab("login")}>
              Host Login
            </Button>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="hidden">
              <TabsTrigger value="create">Create New Event</TabsTrigger>
              <TabsTrigger value="login">Host Login</TabsTrigger>
            </TabsList>
            <TabsContent value="create" className="space-y-6 animate-scale-in">
              <EventForm />
            </TabsContent>
            <TabsContent value="login" className="space-y-6 animate-scale-in">
              <HostLoginForm />
              <Card className="bg-muted/50 hover-lift">
                <CardHeader>
                  <CardTitle className="text-lg">Already have events?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Enter your email address to access your event dashboards and manage RSVPs. You'll be redirected to
                    your most recent event.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <section aria-labelledby="how-it-works-heading">
            <Card className="bg-muted/50 hover-lift">
              <CardHeader>
                <CardTitle id="how-it-works-heading" className="text-lg">
                  How it works
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="space-y-3 list-none stagger-animation">
                  <li className="flex gap-3">
                    <div
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold"
                      aria-hidden="true"
                    >
                      1
                    </div>
                    <div>
                      <h3 className="font-semibold">Create your event</h3>
                      <p className="text-sm text-muted-foreground">
                        Fill in the details and create your unique event page
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <div
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold"
                      aria-hidden="true"
                    >
                      2
                    </div>
                    <div>
                      <h3 className="font-semibold">Share your link</h3>
                      <p className="text-sm text-muted-foreground">
                        Send the RSVP link to your guests via email, text, or social media
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <div
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold"
                      aria-hidden="true"
                    >
                      3
                    </div>
                    <div>
                      <h3 className="font-semibold">Track responses</h3>
                      <p className="text-sm text-muted-foreground">
                        Monitor RSVPs in real-time from your personal dashboard
                      </p>
                    </div>
                  </li>
                </ol>
              </CardContent>
            </Card>
          </section>
        </div>
      </main>
    </div>
  )
}
