
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"

const initialCompletedWorkouts: Record<string, string[]> = {
  [format(new Date(), "yyyy-MM-dd")]: ["Full Body Strength"],
  [format(addDays(new Date(), -2), "yyyy-MM-dd")]: ["Cardio Blast"],
  [format(addDays(new Date(), -5), "yyyy-MM-dd")]: ["Leg Day"],
  [format(addDays(new Date(), -10), "yyyy-MM-dd")]: ["Upper Body Power"],
};

const availableWorkouts = [
  "Full Body Strength",
  "Cardio Blast",
  "Yoga Flow",
  "Leg Day",
  "Upper Body Power",
  "Core Crusher",
];

export function WorkoutCalendar() {
  const [date, setDate] = React.useState<Date | undefined>(new Date())
  const [completedWorkouts, setCompletedWorkouts] = React.useState(initialCompletedWorkouts);
  const [isLogDialogOpen, setIsLogDialogOpen] = React.useState(false);
  const { toast } = useToast();

  const handleLogWorkout = (workout: string) => {
    if (!date) return;
    const dateKey = format(date, "yyyy-MM-dd");
    
    setCompletedWorkouts(prev => {
        const dayWorkouts = prev[dateKey] || [];
        if (dayWorkouts.includes(workout)) {
             toast({
                variant: "destructive",
                title: "Workout Already Logged",
                description: `${workout} is already logged for this day.`,
            });
            return prev;
        }
        const newWorkouts = { ...prev };
        newWorkouts[dateKey] = [...dayWorkouts, workout];
        
        toast({
            title: "Workout Logged",
            description: `${workout} logged for ${format(date, "PPP")}.`,
        });

        return newWorkouts;
    });

    setIsLogDialogOpen(false);
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Workout Log</CardTitle>
          <CardDescription>Your workout history at a glance.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col md:flex-row gap-6 items-start">
          <div className="flex-1 w-full">
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
                      DayContent: ({ date: dayDate }) => {
                        const workouts = completedWorkouts[format(dayDate, "yyyy-MM-dd")];
                        if (workouts) {
                          return (
                            <div className="relative h-full w-full">
                              <span className="relative z-10">{dayDate.getDate()}</span>
                              <CheckCircle2 className="absolute text-green-500 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 w-8 h-8 opacity-20 z-0" />
                            </div>
                          );
                        }
                        return <div>{dayDate.getDate()}</div>;
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
              <Button className="w-full" disabled={!date} onClick={() => setIsLogDialogOpen(true)}>Log Workout</Button>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isLogDialogOpen} onOpenChange={setIsLogDialogOpen}>
        <DialogContent>
            <DialogHeader>
            <DialogTitle>Log a Workout</DialogTitle>
            <DialogDescription>
                Select a workout to log for {date ? format(date, "PPP") : ''}.
            </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 py-4">
                {availableWorkouts.map((workout) => (
                    <Button 
                        key={workout}
                        variant="outline"
                        onClick={() => handleLogWorkout(workout)}
                    >
                        {workout}
                    </Button>
                ))}
            </div>
            <DialogFooter>
                <DialogClose asChild>
                    <Button type="button" variant="secondary">Cancel</Button>
                </DialogClose>
            </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
