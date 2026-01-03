"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <TooltipProvider>
      <Tooltip delayDuration={200}>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="fixed top-6 right-6 z-50 h-16 w-16 rounded-full shadow-[0_0_35px_rgba(0,0,0,0.5)] hover:shadow-[0_0_45px_rgba(0,0,0,0.7)] dark:shadow-[0_0_35px_rgba(251,191,36,0.6)] dark:hover:shadow-[0_0_50px_rgba(251,191,36,0.8)] border-2 hover:scale-110 active:scale-95 transition-all duration-300 bg-background"
            aria-label="Toggle theme"
          >
            <Sun className="h-8 w-8 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-8 w-8 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p>Dark / Light</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
