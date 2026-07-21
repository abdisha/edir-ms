import {Controller, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Building2, CalendarIcon, Loader2, MapPin} from "lucide-react";
import {format} from "date-fns";

import {type CreateEdirFormValues, createEdirSchema,} from "@/features/edir/schemas/edir.schema.ts";

import {Button} from "@/shared/components/ui/button";
import {Input} from "@/shared/components/ui/input";
import {Textarea} from "@/shared/components/ui/textarea";
import {Field, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldSet} from "@/shared/components/ui/field";
import {Popover, PopoverContent, PopoverTrigger,} from "@/shared/components/ui/popover";
import {Calendar} from "@/shared/components/ui/calendar";

interface EdirFormProps {
    defaultValues?: Partial<CreateEdirFormValues>,
    loading?: boolean,
    submitText?: string,

    onSubmit(values: CreateEdirFormValues): void | Promise<void>,

    onCancel(): void | Promise<void>
}

export function EdirForm({
                             defaultValues,
                             loading = false,
                             submitText = "Save Edir",
                             onSubmit,
                             onCancel
                         }: EdirFormProps) {
    const {
        register,
        control,
        handleSubmit,
        formState: {errors},
    } = useForm<CreateEdirFormValues>({
        resolver: zodResolver(createEdirSchema),
        defaultValues: {
            edirName: "",
            establishedDate: new Date(),
            description: "",
            phoneNumber: "",
            address: {city: "", subcity: "", worda: ""},
            ...defaultValues,
        },
    });

    return (
        <FieldSet className="w-full">
            <div className="w-full">
                <form onSubmit={handleSubmit(onSubmit)} className="mx-auto max-w-4xl">
                {/* Header Card */}
                <div className="mb-8 rounded-lg border bg-gradient-to-r from-primary/5 to-primary/10 p-6">
                    <h1 className="text-2xl font-bold">Edir Information</h1>
                    <p className="mt-2 text-sm text-muted-foreground">
                        Create or update the profile and configuration details for your organization.
                    </p>
                </div>

                {/* Basic Information Section */}
                <div className="mb-8 rounded-lg border bg-card p-6">
                    <div className="mb-6 flex items-center gap-3">
                        <div className="rounded-lg bg-primary/10 p-2">
                            <Building2 className="h-5 w-5 text-primary" />
                        </div>
                        <h2 className="text-lg font-semibold">Basic Information</h2>
                    </div>

                    <FieldGroup className="space-y-4">
                        {/* Edir Name */}
                        <Field>
                            <FieldLabel htmlFor="edirName">Edir Name</FieldLabel>
                            <Input
                                aria-label={'edir-name'}
                                id="edirName"
                                placeholder="Bole Medhanialem Edir"
                                {...register("edirName")}
                            />
                            {errors.edirName && (
                                <FieldError errors={[errors.edirName]} />
                            )}
                        </Field>

                        {/* Description */}
                        <Field>
                            <FieldLabel htmlFor="description">Description</FieldLabel>
                            <FieldDescription>
                                Give more detailed information about your edir.
                            </FieldDescription>
                            <Textarea
                                aria-label={'description'}
                                id="description"
                                rows={4}
                                placeholder="Provide a brief background or purpose of the Edir..."
                                className="resize-none"
                                {...register("description")}
                            />
                            {errors.description && (
                                <FieldError errors={[errors.description]} />
                            )}
                        </Field>

                        {/* Phone Number */}
                        <Field>
                            <FieldLabel htmlFor="phoneNumber">Phone Number</FieldLabel>
                            <div className="relative">
                                <Input
                                    aria-label={'phone'}
                                    id="phoneNumber"
                                    placeholder="+251911223344"
                                    {...register("phoneNumber")}
                                />
                            </div>
                            {errors.phoneNumber && (
                                <FieldError errors={[errors.phoneNumber]} />
                            )}
                        </Field>

                        {/* Established Date */}
                        <Field>
                            <FieldLabel>Established Date</FieldLabel>
                            <Controller
                                defaultValue={new Date()}
                                rules={{required: true}}
                                name="establishedDate"
                                control={control}
                                render={({field}) => (
                                    <Popover>
                                        <PopoverTrigger>
                                            <Button
                                                variant="outline"
                                                className="w-full justify-start text-left font-normal"
                                            >
                                                <CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground"/>
                                                {field.value ? format(field.value, "PPP") : "Select date"}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={field.value}
                                                onSelect={field.onChange}
                                                captionLayout={'dropdown'}
                                                disabled={(date) => date > new Date()}
                                            />
                                        </PopoverContent>
                                    </Popover>
                                )}
                            />
                            {errors.establishedDate && (
                                <FieldError errors={[errors.establishedDate]} />
                            )}
                        </Field>
                    </FieldGroup>
                </div>

                {/* Address Section */}
                <div className="mb-8 rounded-lg border bg-card p-6">
                    <div className="mb-6 flex items-center gap-3">
                        <div className="rounded-lg bg-primary/10 p-2">
                            <MapPin className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold">Location Details</h2>
                            <p className="text-xs text-muted-foreground">Current location can be used to notify members.</p>
                        </div>
                    </div>

                    <FieldGroup className="grid gap-4 md:grid-cols-3">
                        {/* City */}
                        <Field>
                            <FieldLabel htmlFor="city">City</FieldLabel>
                            <Input
                                id="city"
                                aria-label={'city'}
                                placeholder="Addis Ababa"
                                {...register("address.city")}
                            />
                            {errors.address?.city && (
                                <FieldError errors={[errors.address.city]} />
                            )}
                        </Field>

                        {/* Subcity */}
                        <Field>
                            <FieldLabel htmlFor="subcity">Subcity</FieldLabel>
                            <Input
                                aria-label={'subcity'}
                                id="subcity"
                                placeholder="Kolfe"
                                {...register("address.subcity")}
                            />
                            {errors.address?.subcity && (
                                <FieldError errors={[errors.address.subcity]} />
                            )}
                        </Field>

                        {/* Woreda */}
                        <Field>
                            <FieldLabel htmlFor="worda">Woreda</FieldLabel>
                            <Input
                                aria-label={'worda'}
                                id="worda"
                                placeholder="01"
                                {...register("address.worda")}
                            />
                            {errors.address?.worda && (
                                <FieldError errors={[errors.address.worda]} />
                            )}
                        </Field>
                    </FieldGroup>
                </div>

                {/* Actions */}
                <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                    {submitText !== "Create Edir" && (
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onCancel}
                            disabled={loading}
                        >
                            Cancel
                        </Button>
                    )}

                    <Button
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Saving...
                            </>
                        ) : (
                            submitText
                        )}
                    </Button>
                </div>
            </form>
            </div>
        </FieldSet>
    );
}