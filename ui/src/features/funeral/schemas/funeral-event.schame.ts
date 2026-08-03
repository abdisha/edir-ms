import {z} from "zod";

export const relationshipOptions = [
    "SPOUSE",
    "FATHER",
    "MOTHER",
    "SON",
    "DAUGHTER",
    "BROTHER",
    "SISTER",
    "GRANDFATHER",
    "GRANDMOTHER",
    "RELATIVE",
    "OTHER",
    ""
] as const;

export const funeralEventSchema = z.object({

    deceasedPersonFullName: z
        .string()
        .min(3, "Deceased person's full name is required.")
        .max(150),

    funeralName: z
        .string()
        .min(3, "Funeral name is required.")
        .max(150),

    relationShip: z.enum(relationshipOptions, {
        message: "Please select a relationship.",
    }),

    payout: z.number()
        .positive( "Payout cannot be negative."),

    funeralDate: z.date({
        message: "Please select the funeral date.",
    }),

    funeralAddress: z
        .string()
        .min(5, "Funeral address is required."),

    memberId: z
        .string()
        .uuid("Please select a member."),
});

export type FuneralEventFormValues = z.infer<
    typeof funeralEventSchema
>;