"use client"

import { Button } from "@/components/ui/button"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"

export function RSVPHeader() {
  const { theme, setTheme } = useTheme()

  return (
    <div className="flex items-center justify-end gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <TooltipProvider>
        <Tooltip delayDuration={200}>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="bg-transparent text-xs md:text-sm shadow-[0_0_35px_rgba(0,0,0,0.5)] hover:shadow-[0_0_45px_rgba(0,0,0,0.7)] dark:shadow-[0_0_35px_rgba(251,191,36,0.6)] dark:hover:shadow-[0_0_50px_rgba(251,191,36,0.8)] hover:scale-105 active:scale-95 transition-all duration-300"
              aria-label="Toggle theme"
            >
              <Sun className="h-3.5 w-3.5 md:h-4 md:w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-3.5 w-3.5 md:h-4 md:w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p>Dark / Light</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}
