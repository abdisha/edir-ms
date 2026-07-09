import { z } from "zod";

export const edirSchema = z.object({
    name: z
        .string()
        .min(3, "Edir name must be at least 3 characters."),

    description: z
        .string()
        .max(1000)
        .optional(),

    establishedYear: z.coerce
        .number()
        .min(1900)
        .max(new Date().getFullYear()),
});

export type EdirFormValues = z.infer<typeof edirSchema>;