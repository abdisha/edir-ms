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

import {type ContributionFormValues, contributionSchema} from "../schemas/contribution.schemas.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {Switch} from "@/shared/components/ui/switch.tsx";
import {Popover, PopoverContent, PopoverTrigger} from "@/shared/components/ui/popover.tsx";
import {CalendarIcon} from "lucide-react";
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
            startDate: null,
            endDate: null,
            dueDate: null,
            contributionAmount: 10,
            penaltyAmount: 0,
            penaltyType: "FIXED",
            ...defaultValues
        },
    });
    const applyPenalty = form.watch("applyPenalty");

    return (
        <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6"
        >
            <FieldSet>
                <FieldGroup>
                    <Controller
                        control={form.control}
                        name="name"
                        render={({field, fieldState}) => (
                            <Field data-invalid={fieldState.invalid} className={'md:w-1/4'}>
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
                            <Field data-invalid={fieldState.invalid} className={'md:w-2/4'}>
                                <FieldLabel>Description</FieldLabel>

                                <Textarea
                                    rows={4}
                                    placeholder="Contribution description"
                                    {...field}
                                />

                                <FieldError errors={[fieldState.error]}/>
                            </Field>
                        )}
                    />
                </FieldGroup>
            </FieldSet>

            <FieldSet>
                <FieldGroup className="grid md:grid-cols-2 gap-4 ">
                    <Controller
                        defaultValue={new Date()}
                        rules={{required: true}}
                        name="startDate"
                        control={form.control}
                        render={({field, fieldState}) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel>Start Date</FieldLabel>
                                <Popover>
                                    <PopoverTrigger className={' md:w-1/3'}>
                                        <Button
                                            variant="outline"
                                            className="w-full justify-start text-left   font-normal"
                                        >
                                            <CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground"/>
                                            {field.value ? format(field.value, "PPP") : "Select date"}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-full">
                                        <Calendar
                                            animate={true}
                                            mode="single"
                                            selected={field.value}
                                            onSelect={field.onChange}
                                            captionLayout={'dropdown'}
                                            disabled={(date) => date > new Date()}
                                        />
                                    </PopoverContent>
                                </Popover>
                                <FieldError errors={[fieldState.error]}/>
                            </Field>
                        )}
                    />
                    <Controller
                        defaultValue={new Date()}
                        rules={{required: true}}
                        name="endDate"
                        control={form.control}
                        render={({field, fieldState}) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel>End Date</FieldLabel>
                                <Popover>
                                    <PopoverTrigger className={' md:w-1/3'}>
                                        <Button
                                            variant="outline"
                                            className="w-full justify-start text-left   font-normal"
                                        >
                                            <CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground"/>
                                            {field.value ? format(field.value, "PPP") : "Select date"}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-full">
                                        <Calendar
                                            animate={true}
                                            mode="single"
                                            selected={field.value}
                                            onSelect={field.onChange}
                                            captionLayout={'dropdown'}
                                            disabled={(date) => date > new Date()}
                                        />
                                    </PopoverContent>
                                </Popover>
                                <FieldError errors={[fieldState.error]}/>
                            </Field>
                        )}
                    />
                    <Controller
                        defaultValue={new Date()}
                        rules={{required: true}}
                        name="dueDate"
                        control={form.control}
                        render={({field, fieldState}) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel>Due Date</FieldLabel>
                                <Popover>
                                    <PopoverTrigger className={' md:w-1/3'}>
                                        <Button
                                            variant="outline"
                                            className="w-full justify-start text-left   font-normal"
                                        >
                                            <CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground"/>
                                            {field.value ? format(field.value, "PPP") : "Select date"}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-full">
                                        <Calendar
                                            animate={true}
                                            mode="single"
                                            selected={field.value}
                                            onSelect={field.onChange}
                                            captionLayout={'dropdown'}
                                            disabled={(date) => date > new Date()}
                                        />
                                    </PopoverContent>
                                </Popover>
                                <FieldError errors={[fieldState.error]}/>
                            </Field>
                        )}
                    />
                    <Controller
                        control={form.control}
                        name="contributionAmount"
                        render={({field, fieldState}) => (
                            <Field data-invalid={fieldState.invalid} className={'md:w-1/3'}>
                                <FieldLabel>Contribution Amount</FieldLabel>

                                <Input
                                    type="number"
                                    min={0}
                                    {...field}
                                    onChange={(e) =>
                                        field.onChange(Number(e.target.value))
                                    }
                                />

                                <FieldError errors={[fieldState.error]}/>
                            </Field>
                        )}
                    />
                </FieldGroup>
            </FieldSet>

            <FieldSet>
                <FieldGroup className="grid md:grid-cols-2 gap-4">

                    <Controller
                        control={form.control}
                        name="applyPenalty"
                        render={({field}) => (
                            <Field orientation="vertical">
                                <FieldContent>
                                    <FieldLabel>Apply Penalty</FieldLabel>
                                    <FieldDescription>
                                        Enable penalties for members who pay after the due date.
                                    </FieldDescription>
                                </FieldContent>

                                <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                            </Field>
                        )}
                    />

                </FieldGroup>
            </FieldSet>
            {applyPenalty && (

                <FieldGroup className="grid md:grid-cols-2 gap-4">
                    <Controller
                        control={form.control}
                        name="penaltyAmount"
                        render={({field, fieldState}) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel>Penalty Amount</FieldLabel>

                                <Input
                                    type="number"
                                    min={0}
                                    {...field}
                                    onChange={(e) =>
                                        field.onChange(Number(e.target.value))
                                    }
                                />

                                <FieldError errors={[fieldState.error]}/>
                            </Field>
                        )}
                    />

                    <Controller
                        control={form.control}
                        name="penaltyType"
                        render={({field, fieldState}) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel>Penalty Type</FieldLabel>

                                <Select
                                    value={field.value}
                                    onValueChange={field.onChange}
                                >
                                    <SelectTrigger>
                                        <SelectValue/>
                                    </SelectTrigger>

                                    <SelectContent>
                                        <SelectItem value="FIXED">
                                            Fixed Amount
                                        </SelectItem>

                                        <SelectItem value="PERCENTAGE">
                                            Percentage
                                        </SelectItem>
                                    </SelectContent>
                                </Select>

                                <FieldError errors={[fieldState.error]}/>
                            </Field>
                        )}
                    />
                    <Controller
                        control={form.control}
                        name="penaltyAmount"
                        render={({field, fieldState}) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel>Penalty Amount</FieldLabel>

                                <Input
                                    type="number"
                                    min={0}
                                    {...field}
                                    onChange={(e) =>
                                        field.onChange(Number(e.target.value))
                                    }
                                />

                                <FieldError errors={[fieldState.error]}/>
                            </Field>
                        )}
                    />
                </FieldGroup>
            )}


            <Button
                type="submit"
                disabled={isSubmitting}
            >
                {isSubmitting ? "Saving..." : "Create Contribution"}
            </Button>
        </form>
    );
}