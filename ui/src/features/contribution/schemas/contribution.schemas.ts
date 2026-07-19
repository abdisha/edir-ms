import { z } from "zod";

export const contributionSchema = z
    .object({
        name: z.string().min(3, "Name is required"),
        description: z.string().min(3, "Description is required"),

        startDate: z.date().min(1, "Start date is required"),
        endDate: z.date().min(1, "End date is required"),
        dueDate: z.date().min(1, "Due date is required"),

        contributionAmount: z
            .number()
            .positive("Contribution amount must be greater than 0"),
        applyPenalty: z.boolean(),
        penaltyAmount: z
            .number()
            .min(0, "Penalty cannot be negative"),

        penaltyType: z.enum(["FIXED", "PERCENTAGE", "NONE"]),
    }) .superRefine((data, ctx) => {
        if (data.applyPenalty) {
            if (data.penaltyAmount <= 0) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    path: ["penaltyAmount"],
                    message: "Penalty amount must be greater than 0",
                });
            }

            if (data.penaltyType === "NONE") {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    path: ["penaltyType"],
                    message: "Select a penalty type",
                });
            }
        }
    })
    .refine(
        (data) => new Date(data.endDate) >= new Date(data.startDate),
        {
            path: ["endDate"],
            message: "End date must be after start date",
        }
    )
    .refine(
        (data) => new Date(data.dueDate) >= new Date(data.endDate),
        {
            path: ["dueDate"],
            message: "Due date must be after end date",
        }
    );

export type ContributionFormValues = z.infer<typeof contributionSchema>;

