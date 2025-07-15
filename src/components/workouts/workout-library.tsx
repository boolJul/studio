import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, Search } from 'lucide-react';
import { Input } from '../ui/input';

const workouts = [
  {
    title: "Full Body Strength",
    description: "A balanced workout targeting all major muscle groups.",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "gym strength",
    tags: ["Strength", "Full Body", "Intermediate"],
  },
  {
    title: "Cardio Blast",
    description: "High-intensity interval training to boost your heart rate.",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "running cardio",
    tags: ["Cardio", "HIIT", "Beginner"],
  },
  {
    title: "Yoga Flow",
    description: "Improve flexibility and mindfulness with this Vinyasa flow.",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "yoga pose",
    tags: ["Flexibility", "Yoga", "All Levels"],
  },
  {
    title: "Leg Day",
    description: "Build lower body strength with squats, lunges, and more.",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "squat gym",
    tags: ["Strength", "Legs", "Advanced"],
  },
];

export function WorkoutLibrary() {
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <CardTitle>Workout Library</CardTitle>
            <CardDescription>Find your next workout plan.</CardDescription>
          </div>
           <div className="flex gap-2 w-full sm:w-auto">
             <div className="relative flex-grow">
               <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
               <Input placeholder="Search workouts..." className="pl-8 w-full" />
             </div>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              New Workout
            </Button>
           </div>
        </div>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {workouts.map((workout, index) => (
          <Card key={index} className="overflow-hidden flex flex-col">
            <div className="relative aspect-video">
              <Image 
                src={workout.imageUrl} 
                alt={workout.title} 
                fill
                className="object-cover"
                data-ai-hint={workout.imageHint}
              />
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
        ))}
      </CardContent>
    </Card>
  );
}
