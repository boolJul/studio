import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { SettingsForm } from '@/components/settings/settings-form';
import { ArrowLeft } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="bg-background text-foreground min-h-screen">
       <header className="sticky top-0 z-10 flex h-[57px] items-center gap-1 border-b bg-background px-4">
         <Link href="/">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Button>
        </Link>
        <h1 className="ml-4 text-xl font-semibold">Settings</h1>
      </header>
      <main className="container mx-auto max-w-4xl py-12 px-4 sm:px-6 lg:px-8">
        <div className="space-y-4">
          <header className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-primary sm:text-5xl md:text-6xl font-headline">
              TrackWise
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-muted-foreground sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Manage your profile, activity, and notification preferences.
            </p>
          </header>
        </div>
        <div className="mt-10">
          <SettingsForm />
        </div>
      </main>
    </div>
  );
}
