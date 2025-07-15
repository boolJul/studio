import { SettingsForm } from '@/components/settings/settings-form';

export default function SettingsPage() {
  return (
    <div className="bg-background text-foreground min-h-screen">
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
