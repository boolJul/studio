import { WorkoutCalendar } from './workout-calendar';
import { WorkoutLibrary } from './workout-library';

export function Workouts() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 space-y-4">
                <WorkoutCalendar />
            </div>
            <div className="lg:col-span-2">
                 <WorkoutLibrary />
            </div>
        </div>
    );
}
