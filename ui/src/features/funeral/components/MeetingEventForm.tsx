import {zodResolver} from "@hookform/resolvers/zod";
import {Controller, useForm} from "react-hook-form";

import {
    Calendar,
    ClipboardList,
    MapPin,
    Users,
} from "lucide-react";

import {
    type MeetingEventFormValues,
    meetingEventSchema,
} from "../schemas/meeting-event.schema";

import {
    Field,
    FieldContent,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/shared/components/ui/field";

import {Input} from "@/shared/components/ui/input";
import {Textarea} from "@/shared/components/ui/textarea";
import {Button} from "@/shared/components/ui/button";
import {Popover, PopoverContent, PopoverTrigger} from "@/shared/components/ui/popover.tsx";
import {format} from "date-fns";
import {Calendar as CalendarPicker} from "@/shared/components/ui/calendar.tsx";

interface MeetingEventFormProps {
    defaultValues?: Partial<MeetingEventFormValues>;
    loading?: boolean;
    submitText?: string;
    onSubmit: (
        values: MeetingEventFormValues
    ) => Promise<void> | void;
}

export default function MeetingEventForm({

                                             defaultValues,
                                             loading = false,
                                             submitText = "Create Meeting",
                                             onSubmit,

                                         }: MeetingEventFormProps) {

    const form = useForm<MeetingEventFormValues>({
        resolver: zodResolver(meetingEventSchema),
        defaultValues: {
            meetingName: "",
            agenda: "",
            location: "",
            eventDate: new Date(),
            ...(defaultValues || {}),
            ...(defaultValues?.eventDate && { eventDate: new Date(defaultValues.eventDate) }),
        },
    });

    return (
        <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mx-auto max-w-5xl space-y-8"
        >
            <div className="text-center space-y-3">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <Users className="h-8 w-8 text-primary"/>

                </div>

                <div>

                    <h1 className="text-3xl font-bold">
                        Meeting Event
                    </h1>

                    <p className="text-muted-foreground mt-2">
                        Schedule a meeting for Edir members. Provide the
                        meeting details, location, agenda and date.
                    </p>

                </div>

            </div>

            {/* Meeting Information */}

            <section className="rounded-xl border bg-card p-6 shadow-sm space-y-6">
                <div>
                    <h2 className="font-semibold text-lg">
                        Meeting Information
                    </h2>

                    <p className="text-sm text-muted-foreground">
                        Basic information about the meeting.
                    </p>

                </div>

                <FieldGroup className="grid gap-6 md:grid-cols-2">
                    {/* Meeting Name */}

                    <Controller
                        name="meetingName"
                        control={form.control}
                        render={({field, fieldState}) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel>
                                    Meeting Name
                                </FieldLabel>
                                <FieldContent>
                                    <div className="relative">
                                        <Users className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground"/>

                                        <Input
                                            aria-label={"Meeting Name"}
                                            {...field}
                                            className="pl-10"
                                            placeholder="Monthly Executive Meeting"
                                        />

                                    </div>

                                </FieldContent>

                                <FieldDescription>
                                    Enter a descriptive meeting title.
                                </FieldDescription>

                                {fieldState.error && (
                                    <FieldError errors={[fieldState.error]}/>
                                )}

                            </Field>

                        )}
                    />

                    {/* Date */}

                    <Controller
                        name="eventDate"
                        control={form.control}
                        render={({field, fieldState}) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel>Meeting Date</FieldLabel>
                                <FieldContent>
                                    <Popover>
                                        <PopoverTrigger>
                                            <Button variant="outline" className="w-full justify-start">
                                                <Calendar className="mr-2 h-4 w-4"/>
                                                {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent>
                                            <CalendarPicker
                                                mode="single"
                                                selected={field.value}
                                                onSelect={field.onChange}
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </FieldContent>
                                <FieldDescription>
                                    The date when the funeral event took place.
                                </FieldDescription>
                                {fieldState.error && <FieldError errors={[fieldState.error]}/>}
                            </Field>
                        )}
                    />

                </FieldGroup>

            </section>

            {/* Location */}

            <section className="rounded-xl border bg-card p-6 shadow-sm space-y-6">
                <div>
                    <h2 className="font-semibold text-lg">
                        Venue
                    </h2>

                    <p className="text-sm text-muted-foreground">
                        Specify where the meeting will be held.
                    </p>

                </div>

                <FieldGroup>
                    <Controller
                        name="location"
                        control={form.control}
                        render={({field, fieldState}) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel>
                                    Meeting Location
                                </FieldLabel>
                                <FieldContent>
                                    <div className="relative">
                                        <MapPin className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground"/>

                                        <Input
                                            {...field}
                                            className="pl-10"
                                            aria-label="Meeting Location"
                                            placeholder="Edir Main Hall"
                                        />

                                    </div>

                                </FieldContent>

                                <FieldDescription>
                                    Provide the meeting venue or address.
                                </FieldDescription>

                                {fieldState.error && (
                                    <FieldError errors={[fieldState.error]}/>
                                )}

                            </Field>

                        )}
                    />

                </FieldGroup>

            </section>

            {/* Agenda */}

            <section className="rounded-xl border bg-card p-6 shadow-sm space-y-6">
                <div>
                    <h2 className="font-semibold text-lg">
                        Meeting Agenda
                    </h2>

                    <p className="text-sm text-muted-foreground">
                        Describe the topics that will be discussed.
                    </p>

                </div>

                <FieldGroup>
                    <Controller
                        name="agenda"
                        control={form.control}
                        render={({field, fieldState}) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel>
                                    Agenda
                                </FieldLabel>
                                <FieldContent>
                                    <div className="relative">
                                        <ClipboardList className="absolute left-3 top-3 h-4 w-4 text-muted-foreground"/>

                                        <Textarea
                                            {...field}
                                            rows={6}
                                            aria-label="Meeting Agenda"
                                            className="pl-10"
                                            placeholder="Discuss monthly contributions, financial report, funeral support activities, upcoming community events..."
                                        />

                                    </div>

                                </FieldContent>

                                <FieldDescription>
                                    Include all discussion topics for the meeting.
                                </FieldDescription>

                                {fieldState.error && (
                                    <FieldError errors={[fieldState.error]}/>
                                )}

                            </Field>

                        )}
                    />

                </FieldGroup>

            </section>

            {/* Footer */}

            <div className="flex justify-end border-t pt-6">
                <Button
                    size="lg"
                    disabled={loading}
                    type="submit"
                >
                    {submitText}
                </Button>

            </div>

        </form>
    );
}