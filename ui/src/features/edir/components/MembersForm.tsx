import {CreditCard, MapPin, Phone, User} from "lucide-react";
import {Controller, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

import {type MemberFormValues, memberSchema,} from "@/features/schemas/member.schema.ts";

import {Button} from "@/shared/components/ui/button";
import {Checkbox} from "@/shared/components/ui/checkbox";
import {Input} from "@/shared/components/ui/input";

import {
    Field,
    FieldContent,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
    FieldLegend,
    FieldSeparator,
    FieldSet
} from "@/shared/components/ui/field";

import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/shared/components/ui/select";

interface MemberFormProps {
    defaultValues?: Partial<MemberFormValues>;

    loading?: boolean;

    submitText?: string;

    onCancel?(): void;

    onSubmit(
        values: MemberFormValues
    ): void | Promise<void>;
}

export function MemberForm({
    defaultValues,
    loading = false,
    submitText = "Save Member",
    onCancel,
    onSubmit,
}: MemberFormProps) {
    const form = useForm<MemberFormValues>({
        resolver: zodResolver(memberSchema) as any,

        defaultValues: {
            firstName: "",
            middleName: "",
            lastName: "",
            gender: "F",
            age: 18,
            phoneNumber: "",
            applyRegistrationFee: false,

            address: {
                city: "",
                subcity: "",
                woreda: ""
            },

            ...defaultValues,
        },
    });

    return (
        <FieldSet className="w-full">
            <form
                id="form-member"
                onSubmit={form.handleSubmit(onSubmit)}
                className="mx-auto max-w-xl space-y-10"
            >
                {/* Header */}

                <FieldLegend className="space-y-1 text-center">
                    Member Information
                </FieldLegend>
                <FieldDescription className="text-center text-sm text-muted-foreground">
                    Register a new member or update existing
                    member information.
                </FieldDescription>

                <FieldSeparator className="my-4"> Personal Information </FieldSeparator>

                {/* ========================= */}
                {/* PERSONAL INFORMATION */}
                {/* ========================= */}

                <section className="space-y-4">

                    <div className="flex items-center gap-2">

                        <User className="h-5 w-5 text-primary" />

                        <h2 className="text-xl font-semibold">
                            Personal Information
                        </h2>

                    </div>

                    {/* <div className="grid gap-6 md:grid-cols-2"> */}
                    <FieldGroup className="grid gap-6 md:grid-cols-2">
                        {/* First Name */}
                        <Controller
                            name="firstName"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="firstName">
                                        First Name
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id="firstName"
                                        placeholder="Abebe"
                                        autoComplete="off"
                                    />
                                    {fieldState.error && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}

                        />
                        {/* Middle Name */}
                        <Controller
                            name="middleName"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="middleName">
                                        Middle Name
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id="middleName"
                                        placeholder="Kebede"
                                        autoComplete="off"
                                    />
                                    {fieldState.error && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />

                        {/* Last Name */}
                        <Controller
                            name="lastName"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="lastName">
                                        Last Name
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id="lastName"
                                        placeholder="Bekele"
                                        autoComplete="off"
                                    />
                                    {fieldState.error && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />

                        {/* Phone */}
                        <Controller
                            name="phoneNumber"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel>
                                        Phone Number
                                    </FieldLabel>
                                    <div className="relative">

                                        <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                    </div>
                                    <Input
                                        className="pl-10"
                                        placeholder="+251911223344"
                                        {...field}
                                    />
                                    {fieldState.error && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}

                                </Field>
                            )}
                        />
                        {/* Gender */}
                        <Controller
                            name="gender"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel>
                                        Gender
                                    </FieldLabel>
                                    <Select {...field} value={field.name ?? ""}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select gender" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="M">Male</SelectItem>
                                            <SelectItem value="F">Female</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {fieldState.error && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />

                        {/* Age */}
                        <Controller
                            name="age"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel>
                                        Age
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        type="number"
                                        placeholder="30"
                                    />
                                    {fieldState.error && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                    </FieldGroup>
                </section>

                <FieldSeparator className="my-4"> Address </FieldSeparator>

                {/* ========================= */}
                {/* ADDRESS */}
                {/* ========================= */}

                <section className="space-y-4">

                    <div className="flex items-center gap-2">

                        <MapPin className="h-5 w-5 text-primary" />

                        <h2 className="text-xl font-semibold">
                            Address
                        </h2>

                    </div>

                    <FieldGroup className="grid gap-6 md:grid-cols-2">

                        {/* City */}
                        <Controller
                            name="address.city"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel>
                                        City
                                    </FieldLabel>
                                    <Input
                                        placeholder="Addis Ababa"
                                        {...field}
                                    />
                                    {fieldState.error && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />                          {/* Subcity */}

                        <Controller
                            name="address.subcity"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel>
                                        Subcity
                                    </FieldLabel>
                                    <Input
                                        placeholder="Bole"
                                        {...field}
                                    />
                                    {fieldState.error && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />

                        {/* Woreda */}

                        <Controller
                            name="address.woreda"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel>
                                        Woreda
                                    </FieldLabel>
                                    <Input
                                        placeholder="Woreda 03"
                                        {...field}
                                    />
                                    {fieldState.error && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />

                    </FieldGroup>
                </section>

                <FieldSeparator className="my-4"> Registration </FieldSeparator>

                {/* ========================= */}
                {/* REGISTRATION */}
                {/* ========================= */}

                <section className="space-y-4">

                    <div className="flex items-center gap-2">

                        <CreditCard className="h-5 w-5 text-primary" />

                        <h2 className="text-xl font-semibold">
                            Registration
                        </h2>

                    </div>

                    <div className="rounded-xl border bg-muted/30 p-6">
                        <Controller
                            name="applyRegistrationFee"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field
                                    orientation="horizontal"
                                    className="space-y-1">
                                    <Checkbox
                                        aria-invalid={fieldState.invalid}
                                        id="applyRegistrationFee"
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                    {fieldState.error && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                    <FieldContent>
                                        <FieldLabel
                                            htmlFor="applyRegistrationFee">
                                            Apply Registration Fee
                                        </FieldLabel>
                                        <FieldDescription>
                                            Charge the one-time registration fee when
                                            creating this member.
                                        </FieldDescription>
                                    </FieldContent>
                                    <div className="rounded-md border bg-background px-3 py-2">

                                        <p className="text-sm font-medium">
                                            Registration Fee
                                        </p>

                                        <p className="text-2xl font-bold text-primary">
                                            5,000 ETB
                                        </p>

                                    </div>
                                </Field>
                            )}
                        />

                    </div>

                </section>

                <FieldSeparator className="my-4"> Actions </FieldSeparator>

                {/* ========================= */}
                {/* ACTIONS */}
                {/* ========================= */}

                <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

                    <Button
                        type="button"
                        variant="outline"
                        onClick={onCancel}
                    >
                        Cancel
                    </Button>

                    <Button
                        type="submit"
                        disabled={loading}
                    >
                        {loading
                            ? "Saving Member..."
                            : submitText}
                    </Button>

                </div>

            </form>
        </FieldSet>
    );
}