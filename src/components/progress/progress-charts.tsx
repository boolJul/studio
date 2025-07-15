import { BodyFatChart } from "./body-fat-chart";
import { CaloriesChart } from "./calories-chart";
import { SleepChart } from "./sleep-chart";
import { WeightChart } from "./weight-chart";


export function ProgressCharts() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tight text-primary">Your Progress</h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <WeightChart />
                <BodyFatChart />
                <SleepChart />
                <CaloriesChart />
            </div>
        </div>
    )
}
