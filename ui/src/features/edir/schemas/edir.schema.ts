import {z} from "zod";


export const createEdirSchema = z.object({

    edirName: z
        .string()
        .trim()
        .min(3, "Edir name must be at least 3 characters")
        .max(100, "Edir name is too long"),


    establishedDate: z
        .date({
            error: "Established date is required",
        })
        .max(
            new Date(),
            "Established date cannot be in the future"
        ),


    description: z
        .string()
        .trim()
        .max(
            500,
            "Description cannot exceed 500 characters"
        )
        .optional()
        .or(z.literal("")),


    phoneNumber: z
        .string()
        .trim()
        .min(9, "Phone number is invalid")
        .max(20, "Phone number is too long"),


    address: z.object({

        city: z
            .string()
            .min(2, "City is required"),


        subcity: z
            .string()
            .min(2, "Subcity is required"),


        worda: z
            .string()
            .min(1, "Woreda is required"),

    }),

});


export type CreateEdirFormValues =
    z.infer<typeof createEdirSchema>;