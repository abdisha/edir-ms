import {z} from "zod";

const phoneRegex = /^(\+251|0)?9\d{8}$/;

export const memberSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(2, "First name must be at least 2 characters.")
    .max(50, "First name cannot exceed 50 characters."),

  middleName: z
    .string()
    .trim()
    .min(2, "Middle name must be at least 2 characters.")
    .max(50, "Middle name cannot exceed 50 characters."),

  lastName: z
    .string()
    .trim()
    .min(2, "Last name must be at least 2 characters.")
    .max(50, "Last name cannot exceed 50 characters."),

gender: z.enum(["M", "F"] as const, {
    error: "Gender is required.",
  }),

  age: z.coerce
    .number({
      error: "Age is required.",
    })
    .int("Age must be a whole number.")
    .min(18, "Member must be at least 18 years old.")
    .max(120, "Age cannot exceed 120."),

  phoneNumber: z
    .string()
    .trim()
    .regex(phoneRegex, "Enter a valid Ethiopian phone number."),

  applyRegistrationFee: z.boolean().default(false),

  address: z.object({
    city: z
      .string()
      .trim()
      .min(2, "City is required.")
      .max(100, "City cannot exceed 100 characters."),

    subcity: z
      .string()
      .trim()
      .min(2, "Subcity is required.")
      .max(100, "Subcity cannot exceed 100 characters."),

    woreda: z
      .string()
      .trim()
      .min(1, "Woreda is required.")
      .max(50, "Woreda cannot exceed 50 characters."),
  }),
});

export type MemberFormValues = z.infer<typeof memberSchema>;