"use client"

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Droplet, Minus, Plus } from "lucide-react";
import { cn } from '@/lib/utils';

const waterGoal = 8; // 8 glasses

export function HydrationTracker() {
  const [glasses, setGlasses] = useState(3);

  const handleAddGlass = () => {
    setGlasses(prev => Math.min(prev + 1, 20));
  };

  const handleRemoveGlass = () => {
    setGlasses(prev => Math.max(prev - 1, 0));
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-4">
          <Droplet className="w-8 h-8 text-primary" />
          <div>
            <CardTitle>Hydration Tracker</CardTitle>
            <CardDescription>{glasses} of {waterGoal} glasses</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-6 pt-2">
        <div className="flex items-end gap-2">
          {Array.from({ length: waterGoal }).map((_, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <div
                className={cn(
                  "w-10 h-16 rounded-t-lg border-2 border-b-4 border-blue-300 transition-all duration-300 relative overflow-hidden",
                  i < glasses ? "bg-blue-400" : "bg-blue-100"
                )}
              >
                 <div
                  className={cn(
                    "absolute bottom-0 left-0 right-0 h-full w-full bg-blue-500 transition-all transform origin-bottom",
                    i < glasses ? "scale-y-100" : "scale-y-0"
                  )}
                  style={{ transitionDuration: '500ms'}}
                ></div>
              </div>
              <span className="text-xs text-muted-foreground">{i + 1}</span>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={handleRemoveGlass} disabled={glasses === 0}>
            <Minus className="h-4 w-4" />
          </Button>
          <span className="text-2xl font-bold w-12 text-center">{glasses}</span>
          <Button variant="outline" size="icon" onClick={handleAddGlass}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-sm text-muted-foreground text-center">
            {glasses >= waterGoal ? "Great job! You've reached your hydration goal." : `You're ${waterGoal - glasses} glasses away from your goal.`}
        </p>
      </CardContent>
    </Card>
  )
}
