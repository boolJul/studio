
"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from '@/components/ui/skeleton';
import { generateMealPlan, GenerateMealPlanOutput, GenerateMealPlanInput } from '@/ai/flows/generate-meal-plan-flow';
import { generateImage } from '@/ai/flows/generate-image-flow';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';
import { useUserSettings } from '@/hooks/use-user-settings';
import { Button } from '../ui/button';

type Meal = GenerateMealPlanOutput['meals'][number];

interface MealWithImage extends Meal {
  imageUrl: string;
  loading: boolean;
}

interface MealPlanState extends Omit<GenerateMealPlanOutput, 'meals'> {
  meals: MealWithImage[];
}

function MealCard({ meal }: { meal: MealWithImage }) {
  return (
    <Card className="flex flex-col md:flex-row items-center gap-6 p-4">
      <div className="relative h-32 w-32 flex-shrink-0">
        {meal.loading ? (
          <Skeleton className="h-full w-full rounded-md" />
        ) : (
          <Image
            src={meal.imageUrl}
            alt={meal.title}
            fill
            className="object-cover rounded-md"
            data-ai-hint={meal.imagePrompt}
          />
        )}
      </div>
      <div className="flex-grow">
        <CardTitle className="text-lg mb-1">{meal.title}</CardTitle>
        <CardDescription className="mb-2">{meal.calories} kcal</CardDescription>
        <p className="text-sm text-muted-foreground">{meal.description}</p>
      </div>
    </Card>
  );
}

export function MealPlan() {
  const [mealPlan, setMealPlan] = useState<MealPlanState | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const userSettings = useUserSettings();

  const fetchMealPlan = async () => {
    setLoading(true);
    setMealPlan(null);
    setError(null);
    try {
      const planInput: GenerateMealPlanInput = {
        fitnessGoal: userSettings.fitnessGoal,
        targetCalories: userSettings.targetCalories,
      };
      
      const plan = await generateMealPlan(planInput);

      const mealsWithImageState = plan.meals.map(meal => ({
        ...meal,
        imageUrl: `https://placehold.co/128x128.png?text=${encodeURIComponent(meal.title)}`,
        loading: true,
      }));
      
      setMealPlan({ ...plan, meals: mealsWithImageState });
      
      mealsWithImageState.forEach((meal, index) => {
          generateImage({ prompt: meal.imagePrompt })
              .then(imageResponse => {
                  setMealPlan(currentPlan => {
                      if (!currentPlan) return null;
                      const newMeals = [...currentPlan.meals];
                      newMeals[index] = { ...newMeals[index], imageUrl: imageResponse.imageUrl, loading: false };
                      return { ...currentPlan, meals: newMeals };
                  });
              })
              .catch(err => {
                  console.error(`Failed to generate image for ${meal.title}:`, err);
                   setMealPlan(currentPlan => {
                      if (!currentPlan) return null;
                      const newMeals = [...currentPlan.meals];
                      newMeals[index] = { ...newMeals[index], loading: false };
                      return { ...currentPlan, meals: newMeals };
                  });
              });
      });

    } catch (err) {
      console.error("Failed to generate meal plan:", err);
      setError("Sorry, we couldn't generate a meal plan right now. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMealPlan();
  }, [userSettings.fitnessGoal, userSettings.targetCalories]);

  const totalCalories = mealPlan?.meals.reduce((sum, meal) => sum + meal.calories, 0) ?? 0;

  if (loading && !mealPlan) {
    return (
       <div>
         <div className="mb-6 space-y-2">
            <Skeleton className="h-9 w-1/4 mb-2" />
            <Skeleton className="h-5 w-1/2" />
        </div>
        <div className="space-y-4">
            <Skeleton className="h-36" />
            <Skeleton className="h-36" />
            <Skeleton className="h-36" />
        </div>
       </div>
    );
  }

  if (error) {
    return (
        <Alert variant="destructive">
            <Terminal className="h-4 w-4" />
            <AlertTitle>Error Generating Meal Plan</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
        </Alert>
    )
  }

  if (!mealPlan) {
    return null;
  }

  return (
    <div className="space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
              <p className="text-muted-foreground">
                  Total for today: <span className="font-bold text-foreground">{totalCalories} kcal</span> (Target: {userSettings.targetCalories} kcal)
              </p>
          </div>
          <div className="flex gap-2">
            <Button onClick={fetchMealPlan} disabled={loading}>
              {loading ? 'Generating...' : 'Regenerate Plan'}
            </Button>
             <Button variant="outline">Adjust Plan</Button>
          </div>
        </div>

        <div className="space-y-4">
            <div>
              <h2 className="text-2xl font-semibold">Today's Meals</h2>
            </div>
            {mealPlan.meals.map((meal, index) => (
                <MealCard key={index} meal={meal} />
            ))}
        </div>
    </div>
  );
}
