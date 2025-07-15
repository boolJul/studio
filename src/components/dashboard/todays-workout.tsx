"use client"

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dumbbell, Clock, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { generateImage } from '@/ai/flows/generate-image-flow';
import { Skeleton } from '@/components/ui/skeleton';

const workout = {
  title: "Full Body Strength",
  description: "A balanced workout targeting all major muscle groups.",
  imageUrl: "https://placehold.co/600x400.png",
  imageHint: "gym workout",
  exercises: [
    { name: "Squats", details: "3 sets x 10 reps" },
    { name: "Bench Press", details: "3 sets x 8 reps" },
    { name: "Deadlifts", details: "3 sets x 5 reps" },
    { name: "Overhead Press", details: "3 sets x 8 reps" },
    { name: "Pull-ups", details: "3 sets x AMRAP" },
  ]
};

export function TodaysWorkout() {
  const [imageUrl, setImageUrl] = useState<string>(workout.imageUrl);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImage = async () => {
      setLoading(true);
      try {
        const response = await generateImage({ prompt: workout.imageHint });
        setImageUrl(response.imageUrl);
      } catch (error) {
        console.error("Failed to generate image:", error);
        // Keep placeholder on error
      } finally {
        setLoading(false);
      }
    };
    fetchImage();
  }, []);


  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <div className="flex items-center gap-4">
          <Dumbbell className="w-8 h-8 text-primary" />
          <div>
            <CardTitle>Today's Workout</CardTitle>
            <CardDescription>{workout.title}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="grid md:grid-cols-2 gap-6">
        <div className="relative aspect-video rounded-md overflow-hidden">
           {loading ? (
            <Skeleton className="h-full w-full" />
          ) : (
            <Image 
              src={imageUrl} 
              alt={workout.title} 
              fill
              className="object-cover"
              data-ai-hint={workout.imageHint}
            />
          )}
        </div>
        <div className="space-y-4">
            <p className="text-muted-foreground">{workout.description}</p>
            <ul className="space-y-2">
              {workout.exercises.map((ex, i) => (
                <li key={i} className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span><strong>{ex.name}:</strong> {ex.details}</span>
                </li>
              ))}
            </ul>
            <div className="flex gap-2">
                <Button>
                    <CheckCircle className="mr-2 h-4 w-4"/>
                    Mark as Completed
                </Button>
                <Button variant="outline" asChild>
                    <Link href="#">
                        <Clock className="mr-2 h-4 w-4"/>
                        Change Workout
                    </Link>
                </Button>
            </div>
        </div>
      </CardContent>
    </Card>
  )
}
