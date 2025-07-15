
"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from '@/components/ui/skeleton';
import { generateMealPlan, GenerateMealPlanOutput } from '@/ai/flows/generate-meal-plan-flow';
import { generateImage } from '@/ai/flows/generate-image-flow';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';

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
    <Card className="flex flex-col">
      <div className="relative aspect-video">
        {meal.loading ? (
          <Skeleton className="h-full w-full" />
        ) : (
          <Image
            src={meal.imageUrl}
            alt={meal.title}
            fill
            className="object-cover"
            data-ai-hint={meal.imagePrompt}
          />
        )}
      </div>
      <CardHeader>
        <CardTitle>{meal.title}</CardTitle>
        <CardDescription>{meal.calories} kcal</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground">{meal.description}</p>
      </CardContent>
    </Card>
  );
}

export function MealPlan() {
  const [mealPlan, setMealPlan] = useState<MealPlanState | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMealPlan = async () => {
      setLoading(true);
      setError(null);
      try {
        // In a real app, you'd fetch user settings and pass them here.
        const plan = await generateMealPlan({
          fitnessGoal: "muscle_gain",
          targetCalories: 2800,
        });

        const mealsWithImageState = plan.meals.map(meal => ({
          ...meal,
          imageUrl: `https://placehold.co/600x400.png?text=${encodeURIComponent(meal.title)}`,
          loading: true,
        }));
        
        setMealPlan({ ...plan, meals: mealsWithImageState });
        
        // Fetch images for each meal
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
                        newMeals[index] = { ...newMeals[index], loading: false }; // Stop loading on error
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

    fetchMealPlan();
  }, []);

  const totalCalories = mealPlan?.meals.reduce((sum, meal) => sum + meal.calories, 0) ?? 0;

  if (loading && !mealPlan) {
    return (
       <div>
        <div className="mb-6">
            <Skeleton className="h-9 w-1/4 mb-2" />
            <Skeleton className="h-6 w-1/2" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Skeleton className="h-96" />
            <Skeleton className="h-96" />
            <Skeleton className="h-96" />
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
    <div className="space-y-6">
        <div>
            <h1 className="text-3xl font-bold tracking-tight text-primary">Your Daily Meal Plan</h1>
            <p className="text-muted-foreground">
                Total for today: <span className="font-bold text-foreground">{totalCalories} kcal</span>
            </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mealPlan.meals.map((meal, index) => (
                <MealCard key={index} meal={meal} />
            ))}
        </div>
    </div>
  );
}
