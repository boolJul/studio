'use server';
/**
 * @fileOverview A meal plan generation AI agent.
 *
 * - generateMealPlan - A function that handles the meal plan generation process.
 * - GenerateMealPlanInput - The input type for the generateMealPlan function.
 * - GenerateMealPlanOutput - The return type for the generateMealPlan function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateMealPlanInputSchema = z.object({
  fitnessGoal: z.enum(["weight_loss", "maintenance", "muscle_gain"]).describe("The user's primary fitness goal."),
  targetCalories: z.number().describe("The user's target daily calorie intake."),
});
export type GenerateMealPlanInput = z.infer<typeof GenerateMealPlanInputSchema>;

const MealSchema = z.object({
  title: z.string().describe("The name of the meal."),
  description: z.string().describe("A short, appetizing description of the meal."),
  calories: z.number().int().describe("The estimated calorie count for the meal."),
  imagePrompt: z.string().describe("A simple, descriptive prompt for generating a photorealistic image of the meal (e.g., 'scrambled eggs with avocado toast').")
});

const GenerateMealPlanOutputSchema = z.object({
  meals: z.array(MealSchema).length(3).describe("An array of three meals: Breakfast, Lunch, and Dinner."),
});
export type GenerateMealPlanOutput = z.infer<typeof GenerateMealPlanOutputSchema>;

export async function generateMealPlan(input: GenerateMealPlanInput): Promise<GenerateMealPlanOutput> {
  return generateMealPlanFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateMealPlanPrompt',
  input: {schema: GenerateMealPlanInputSchema},
  output: {schema: GenerateMealPlanOutputSchema},
  prompt: `You are a professional nutritionist creating a daily meal plan for a client.

Client's Goal: {{{fitnessGoal}}}
Target Daily Calories: {{{targetCalories}}} kcal

Generate a simple, healthy, and delicious meal plan for one day, consisting of Breakfast, Lunch, and Dinner.
The total calories for all three meals combined should be approximately equal to the client's target daily calories.
For each meal, provide a title, a short description, an estimated calorie count, and a simple prompt for an AI image generator to create a picture of the meal.
Ensure the meals are balanced and appropriate for the specified fitness goal.
Do not include snacks. Provide exactly three meals.
`,
  model: 'googleai/gemini-1.5-flash',
});

const generateMealPlanFlow = ai.defineFlow(
  {
    name: 'generateMealPlanFlow',
    inputSchema: GenerateMealPlanInputSchema,
    outputSchema: GenerateMealPlanOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
