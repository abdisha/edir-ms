import {zodResolver} from "@hookform/resolvers/zod";
import {Controller, useForm} from "react-hook-form";

import {type FuneralEventFormValues, funeralEventSchema,} from "../schemas/funeral-event.schame";

import {Field, FieldContent, FieldDescription, FieldError, FieldGroup, FieldLabel,} from "@/shared/components/ui/field";
import {Input} from "@/shared/components/ui/input";
import {Button} from "@/shared/components/ui/button";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from "@/shared/components/ui/select";

import {Calendar, HeartHandshake, Users} from "lucide-react";
import {Calendar as CalendarPicker} from "@/shared/components/ui/calendar";
import {Popover, PopoverContent, PopoverTrigger,} from "@/shared/components/ui/popover";
import {format} from "date-fns";
import {useNavigate} from "react-router";
import type {Member} from "@/shared/types.ts";
import {relationshipOptions} from "@/features/funeral/types/types.ts";


interface Props {
    members: Member[];
    loading?: boolean;
    defaultValues?: Partial<FuneralEventFormValues>;
    submitText?: string;
    onSubmit(values: FuneralEventFormValues): Promise<void> | void;
}

export default function FuneralEventForm({
    members,
    loading = false,
    submitText = "Create Funeral Event",
    defaultValues,
    onSubmit,
}: Props) {
    const form = useForm<FuneralEventFormValues>({
        resolver: zodResolver(funeralEventSchema),
        defaultValues: {
            deceasedPersonFullName: "",
            funeralAddress: "",
            funeralName: "",
            memberId: "",
            relationShip: undefined,
            payout: 0,
            funeralDate: new Date(),
            ...defaultValues,
        },
    });
    const navigate =useNavigate();

    return (
        <div className="mx-auto w-full max-w-4xl">
            <form className="space-y-10" onSubmit={form.handleSubmit(onSubmit)}>
                {/* Page Header */}
                <div className="text-center space-y-2">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                        <HeartHandshake className="h-7 w-7 text-primary"/>
                    </div>
                    <h1 className="text-3xl font-bold">Register/Edit Funeral Event</h1>
                    <p className="text-muted-foreground mx-auto max-w-2xl">
                        Record the funeral event, identify the deceased, associate the
                        Edir member, and configure the financial assistance.
                    </p>
                </div>

                <section className="rounded-xl border bg-card p-6 shadow-sm space-y-6">
                    <div>
                        <h3 className="flex items-center gap-2 text-lg font-semibold">
                            <HeartHandshake className="h-5 w-5 text-primary"/>
                            Deceased Information
                        </h3>
                        <p className="text-sm text-muted-foreground">
                            Information about the deceased person.
                        </p>
                    </div>
                    <FieldGroup className="grid gap-6 md:grid-cols-2">

                        <Controller
                            name="deceasedPersonFullName"
                            control={form.control}
                            render={({field, fieldState}) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel>Deceased Full Name</FieldLabel>
                                    <FieldContent>
                                <Input
                                    aria-label={'deceased-full-name'}
                                    placeholder="Abebe Kebede"
                                    {...field}
                                />
                                    </FieldContent>
                                    <FieldDescription>
                                        Enter the deceased person's full name.
                                    </FieldDescription>
                                    {fieldState.error && (
                                        <FieldError errors={[fieldState.error]}/>
                                    )}
                                </Field>
                            )}
                        />


                        <Controller
                            name="funeralName"
                            control={form.control}
                            render={({field, fieldState}) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel>Funeral Name</FieldLabel>
                                    <FieldContent>
                                        <Input
                                            aria-label={'funeral-name'}
                                            placeholder="Abebe Kebede Funeral"
                                            {...field}
                                        />
                                    </FieldContent>
                                    <FieldDescription>
                                        A descriptive name for the funeral event.
                                    </FieldDescription>
                                    {
                                        fieldState.error && (
                                            <FieldError errors={[fieldState.error]}/>
                                        )
                                    }
                                </Field>
                            )} />

                    </FieldGroup>
                </section>
                <section className="rounded-xl border bg-card p-6 shadow-sm space-y-6">
                    <div className="space-y-1 border-b pb-3">
                        <div className="flex items-center gap-2">
                            <Users className="h-5 w-5 text-primary"/>
                            <h2 className="text-lg font-semibold">
                                Member Information
                            </h2>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            Select the Edir member and specify the relationship to the
                            deceased.
                        </p>
                    </div>
                    <FieldGroup className="grid gap-6 md:grid-cols-2">

                        <Controller
                            name="memberId"
                            control={form.control}
                            render={({field, fieldState}) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel>Member</FieldLabel>
                                    <FieldContent>
                                        <Select value={field.value} onValueChange={field.onChange}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select Member">
                                                    {members.find(m => m.memberId == field.value)
                                                        ?.fullName}
                                                </SelectValue>
                                            </SelectTrigger>
                                            <SelectContent>
                                                {members.map(member => (
                                                    <SelectItem
                                                        key={member.memberId}
                                                        value={member.memberId}
                                                    >
                                                        {member.fullName}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FieldContent>
                                    <FieldDescription>
                                        Select the Edir member associated with the deceased.
                                    </FieldDescription>
                                    {
                                        fieldState.error && (
                                            <FieldError errors={[fieldState.error]}/>
                                        )
                                    }
                                </Field>
                            )}
                        />


                        <Controller
                            name="relationShip"
                            control={form.control}
                            render={({field, fieldState}) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel>Relationship to Deceased</FieldLabel>
                                    <FieldContent>
                                        <Select value={field.value ?? ""} onValueChange={field.onChange}>
                                            <SelectTrigger className={"w-full"}>
                                                <SelectValue placeholder={"Select relationship"}/>
                                            </SelectTrigger>
                                            <SelectContent>
                                                {relationshipOptions.map(item => (
                                                    <SelectItem
                                                        key={item}
                                                        value={item}
                                                    >
                                                        {item.replaceAll("_", " ")}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FieldContent>
                                    <FieldDescription>
                                        Specify the relationship of the member to the deceased.
                                    </FieldDescription>
                                    {
                                        fieldState.error && (
                                            <FieldError errors={[fieldState.error]}/>
                                        )
                                    }
                                </Field>
                            )}
                                />

                    </FieldGroup>
                </section>
                <section className="rounded-xl border bg-card p-6 shadow-sm space-y-6">
                    <h3 className="flex items-center gap-2 text-lg font-semibold">
                        <Calendar className="h-5 w-5 text-primary"/>
                        Funeral Details
                    </h3>
                    <FieldGroup className="grid gap-6 md:grid-cols-2">

                        <Controller
                            name="funeralDate"
                            control={form.control}
                            render={({field, fieldState}) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel>Funeral Date</FieldLabel>
                                    <FieldContent>
                                <Popover>
                                    <PopoverTrigger>
                                        <Button variant="outline" className="w-full justify-start">
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
                                    </FieldContent>
                                    <FieldDescription>
                                        The date when the funeral event took place.
                                    </FieldDescription>
                                    {
                                        fieldState.error && (
                                            <FieldError errors={[fieldState.error]}/>
                                        )
                                    }
                                </Field>
                            )}
                                />

                        <Controller
                                    name="payout"
                                    control={form.control}
                                    render={({field, fieldState}) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel>Payout (ETB)</FieldLabel>
                                            <FieldContent>
                                        <Input
                                            aria-label={'payout'}
                                            placeholder="0"
                                            type="number"
                                            {...field}
                                            onChange={(e) => field.onChange(Number(e.target.value))}
                                        />
                                            </FieldContent>
                                            <FieldDescription>
                                                The amount of financial assistance provided (in ETB).
                                            </FieldDescription>
                                            {
                                                fieldState.error && (
                                                    <FieldError errors={[fieldState.error]}/>
                                                )
                                            }
                                        </Field>
                                    )}
                        />
                    </FieldGroup>
                    <Controller name="funeralAddress"
                                control={form.control}
                                render={({field, fieldState}) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel>Funeral Address</FieldLabel>
                                        <FieldContent>
                                            <Input
                                                aria-label={'funeral-address'}
                                                placeholder="Enter funeral location..."
                                                {...field}
                                            />
                                        </FieldContent>
                                        <FieldDescription>
                                            The physical address where the funeral was held.
                                        </FieldDescription>
                                        {
                                            fieldState.error && (
                                                <FieldError errors={[fieldState.error]}/>
                                            )
                                        }
                                    </Field>
                                )}
                    />
                </section>
                <div className="flex justify-end border-t pt-6 gap-2">
                    <Button type="submit" disabled={loading}>
                        {loading && (
                            <span className="sr-only">Saving funeral event...</span>
                        )}
                        {submitText}
                    </Button>
                    <Button variant={"outline"} onClick={()=>navigate(-1)}>
                        Cancel
                    </Button>
                </div>
            </form>
        </div>
    );
}