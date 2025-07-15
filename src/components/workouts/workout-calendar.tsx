"use client"

import * as React from "react"
import { addDays, format } from "date-fns"
import { Calendar as CalendarIcon, CheckCircle2 } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const completedWorkouts = {
  [format(new Date(), "yyyy-MM-dd")]: ["Full Body Strength"],
  [format(addDays(new Date(), -2), "yyyy-MM-dd")]: ["Cardio Blast"],
  [format(addDays(new Date(), -5), "yyyy-MM-dd")]: ["Leg Day"],
  [format(addDays(new Date(), -10), "yyyy-MM-dd")]: ["Upper Body Power"],
};

export function WorkoutCalendar() {
  const [date, setDate] = React.useState<Date | undefined>(new Date())

  return (
    <Card>
      <CardHeader>
        <CardTitle>Workout Log</CardTitle>
        <CardDescription>Your workout history at a glance.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col md:flex-row gap-6 items-start">
        <div className="flex-1">
           <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
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
                  onSelect={setDate}
                  initialFocus
                  components={{
                    DayContent: ({ date }) => {
                      const workouts = completedWorkouts[format(date, "yyyy-MM-dd")];
                      if (workouts) {
                        return (
                          <div className="relative h-full w-full">
                            <span className="relative z-10">{date.getDate()}</span>
                            <CheckCircle2 className="absolute text-green-500 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 w-8 h-8 opacity-20 z-0" />
                          </div>
                        );
                      }
                      return <div>{date.getDate()}</div>;
                    },
                  }}
                />
              </PopoverContent>
            </Popover>
        </div>
        <div className="w-full md:w-1/3 space-y-4">
            <h3 className="font-semibold text-lg border-b pb-2">
                {date ? format(date, "MMMM d, yyyy") : 'Select a date'}
            </h3>
            {date && completedWorkouts[format(date, "yyyy-MM-dd")] ? (
                <ul className="space-y-2">
                    {completedWorkouts[format(date, "yyyy-MM-dd")].map(workout => (
                        <li key={workout} className="flex items-center gap-2">
                            <CheckCircle2 className="w-5 h-5 text-green-500" />
                            <span className="font-medium">{workout}</span>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-muted-foreground text-sm">No workout logged for this day.</p>
            )}
            <Button className="w-full" disabled={!date}>Log Workout</Button>
        </div>
      </CardContent>
    </Card>
  )
}
