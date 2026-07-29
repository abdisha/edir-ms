import {z} from "zod";

export const inventoryAllocationSchema = z.object({
    quantity: z
        .number()
        .int("Quantity must be a whole number.")
        .min(1, "Quantity must be greater than zero."),

    storeId: z
        .string()
        .uuid("Please select a store."),
});

export type InventoryAllocationFormValues = z.infer<
    typeof inventoryAllocationSchema
>;