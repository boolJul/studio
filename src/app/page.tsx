import { Dashboard } from '@/components/dashboard/dashboard';

export default function DashboardPage() {
  return (
    <main className="p-4 sm:p-6 lg:p-8">
      <h1 className="text-3xl font-bold mb-6">Overview</h1>
      <Dashboard />
    </main>
  );
}
