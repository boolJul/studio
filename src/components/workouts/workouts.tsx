import { WorkoutCalendar } from './workout-calendar';
import { WorkoutLibrary } from './workout-library';

export function Workouts() {
    return (
        <div className="space-y-6">
            <WorkoutCalendar />
            <WorkoutLibrary />
        </div>
    );
}
