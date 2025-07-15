"use client";

import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, Search } from 'lucide-react';
import { Input } from '../ui/input';
import { useState, useEffect } from 'react';
import { generateImage } from '@/ai/flows/generate-image-flow';
import { Skeleton } from '../ui/skeleton';

const initialWorkouts = [
  {
    id: '1',
    title: "Full Body Strength",
    description: "A balanced workout targeting all major muscle groups.",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "gym strength",
    tags: ["Strength", "Full Body", "Intermediate"],
  },
  {
    id: '2',
    title: "Cardio Blast",
    description: "High-intensity interval training to boost your heart rate.",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "running cardio",
    tags: ["Cardio", "HIIT", "Beginner"],
  },
  {
    id: '3',
    title: "Yoga Flow",
    description: "Improve flexibility and mindfulness with this Vinyasa flow.",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "yoga pose",
    tags: ["Flexibility", "Yoga", "All Levels"],
  },
  {
    id: '4',
    title: "Leg Day",
    description: "Build lower body strength with squats, lunges, and more.",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "squat gym",
    tags: ["Strength", "Legs", "Advanced"],
  },
];

interface Workout {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  imageHint: string;
  tags: string[];
}

function WorkoutCard({ workout }: { workout: Workout }) {
  const [imageUrl, setImageUrl] = useState(workout.imageUrl);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImage = async () => {
      setLoading(true);
      try {
        const response = await generateImage({ prompt: workout.imageHint });
        setImageUrl(response.imageUrl);
      } catch (error) {
        console.error(`Failed to generate image for ${workout.title}:`, error);
      } finally {
        setLoading(false);
      }
    };
    fetchImage();
  }, [workout.imageHint, workout.title]);

  return (
    <Card className="overflow-hidden flex flex-col">
      <div className="relative aspect-video">
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
      <CardHeader>
        <CardTitle>{workout.title}</CardTitle>
        <div className="flex flex-wrap gap-2 pt-2">
          {workout.tags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground">{workout.description}</p>
      </CardContent>
      <div className="p-6 pt-0">
         <Button className="w-full">Start Workout</Button>
      </div>
    </Card>
  );
}


export function WorkoutLibrary() {
  const [workouts] = useState<Workout[]>(initialWorkouts);

  return (
    <div className='space-y-4'>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-2xl font-semibold">Browse Workouts</h2>
          </div>
           <div className="flex gap-2 w-full sm:w-auto">
             <div className="relative flex-grow">
               <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
               <Input placeholder="Search workouts..." className="pl-8 w-full" />
             </div>
           </div>
        </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {workouts.map((workout) => (
          <WorkoutCard key={workout.id} workout={workout} />
        ))}
      </div>
    </div>
  );
}
