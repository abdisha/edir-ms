import {z} from "zod";

export const inventoryIssueDecisionSchema = z.object({
    funeralId: z.string("Invalid funeral ID."),
    issueId: z.string("Invalid issue ID."),
    quantity: z
        .number()
        .int("Quantity must be a whole number.")
        .positive("Quantity must be greater than zero."),
});

export type InventoryIssueDecisionFormValues =
    z.infer<typeof inventoryIssueDecisionSchema>;