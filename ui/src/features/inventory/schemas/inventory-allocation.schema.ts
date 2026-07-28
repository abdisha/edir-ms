import {z} from "zod";

export const inventoryAllocationSchema = z.object({
    item: z
        .string()
        .uuid("Invalid inventory item."),

    quantity: z
        .number()
        .int("Quantity must be a whole number.")
        .min(1, "Quantity must be greater than zero."),

    memberId: z
        .string()
        .uuid("Please select a member."),
});

export type InventoryAllocationFormValues = z.infer<
    typeof inventoryAllocationSchema
>;