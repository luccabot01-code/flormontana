import type { Metadata } from "next"
import { HomePageClient } from "./HomePageClient"

export const metadata: Metadata = {
  title: "Create Your Event - Universal RSVP Platform",
  description:
    "Create beautiful digital invitations with seamless RSVP management. Perfect for weddings, birthdays, and corporate events.",
}

export default function HomePage() {
  return <HomePageClient />
}
