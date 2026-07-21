import {Controller, useForm} from "react-hook-form";

import {Button} from "@/shared/components/ui/button";
import {Input} from "@/shared/components/ui/input";
import {Textarea} from "@/shared/components/ui/textarea";

import {
    Field,
    FieldContent,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
    FieldSet,
} from "@/shared/components/ui/field";

import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from "@/shared/components/ui/select";

import {type ContributionFormValues, contributionSchema} from "../schemas/contribution.schema.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {Switch} from "@/shared/components/ui/switch.tsx";
import {Popover, PopoverContent, PopoverTrigger} from "@/shared/components/ui/popover.tsx";
import {AlertCircle, CalendarIcon, CreditCard} from "lucide-react";
import {format} from "date-fns";
import {Calendar} from "@/shared/components/ui/calendar.tsx";

type Props = {
    onSubmit: (values: ContributionFormValues) => void;
    isSubmitting?: boolean;
    defaultValues?: Partial<ContributionFormValues>;
};

export function ContributionForm({
                                     defaultValues,
                                     onSubmit,
                                     isSubmitting = false,
                                 }: Props) {
    const form = useForm<ContributionFormValues>({
        resolver: zodResolver(contributionSchema),
        defaultValues: {
            name: "",
            description: "",
            startDate: undefined,
            endDate: undefined,
            dueDate: undefined,
            contributionAmount: 10,
            penaltyAmount: 0,
            penaltyType: "FIXED",
            applyPenalty: false,
            ...defaultValues
        },
    });
    const applyPenalty = form.watch("applyPenalty");

    return (
        <FieldSet className="w-full">
            <div className="w-full">
        <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mx-auto max-w-4xl space-y-4"
        >
            {/* Header */}
            <div className="mb-4 rounded-lg border bg-gradient-to-r from-primary/5 to-primary/10 p-6">
                <div className="flex items-start gap-4">
                    <div className="rounded-lg bg-primary/10 p-2">
                        <CreditCard className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold">Create Contribution</h1>
                        <p className="mt-1 text-sm text-muted-foreground">Setup contribution details, schedule and penalties.</p>
                    </div>
                </div>
            </div>

            {/* Basic Info */}
            <div className="rounded-lg border bg-card p-6">
                <div className="mb-4 flex items-start gap-4">
                    <div className="rounded-lg bg-primary/10 p-2">
                        <CreditCard className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold">Basic Information</h2>
                        <p className="mt-1 text-sm text-muted-foreground">Provide a name, total amount and a short description for this contribution.</p>
                    </div>
                </div>
                <FieldSet>
                    <FieldGroup className="grid md:grid-cols-1 gap-4">
                        <Controller
                            control={form.control}
                            name="name"
                            render={({field, fieldState}) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel>Name</FieldLabel>
                                    <Input
                                        placeholder="Monthly Contribution"
                                        {...field}
                                    />
                                    <FieldError errors={[fieldState.error]}/>
                                </Field>
                            )}
                        />

                        <Controller
                            control={form.control}
                            name="description"
                            render={({field, fieldState}) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel>Description</FieldLabel>
                                    <Textarea rows={2} placeholder="Short description" {...field} />
                                    <FieldError errors={[fieldState.error]}/>
                                </Field>
                            )}
                        />

                        <Controller
                            control={form.control}
                            name="contributionAmount"
                            render={({field, fieldState}) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel>Amount (ETB)</FieldLabel>
                                    <Input
                                        type="number"
                                        min={0}
                                        {...field}
                                        onChange={(e) => field.onChange(Number(e.target.value))}
                                    />
                                    <FieldError errors={[fieldState.error]}/>
                                </Field>
                            )}
                        />

                    </FieldGroup>
                </FieldSet>
            </div>

            {/* Dates */}
            <div className="rounded-lg border bg-card p-6">
                <div className="mb-4 flex items-start gap-4">
                    <div className="rounded-lg bg-primary/10 p-2">
                        <CalendarIcon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold">Schedule</h2>
                        <p className="mt-1 text-sm text-muted-foreground">Select the contribution start, end and due dates.</p>
                    </div>
                </div>
                <FieldSet>
                    <FieldGroup className="grid md:grid-cols-3 gap-4">
                        <Controller
                            rules={{required: true}}
                            name="startDate"
                            control={form.control}
                            render={({field, fieldState}) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel>Start Date</FieldLabel>
                                    <Popover>
                                        <PopoverTrigger>
                                            <Button variant="outline" className="w-full justify-start text-left font-normal">
                                                <CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground"/>
                                                {field.value ? format(field.value, "PPP") : "Select date"}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent>
                                            <Calendar
                                                animate={true}
                                                mode="single"
                                                selected={field.value}
                                                onSelect={field.onChange}
                                                captionLayout={'dropdown'}
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <FieldError errors={[fieldState.error]}/>
                                </Field>
                            )}
                        />

                        <Controller
                            rules={{required: true}}
                            name="endDate"
                            control={form.control}
                            render={({field, fieldState}) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel>End Date</FieldLabel>
                                    <Popover>
                                        <PopoverTrigger>
                                            <Button variant="outline" className="w-full justify-start text-left font-normal">
                                                <CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground"/>
                                                {field.value ? format(field.value, "PPP") : "Select date"}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent>
                                            <Calendar
                                                animate={true}
                                                mode="single"
                                                selected={field.value}
                                                onSelect={field.onChange}
                                                captionLayout={'dropdown'}
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <FieldError errors={[fieldState.error]}/>
                                </Field>
                            )}
                        />

                        <Controller
                            rules={{required: true}}
                            name="dueDate"
                            control={form.control}
                            render={({field, fieldState}) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel>Due Date</FieldLabel>
                                    <Popover>
                                        <PopoverTrigger>
                                            <Button variant="outline" className="w-full justify-start text-left font-normal">
                                                <CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground"/>
                                                {field.value ? format(field.value, "PPP") : "Select date"}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent>
                                            <Calendar
                                                animate={true}
                                                mode="single"
                                                selected={field.value}
                                                onSelect={field.onChange}
                                                captionLayout={'dropdown'}
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <FieldError errors={[fieldState.error]}/>
                                </Field>
                            )}
                        />
                    </FieldGroup>
                </FieldSet>
            </div>

            {/* Penalty */}
            <div className="rounded-lg border bg-card p-6">
                <div className="mb-4 flex items-start gap-4">
                    <div className="rounded-lg bg-primary/10 p-2">
                        <AlertCircle className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold">Penalty Settings</h2>
                        <p className="mt-1 text-sm text-muted-foreground">Configure penalties applied to late payments and how they are calculated.</p>
                    </div>
                </div>
                <FieldSet>
                    <FieldGroup className="grid md:grid-cols-1 gap-4">
                        <Controller
                            control={form.control}
                            name="applyPenalty"
                            render={({field}) => (
                                <Field orientation="vertical">
                                    <FieldContent id={'penalty-on'}>
                                        <div className="flex items-center gap-3">
                                            <div className="rounded-lg bg-primary/10 p-2">
                                                <AlertCircle className="h-4 w-4 text-primary" />
                                            </div>
                                            <div>
                                                <FieldLabel htmlFor={'penalty-on'}>Apply Penalty</FieldLabel>
                                                <FieldDescription>Enable penalties for late payments.</FieldDescription>
                                            </div>
                                        </div>
                                    </FieldContent>

                                    <Switch id={'penalty-on'} checked={field.value} onCheckedChange={field.onChange} />
                                </Field>
                            )}
                        />

                        {applyPenalty ? (
                            <div className="space-y-4 md:col-span-1">
                                <Field>
                                    <FieldLabel>Penalty Amount</FieldLabel>
                                    <Controller
                                        control={form.control}
                                        name="penaltyAmount"
                                        render={({field, fieldState}) => (
                                            <>
                                                <Input type="number" min={0} {...field} onChange={(e)=>field.onChange(Number(e.target.value))} />
                                                <FieldError errors={[fieldState.error]}/>
                                            </>
                                        )}
                                    />
                                </Field>

                                <Field>
                                    <FieldLabel>Penalty Type</FieldLabel>
                                    <Controller
                                        control={form.control}
                                        name="penaltyType"
                                        render={({field, fieldState}) => (
                                            <>
                                                <Select value={field.value} onValueChange={field.onChange}>
                                                    <SelectTrigger>
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="FIXED">Fixed Amount</SelectItem>
                                                        <SelectItem value="PERCENTAGE">Percentage</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FieldError errors={[fieldState.error]}/>
                                            </>
                                        )}
                                    />
                                </Field>
                            </div>
                        ) : null}
                    </FieldGroup>
                </FieldSet>
            </div>

            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-start">
                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Saving..." : "Create Contribution"}
                </Button>
            </div>
        </form>
            </div>
            </FieldSet>

    );
}