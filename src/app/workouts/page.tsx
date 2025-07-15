import { Workouts } from '@/components/workouts/workouts';

export default function WorkoutsPage() {
    return (
        <main className="p-4 sm:p-6 lg:p-8">
            <h1 className="text-3xl font-bold mb-6">Your Workout Plan</h1>
            <Workouts />
        </main>
    );
}
