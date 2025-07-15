"use client"

import { DailyCalories } from "@/components/dashboard/daily-calories";
import { HydrationTracker } from "@/components/dashboard/hydration-tracker";
import { TodaysWorkout } from "@/components/dashboard/todays-workout";

export function Dashboard() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <DailyCalories />
        <TodaysWorkout />
      </div>
      <div className="lg:col-span-1">
        <HydrationTracker />
      </div>
    </div>
  )
}
