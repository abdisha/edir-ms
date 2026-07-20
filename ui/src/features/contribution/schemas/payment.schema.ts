import {z} from "zod";

export const paymentSchema = z.object({
    amount: z
        .number()
        .positive("Amount must be greater than zero."),

    receipterId: z
        .string()
        .uuid("Please select the receiver."),

    memberId: z
        .string()
        .uuid(),

    paymentDate: z.date(),

    receiptNumber: z
        .string()
        .trim()
        .min(1, "Receipt number is required.")
        .max(50),

    remark: z
        .string()
        .trim()
        .max(500)
        .optional(),
});

export type PaymentFormValues = z.infer<
    typeof paymentSchema
>;