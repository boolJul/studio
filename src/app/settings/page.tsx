import { SettingsForm } from '@/components/settings/settings-form';

export default function SettingsPage() {
  return (
    <main className="container mx-auto max-w-4xl py-8 px-4 sm:px-6 lg:px-8">
       <div className="space-y-4 mb-8">
          <h1 className="text-3xl font-bold">
            Settings
          </h1>
        </div>
        <SettingsForm />
    </main>
  );
}
