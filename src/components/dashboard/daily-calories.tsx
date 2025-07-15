
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
        <CardTitle>Daily Calorie Target</CardTitle>
        <CardDescription>
          {consumed} / {target} kcal consumed
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Progress value={progress} />
      </CardContent>
    </Card>
  )
}
