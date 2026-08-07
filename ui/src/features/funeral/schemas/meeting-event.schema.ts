import {z} from "zod";

export const meetingEventSchema = z.object({
    meetingName: z
        .string()
        .min(3, "Meeting name is required.")
        .max(120, "Meeting name is too long."),

    agenda: z
        .string()
        .min(10, "Agenda must contain at least 10 characters.")
        .max(1000),

    eventDate: z.date({
        message: "Please select the meeting date.",
    }),

    location: z
        .string()
        .min(3, "Meeting location is required.")
        .max(250),
});

export type MeetingEventFormValues = z.infer<
    typeof meetingEventSchema
>;