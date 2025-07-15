
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { BodyFatChart } from "./body-fat-chart";
import { CaloriesChart } from "./calories-chart";
import { SleepChart } from "./sleep-chart";
import { WeightChart } from "./weight-chart";

const recentWorkouts = [
  { date: "2024-07-14", name: "Full Body Strength", duration: "60 min", calories: 450 },
  { date: "2024-07-12", name: "Cardio Blast", duration: "30 min", calories: 300 },
  { date: "2024-07-10", name: "Leg Day", duration: "75 min", calories: 600 },
  { date: "2024-07-09", name: "Yoga Flow", duration: "45 min", calories: 200 },
];


export function ProgressCharts() {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
                <WeightChart />
                <BodyFatChart />
                <SleepChart />
                <CaloriesChart />
            </div>
             <Card>
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <div>
                            <CardTitle>Recent Workouts</CardTitle>
                            <CardDescription>A log of your most recent activity.</CardDescription>
                        </div>
                        <Button variant="outline">View All</Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Date</TableHead>
                                <TableHead>Workout</TableHead>
                                <TableHead>Duration</TableHead>
                                <TableHead className="text-right">Calories Burned</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {recentWorkouts.map((workout) => (
                                <TableRow key={workout.date}>
                                    <TableCell>{workout.date}</TableCell>
                                    <TableCell className="font-medium">{workout.name}</TableCell>
                                    <TableCell>{workout.duration}</TableCell>
                                    <TableCell className="text-right">{workout.calories} kcal</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
             </Card>
        </div>
    )
}
