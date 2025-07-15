"use client"

import { CheckCircle } from 'lucide-react';

const workoutItems = [
  { name: "Strength Training", details: "Full Body" },
  { name: "Cardio", details: "30 min" },
  { name: "Stretching", details: "15 min" },
]

export function TodaysWorkout() {

  return (
    <div className="space-y-4">
        <ul className="space-y-3">
          {workoutItems.map((item, i) => (
            <li key={i} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-muted-foreground" />
                <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-muted-foreground">{item.details}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
    </div>
  )
}
