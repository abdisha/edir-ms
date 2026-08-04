import {z} from "zod";

export const itemIssueSchema = z.object({
    funeralId: z.string().uuid(),

    itemCode: z
        .string()
        .min(1, "Please select an inventory item."),

    quantity: z.number()
        .positive("Quantity must be a whole number.")
        .min(1, "Quantity must be at least 1."),
});

export type ItemIssueFormValues = z.infer<typeof itemIssueSchema>;