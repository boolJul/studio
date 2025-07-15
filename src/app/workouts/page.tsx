import { Workouts } from '@/components/workouts/workouts';

export default function WorkoutsPage() {
    return (
        <main className="p-4 sm:p-6 lg:p-8">
            <h1 className="text-2xl font-semibold mb-6">Workouts</h1>
            <Workouts />
        </main>
    );
}
