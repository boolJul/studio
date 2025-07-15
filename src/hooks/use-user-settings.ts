
"use client";

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { SettingsFormValues } from '@/lib/types';
import { calculateDailyCaloricTarget } from '@/lib/fitness-calculator';


interface UserSettingsState extends SettingsFormValues {
  targetCalories: number;
  setSettings: (values: SettingsFormValues) => void;
}

const defaultSettings: SettingsFormValues = {
  age: 28,
  sex: "male",
  height: 175,
  weight: 70,
  activityLevel: "moderately_active",
  fitnessGoal: "maintenance",
  workoutReminders: false,
  progressUpdates: true,
  socialNotifications: false,
};

export const useUserSettings = create<UserSettingsState>()(
  persist(
    (set) => ({
      ...defaultSettings,
      targetCalories: calculateDailyCaloricTarget(defaultSettings),
      setSettings: (values) => {
        const newTargetCalories = calculateDailyCaloricTarget(values);
        set({ ...values, targetCalories: newTargetCalories });
      },
    }),
    {
      name: 'user-settings-storage', 
      storage: createJSONStorage(() => localStorage), 
    }
  )
);
