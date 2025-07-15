import { ProgressCharts } from '@/components/progress/progress-charts';

export default function ProgressPage() {
    return (
        <main className="p-4 sm:p-6 lg:p-8">
            <h1 className="text-3xl font-bold mb-6">Progress &amp; History</h1>
            <ProgressCharts />
        </main>
    );
}
