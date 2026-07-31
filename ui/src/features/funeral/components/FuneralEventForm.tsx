import {zodResolver} from "@hookform/resolvers/zod";
import {Controller, useForm} from "react-hook-form";

import {type FuneralEventFormValues, funeralEventSchema, relationshipOptions,} from "../schemas/funeral-event.schame";

import {Field, FieldContent, FieldDescription, FieldGroup, FieldLabel,} from "@/shared/components/ui/field";

import {Input} from "@/shared/components/ui/input";

import {Button} from "@/shared/components/ui/button";

import {Textarea} from "@/shared/components/ui/textarea";

import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from "@/shared/components/ui/select";

import {Calendar, HeartHandshake, Users,} from "lucide-react";

import {Calendar as CalendarPicker} from "@/shared/components/ui/calendar";

import {Popover, PopoverContent, PopoverTrigger,} from "@/shared/components/ui/popover";

import {format} from "date-fns";

interface MemberOption {
    id: string;
    fullName: string;
}

interface Props {

    members: MemberOption[];

    loading?: boolean;

    defaultValues?: Partial<FuneralEventFormValues>;

    submitText?: string;

    onSubmit(
        values: FuneralEventFormValues
    ): Promise<void> | void;

}

export default function FuneralEventForm({

    members,

    loading = false,

    submitText = "Create Funeral Event",

    defaultValues,

    onSubmit,

}: Props) {

    const {

        control,

        handleSubmit,

        formState: { errors },

    } = useForm<FuneralEventFormValues>({

        resolver: zodResolver(funeralEventSchema),

        defaultValues: {

            payout: 0,

            funeralDate: new Date(),

            ...defaultValues,

        },

    });

    return (

        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-8"
        >

            {/* Deceased Information */}

            <section className="space-y-6">

                <div>

                    <h3 className="flex items-center gap-2 text-lg font-semibold">

                        <HeartHandshake className="h-5 w-5 text-primary"/>

                        Deceased Information

                    </h3>

                    <p className="text-sm text-muted-foreground">

                        Information about the deceased person.

                    </p>

                </div>

                <FieldGroup>

                    <Field>

                        <FieldLabel>
                            Deceased Full Name
                        </FieldLabel>

                        <FieldContent>

                            <Controller
                                name="deceasedPersonFullName"
                                control={control}
                                render={({ field }) => (

                                    <Input
                                        placeholder="Abebe Kebede"
                                        {...field}
                                    />

                                )}
                            />

                        </FieldContent>

                        <FieldDescription>
                            Enter the deceased person's full name.
                        </FieldDescription>

                        {errors.deceasedPersonFullName && (
                            <p className="text-sm text-destructive">
                                {errors.deceasedPersonFullName.message}
                            </p>
                        )}

                    </Field>

                    <Field>

                        <FieldLabel>
                            Funeral Name
                        </FieldLabel>

                        <FieldContent>

                            <Controller
                                name="funeralName"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        placeholder="Abebe Kebede Funeral"
                                        {...field}
                                    />
                                )}
                            />

                        </FieldContent>

                    </Field>

                </FieldGroup>

            </section>

            {/* Member */}

            <section className="space-y-6">

                <div>

                    <h3 className="flex items-center gap-2 text-lg font-semibold">

                        <Users className="h-5 w-5 text-primary"/>

                        Member Information

                    </h3>

                </div>

                <FieldGroup>

                    <Field>

                        <FieldLabel>
                            Member
                        </FieldLabel>

                        <FieldContent>

                            <Controller
                                name="memberId"
                                control={control}
                                render={({ field }) => (

                                    <Select
                                        value={field.value}
                                        onValueChange={field.onChange}
                                    >

                                        <SelectTrigger>

                                            <SelectValue placeholder="Select member"/>

                                        </SelectTrigger>

                                        <SelectContent>

                                            {members.map(member => (

                                                <SelectItem
                                                    key={member.id}
                                                    value={member.id}
                                                >

                                                    {member.fullName}

                                                </SelectItem>

                                            ))}

                                        </SelectContent>

                                    </Select>

                                )}
                            />

                        </FieldContent>

                    </Field>

                    <Field>

                        <FieldLabel>

                            Relationship

                        </FieldLabel>

                        <FieldContent>

                            <Controller
                                name="relationShip"
                                control={control}
                                render={({ field }) => (

                                    <Select
                                        value={field.value}
                                        onValueChange={field.onChange}
                                    >

                                        <SelectTrigger>

                                            <SelectValue/>

                                        </SelectTrigger>

                                        <SelectContent>

                                            {relationshipOptions.map(item => (

                                                <SelectItem
                                                    key={item}
                                                    value={item}
                                                >
                                                    {item.replaceAll("_"," ")}
                                                </SelectItem>

                                            ))}

                                        </SelectContent>

                                    </Select>

                                )}
                            />

                        </FieldContent>

                    </Field>

                </FieldGroup>

            </section>

            {/* Funeral Details */}

            <section className="space-y-6">

                <h3 className="flex items-center gap-2 text-lg font-semibold">

                    <Calendar className="h-5 w-5 text-primary"/>

                    Funeral Details

                </h3>

                <FieldGroup>

                    <Field>

                        <FieldLabel>

                            Funeral Date

                        </FieldLabel>

                        <FieldContent>

                            <Controller
                                name="funeralDate"
                                control={control}
                                render={({ field }) => (
                                    <Popover>
                                        <PopoverTrigger>
                                            <Button
                                                variant="outline"
                                                className="justify-start w-full"
                                            >
                                                <Calendar className="mr-2 h-4 w-4"/>
                                                {format(field.value, "PPP")}
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
                                )}
                            />

                        </FieldContent>

                    </Field>

                    <Field>

                        <FieldLabel>

                            Payout (ETB)

                        </FieldLabel>

                        <FieldContent>

                            <Controller
                                name="payout"
                                control={control}
                                render={({ field }) => (

                                    <Input
                                        type="number"
                                        {...field}
                                    />

                                )}
                            />

                        </FieldContent>

                    </Field>

                </FieldGroup>

                <Field>

                    <FieldLabel>

                        Funeral Address

                    </FieldLabel>

                    <FieldContent>

                        <Controller
                            name="funeralAddress"
                            control={control}
                            render={({ field }) => (

                                <Textarea
                                    rows={4}
                                    placeholder="Enter funeral location..."
                                    {...field}
                                />

                            )}
                        />

                    </FieldContent>

                </Field>

            </section>

            <div className="flex justify-end border-t pt-6">

                <Button
                    type="submit"
                    disabled={loading}
                >

                    {submitText}

                </Button>

            </div>

        </form>

    );

}