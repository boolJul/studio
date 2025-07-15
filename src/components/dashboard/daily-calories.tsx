
"use client"

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Flame } from "lucide-react";
import { calculateDailyCaloricTarget } from '@/lib/fitness-calculator';
import type { SettingsFormValues } from '@/lib/types';

// Mock user settings. In a real app, this would come from a user context or API.
const mockUserSettings: SettingsFormValues = {
  age: 28,
  sex: "male",
  height: 175,
  weight: 70,
  activityLevel: "moderately_active",
  fitnessGoal: "maintenance",
  workoutReminders: false,
  progressUpdates: true,
  socialNotifications: false,
};


export function DailyCalories() {
  const [consumed, setConsumed] = useState(1250);
  const [target, setTarget] = useState(2500);
  const [food, setFood] = useState("");
  const [calories, setCalories] = useState<number | string>("");

  useEffect(() => {
    // Calculate target calories based on user settings when the component mounts.
    const calculatedTarget = calculateDailyCaloricTarget(mockUserSettings);
    setTarget(calculatedTarget);
  }, []);

  const handleAddCalories = () => {
    const newCalories = typeof calories === 'number' ? calories : parseInt(calories);
    if (!isNaN(newCalories) && newCalories > 0) {
      setConsumed(prev => prev + newCalories);
      setFood("");
      setCalories("");
    }
  };
  
  const progress = (consumed / target) * 100;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-4">
          <Flame className="w-8 h-8 text-primary" />
          <div>
            <CardTitle>Daily Calorie Intake</CardTitle>
            <CardDescription>
              {consumed} / {target} kcal
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <Progress value={progress} />
        <div className="flex flex-col sm:flex-row gap-2">
          <Input 
            placeholder="e.g., Apple" 
            value={food} 
            onChange={(e) => setFood(e.target.value)}
            className="flex-grow"
          />
          <Input 
            type="number" 
            placeholder="Calories" 
            value={calories} 
            onChange={(e) => setCalories(e.target.value)}
            className="w-full sm:w-28"
          />
          <Button onClick={handleAddCalories}>Add Food</Button>
        </div>
      </CardContent>
    </Card>
  )
}
