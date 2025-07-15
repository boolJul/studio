import { MealPlan } from '@/components/nutrition/meal-plan';

export default function NutritionPage() {
    return (
        <main className="p-4 sm:p-6 lg:p-8">
            <h1 className="text-3xl font-bold mb-6">Nutrition Plan</h1>
            <MealPlan />
        </main>
    );
}
