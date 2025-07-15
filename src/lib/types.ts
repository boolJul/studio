
import { z } from "zod";

export const settingsSchema = z.object({
  age: z.coerce.number().int().min(1, { message: "Age must be a positive number." }).max(120, { message: "Age must be 120 or less." }),
  sex: z.enum(["male", "female", "other"], { required_error: "Please select your sex."}),
  height: z.coerce.number().min(50, { message: "Height must be at least 50 cm." }).max(250, { message: "Height must be 250cm or less." }),
  weight: z.coerce.number().min(20, { message: "Weight must be at least 20 kg." }).max(300, { message: "Weight must be 300kg or less." }),
  activityLevel: z.enum(
    [
      "sedentary",
      "lightly_active",
      "moderately_active",
      "very_active",
      "extra_active",
    ],
    { required_error: "Please select an activity level." }
  ),
  fitnessGoal: z.enum(["weight_loss", "maintenance", "muscle_gain"], {
    required_error: "Please select a fitness goal.",
  }),
  workoutReminders: z.boolean().default(false).optional(),
  progressUpdates: z.boolean().default(true).optional(),
  socialNotifications: z.boolean().default(false).optional(),
});

export type SettingsFormValues = z.infer<typeof settingsSchema>;

export type BMRData = Pick<SettingsFormValues, 'sex' | 'weight' | 'height' | 'age'>;
export type TDEEData = BMRData & Pick<SettingsFormValues, 'activityLevel'>;
export type CaloricTargetData = TDEEData & Pick<SettingsFormValues, 'fitnessGoal'>;
