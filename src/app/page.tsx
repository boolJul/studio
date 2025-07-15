import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Dashboard } from '@/components/dashboard/dashboard';
import { Settings } from 'lucide-react';

export default function DashboardPage() {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <header className="sticky top-0 z-10 flex h-[57px] items-center gap-1 border-b bg-background px-4">
        <h1 className="text-xl font-semibold">Dashboard</h1>
        <Link href="/settings" className="ml-auto">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
          >
            <Settings className="h-4 w-4" />
            <span className="sr-only">Settings</span>
          </Button>
        </Link>
      </header>
      <main className="p-4 sm:p-6 lg:p-8">
        <Dashboard />
      </main>
    </div>
  );
}
