
"use client"

import * as React from "react"
import { addDays, format } from "date-fns"
import { CheckCircle2, Circle, Plus } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import { Card, CardContent } from "@/components/ui/card"
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
        <CardContent className="p-0">
          <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="w-full"
              components={{
                DayContent: ({ date: dayDate }) => {
                  const workouts = completedWorkouts[format(dayDate, "yyyy-MM-dd")];
                  return (
                    <div className="relative h-full w-full flex items-center justify-center">
                      <span>{dayDate.getDate()}</span>
                      {workouts && <CheckCircle2 className="absolute text-primary w-2 h-2 top-1 right-1" />}
                    </div>
                  );
                },
              }}
            />
        </CardContent>
      </Card>
      
      <Button 
        className="w-full mt-4" 
        onClick={() => setIsLogDialogOpen(true)}
        disabled={!date}
      >
        <Plus className="mr-2 h-4 w-4" />
        Log Workout
      </Button>

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
