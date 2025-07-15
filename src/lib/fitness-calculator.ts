
import type { BMRData, TDEEData, CaloricTargetData } from './types';

const activityLevelMultipliers = {
  sedentary: 1.2,
  lightly_active: 1.375,
  moderately_active: 1.55,
  very_active: 1.725,
  extra_active: 1.9,
};

const fitnessGoalAdjustments = {
  weight_loss: -500,
  maintenance: 0,
  muscle_gain: 400,
};

/**
 * Calculates Basal Metabolic Rate (BMR) using the Mifflin-St Jeor equation.
 * For 'other' sex, it averages the male and female formulas.
 * @param data - User's sex, weight (kg), height (cm), and age (years).
 * @returns The calculated BMR.
 */
export function calculateBMR({ sex, weight, height, age }: BMRData): number {
  const baseCalculation = 10 * weight + 6.25 * height - 5 * age;

  if (sex === 'male') {
    return baseCalculation + 5;
  }
  
  if (sex === 'female') {
    return baseCalculation - 161;
  }
  
  // For 'other', we use an average of the male and female formulas as a neutral estimate.
  const bmrMale = baseCalculation + 5;
  const bmrFemale = baseCalculation - 161;
  return (bmrMale + bmrFemale) / 2;
}

/**
 * Calculates Total Daily Energy Expenditure (TDEE).
 * @param data - User data including activity level.
 * @returns The calculated TDEE.
 */
export function calculateTDEE(data: TDEEData): number {
  const bmr = calculateBMR(data);
  const multiplier = activityLevelMultipliers[data.activityLevel];
  return bmr * multiplier;
}

/**
 * Calculates the final daily caloric target based on TDEE and fitness goal.
 * @param data - User data including fitness goal.
 * @returns The final daily caloric target, rounded to the nearest integer.
 */
export function calculateDailyCaloricTarget(data: CaloricTargetData): number {
  const tdee = calculateTDEE(data);
  const adjustment = fitnessGoalAdjustments[data.fitnessGoal];
  return Math.round(tdee + adjustment);
}
