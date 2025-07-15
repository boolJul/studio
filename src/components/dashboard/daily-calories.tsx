
"use client"

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Flame } from "lucide-react";
import { useUserSettings } from '@/hooks/use-user-settings';


export function DailyCalories() {
  const [consumed, setConsumed] = useState(1250);
  const [food, setFood] = useState("");
  const [calories, setCalories] = useState<number | string>("");

  const target = useUserSettings(state => state.targetCalories);

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
