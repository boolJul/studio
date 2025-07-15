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
        <CardTitle>Hydration</CardTitle>
        <CardDescription>{glasses} of {waterGoal} glasses</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-6 pt-2">
        <div className="flex items-end gap-2">
          {Array.from({ length: waterGoal }).map((_, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <div
                className={cn(
                  "w-8 h-12 rounded-t-md border-2 border-b-4 border-blue-300/50 transition-all duration-300 relative overflow-hidden",
                  i < glasses ? "bg-blue-400/50" : "bg-muted"
                )}
              >
                 <div
                  className={cn(
                    "absolute bottom-0 left-0 right-0 h-full w-full bg-blue-500/80 transition-all transform origin-bottom",
                    i < glasses ? "scale-y-100" : "scale-y-0"
                  )}
                  style={{ transitionDuration: '500ms'}}
                ></div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={handleRemoveGlass} disabled={glasses === 0}>
            <Minus className="h-4 w-4" />
          </Button>
          <span className="text-xl font-bold w-12 text-center">{glasses}</span>
          <Button variant="outline" size="icon" onClick={handleAddGlass}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
