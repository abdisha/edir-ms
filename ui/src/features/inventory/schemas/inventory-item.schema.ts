import {z} from "zod";

export const inventoryItemSchema = z.object({
    itemCode: z
        .string()
        .trim()
        .min(2, "Item code is required")
        .max(30, "Item code is too long"),

    itemName: z
        .string()
        .trim()
        .min(3, "Item name is required")
        .max(100, "Item name is too long"),

    initialQuantity: z
        .number()
        .int("Quantity must be a whole number")
        .min(0, "Quantity cannot be negative"),
});

export type InventoryItemFormValues = z.infer<
    typeof inventoryItemSchema
>;