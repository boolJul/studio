"use client"

import { DailyCalories } from "@/components/dashboard/daily-calories";
import { HydrationTracker } from "@/components/dashboard/hydration-tracker";
import { TodaysWorkout } from "@/components/dashboard/todays-workout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { CheckCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

export function Dashboard() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <DailyCalories />
        <Card>
          <CardHeader>
            <CardTitle>Today's Workout</CardTitle>
            <CardDescription>A plan to get you closer to your goals.</CardDescription>
          </CardHeader>
          <CardContent>
            <TodaysWorkout />
          </CardContent>
        </Card>
      </div>
      <div className="lg:col-span-1 space-y-6">
        <HydrationTracker />
        <Card>
           <CardHeader>
              <CardTitle>Motivation</CardTitle>
           </CardHeader>
           <CardContent>
             <p className="text-muted-foreground italic">"The only bad workout is the one that didn't happen. Keep pushing forward!"</p>
           </CardContent>
        </Card>
      </div>
    </div>
  )
}
