import type React from "react"
import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

const _geist = Geist({
  subsets: ["latin"],
  display: "swap",
  preload: true,
})
const _geistMono = Geist_Mono({
  subsets: ["latin"],
  display: "swap",
  preload: true,
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://v0-digital-invitation-platform-lemon.vercel.app"),
  title: {
    default: "Universal RSVP Platform - Digital Invitations & Event Management",
    template: "%s | Universal RSVP Platform",
  },
  description:
    "Create beautiful digital invitations with seamless RSVP management for weddings, birthdays, corporate events, and more. Easy to use, professional, and mobile-friendly.",
  keywords: [
    "RSVP",
    "digital invitation",
    "event management",
    "wedding invitation",
    "birthday party",
    "corporate events",
    "online RSVP",
  ],
  authors: [{ name: "Universal RSVP Platform" }],
  creator: "Universal RSVP Platform",
  publisher: "Universal RSVP Platform",
  generator: "v0.app",
  applicationName: "Universal RSVP Platform",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Universal RSVP Platform",
    title: "Universal RSVP Platform - Digital Invitations & Event Management",
    description: "Create beautiful digital invitations with seamless RSVP management for all your events.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Universal RSVP Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Universal RSVP Platform - Digital Invitations & Event Management",
    description: "Create beautiful digital invitations with seamless RSVP management for all your events.",
    images: ["/og-image.png"],
    creator: "@rsvpplatform",
  },
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
  manifest: "/manifest.json",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  minimumScale: 1,
  userScalable: false,
  interactiveWidget: "resizes-content",
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
  colorScheme: "light dark",
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Universal RSVP Platform",
  description:
    "Create beautiful digital invitations with seamless RSVP management for weddings, birthdays, corporate events, and more.",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    ratingCount: "1250",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className={`font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
