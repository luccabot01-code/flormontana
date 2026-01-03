"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Users, UserCheck, UserX, UserPlus } from "lucide-react"
import type { RSVP } from "@/lib/types"

interface DashboardStatsProps {
  rsvps: RSVP[]
}

export function DashboardStats({ rsvps }: DashboardStatsProps) {
  const validRsvps = rsvps.filter((r) => r.attendance_status === "attending" || r.attendance_status === "not_attending")

  const totalResponses = validRsvps.length

  const attendingGuests = validRsvps
    .filter((r) => r.attendance_status === "attending")
    .reduce((sum, r) => sum + r.number_of_guests, 0)

  const notAttendingGuests = validRsvps
    .filter((r) => r.attendance_status === "not_attending")
    .reduce((sum, r) => sum + r.number_of_guests, 0)

  const totalGuests = attendingGuests + notAttendingGuests

  const stats = [
    {
      label: "Total Responses",
      value: totalResponses,
      icon: Users,
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-100 dark:bg-blue-950",
    },
    {
      label: "Attending",
      value: attendingGuests,
      icon: UserCheck,
      color: "text-green-600 dark:text-green-400",
      bgColor: "bg-green-100 dark:bg-green-950",
    },
    {
      label: "Not Attending",
      value: notAttendingGuests,
      icon: UserX,
      color: "text-red-600 dark:text-red-400",
      bgColor: "bg-red-100 dark:bg-red-950",
    },
    {
      label: "Total Guests",
      value: totalGuests,
      icon: UserPlus,
      color: "text-purple-600 dark:text-purple-400",
      bgColor: "bg-purple-100 dark:bg-purple-950",
    },
  ]

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
      {stats.map((stat) => (
        <Card key={stat.label} className="border">
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between mb-2 md:mb-3">
              <div className={`rounded-lg p-2 md:p-3 ${stat.bgColor}`}>
                <stat.icon className={`h-4 w-4 md:h-5 md:w-5 ${stat.color}`} />
              </div>
              <p className="text-2xl md:text-3xl font-bold tabular-nums">{stat.value}</p>
            </div>
            <p className="text-xs md:text-sm text-muted-foreground font-medium">{stat.label}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
