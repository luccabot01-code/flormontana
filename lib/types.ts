export type EventType =
  | "wedding"
  | "engagement"
  | "birthday"
  | "baby_shower"
  | "bridal_shower"
  | "corporate"
  | "anniversary"
  | "graduation"
  | "custom"

export interface Event {
  id: string
  created_at: string
  updated_at: string
  event_type: EventType
  title: string
  date: string
  location: string
  location_url?: string
  dress_code?: string
  program_notes?: string
  rsvp_deadline?: string
  allow_plusone: boolean
  require_meal_choice: boolean
  meal_options: string[]
  custom_attendance_options: string[]
  slug: string
  theme_color: string
  cover_image_url?: string
  host_name: string
  host_email: string
  is_active: boolean
}

export interface RSVP {
  id: string
  created_at: string
  updated_at: string
  event_id: string
  guest_name: string
  guest_email?: string
  guest_phone?: string
  attendance_status: "attending" | "not_attending"
  number_of_guests: number
  has_plusone: boolean
  plusone_name?: string
  meal_choices: string[]
  message?: string
  ip_address?: string
  user_agent?: string
}

export interface CreateEventInput {
  event_type: EventType
  title: string
  date: string
  location: string
  location_url?: string
  dress_code?: string
  program_notes?: string
  rsvp_deadline?: string
  allow_plusone?: boolean
  require_meal_choice?: boolean
  meal_options?: string[]
  custom_attendance_options?: string[]
  theme_color?: string
  cover_image_url?: string
  host_name: string
  host_email: string
}

export interface CreateRSVPInput {
  event_id: string
  guest_name: string
  guest_email?: string
  guest_phone?: string
  attendance_status: "attending" | "not_attending"
  number_of_guests?: number
  has_plusone?: boolean
  plusone_name?: string
  meal_choices?: string[]
  message?: string
}

export interface UpdateEventInput {
  event_type: EventType
  title: string
  date: string
  location: string
  location_url?: string
  dress_code?: string
  program_notes?: string
  rsvp_deadline?: string
  allow_plusone?: boolean
  require_meal_choice?: boolean
  meal_options?: string[]
  custom_attendance_options?: string[]
  theme_color?: string
  cover_image_url?: string
  host_email: string
}
