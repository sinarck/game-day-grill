"use client"

import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"

interface DatePickerProps {
  onDateChange: (date: Date) => void
}

export function DatePicker({ onDateChange }: DatePickerProps) {
  const [date, setDate] = useState<Date>()

  const handleDateChange = (date: Date) => {
    setDate(date)
    onDateChange(date)
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          loading={false}
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleDateChange}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}
