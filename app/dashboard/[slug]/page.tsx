import { notFound, redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { DashboardClient } from "@/components/dashboard-client"
import type { Event } from "@/lib/types"
import { getDashboardSession } from "@/lib/auth/session"

interface PageProps {
  params: Promise<{ slug: string }>
}

export const dynamic = "force-dynamic"
export const revalidate = 0

export default async function DashboardPage({ params }: PageProps) {
  const { slug } = await params

  const email = await getDashboardSession(slug)

  const supabase = await createClient()

  const { data: event, error: eventError } = await supabase.from("events").select("*").eq("slug", slug).single()

  if (eventError || !event) {
    notFound()
  }

  if (!email || email !== event.host_email) {
    redirect(`/verify?slug=${slug}`)
  }

  return <DashboardClient initialEvent={event as Event} slug={slug} eventId={event.id} />
}
