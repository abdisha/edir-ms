import {CreditCard, Loader2, MapPin, Phone, User, Users} from "lucide-react";
import {Controller, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

import {type MemberFormValues, memberSchema,} from "@/features/edir/schemas/member.schema.ts";

import {Button} from "@/shared/components/ui/button";
import {Checkbox} from "@/shared/components/ui/checkbox";
import {Input} from "@/shared/components/ui/input";

import {Field, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldSet} from "@/shared/components/ui/field";

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
    onSubmit
}: MemberFormProps) {
    const form = useForm<MemberFormValues>({
        resolver: zodResolver(memberSchema) as any,

        defaultValues: {
            firstName: "",
            middleName: "",
            lastName: "",
            gender: "Male",
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

    const handleSubmit = async (values: MemberFormValues) => {
        await onSubmit(values);
        form.reset();
    };

    return (
        <FieldSet className="w-full">
            <div className="w-full">
                <form
                    id="form-member"
                    onSubmit={form.handleSubmit(handleSubmit)}
                    className="mx-auto max-w-4xl"
                >
                {/* Header Card */}
                <div className="mb-8 rounded-lg border bg-gradient-to-r from-primary/5 to-primary/10 p-6">
                    <div className="flex items-center gap-3">
                        <div className="rounded-lg bg-primary/10 p-2">
                            <Users  className="h-9 w-9 text-primary" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold">Member Information</h1>
                            <p className="mt-2 text-sm text-muted-foreground">
                                Register a new member or update existing member information.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Personal Information Section */}
                <div className="mb-8 rounded-lg border bg-card p-6">
                    <div className="mb-6 flex items-center gap-3">
                        <div className="rounded-lg bg-primary/10 p-2">
                            <User className="h-5 w-5 text-primary" />
                        </div>
                        <h2 className="text-lg font-semibold">Personal Information</h2>
                    </div>

                    <FieldGroup className="grid gap-4 md:grid-cols-2">
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
                                        aria-label={'firstname'}
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
                                        aria-label={'middle name'}
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
                                    <FieldLabel>Phone Number</FieldLabel>
                                    <div className="relative">
                                        <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            className="pl-10"
                                            placeholder="+251911223344"
                                            {...field}
                                        />
                                    </div>
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
                                    <FieldLabel>Gender</FieldLabel>
                                    <Select value={field.value} onValueChange={field.onChange}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select gender" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Male" >Male</SelectItem>
                                            <SelectItem value="Famale">Female</SelectItem>
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
                                    <FieldLabel>Age</FieldLabel>
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
                </div>

                {/* Address Section */}
                <div className="mb-8 rounded-lg border bg-card p-6">
                    <div className="mb-6 flex items-center gap-3">
                        <div className="rounded-lg bg-primary/10 p-2">
                            <MapPin className="h-5 w-5 text-primary" />
                        </div>
                        <h2 className="text-lg font-semibold">Address</h2>
                    </div>

                    <FieldGroup className="grid gap-4 md:grid-cols-2">
                        {/* City */}
                        <Controller
                            name="address.city"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel>City</FieldLabel>
                                    <Input
                                        placeholder="Addis Ababa"
                                        {...field}
                                    />
                                    {fieldState.error && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />

                        {/* Subcity */}
                        <Controller
                            name="address.subcity"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel>Subcity</FieldLabel>
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
                                    <FieldLabel>Woreda</FieldLabel>
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
                </div>

                {/* Registration Section */}
                <div className="mb-8 rounded-lg border bg-card p-6">
                    <div className="mb-6 flex items-center gap-3">
                        <div className="rounded-lg bg-primary/10 p-2">
                            <CreditCard className="h-5 w-5 text-primary" />
                        </div>
                        <h2 className="text-lg font-semibold">Registration</h2>
                    </div>

                    <Controller
                        name="applyRegistrationFee"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field>
                                <div className="rounded-lg border border-dashed bg-muted/30 p-4">
                                    <div className="flex items-start gap-4">
                                        <Checkbox
                                            aria-invalid={fieldState.invalid}
                                            id="applyRegistrationFee"
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                            className="mt-1"
                                        />
                                        <div className="flex-1">
                                            <FieldLabel htmlFor="applyRegistrationFee" className="text-base font-medium">
                                                Apply Registration Fee
                                            </FieldLabel>
                                            <FieldDescription className="mt-1">
                                                Charge the one-time registration fee when creating this member.
                                            </FieldDescription>
                                        </div>
                                        <div className="rounded-lg border bg-background px-4 py-3 text-right">
                                            <p className="text-xs font-medium text-muted-foreground">Registration Fee</p>
                                            <p className="mt-1 text-2xl font-bold text-primary">5,000 ETB</p>
                                        </div>
                                    </div>
                                    {fieldState.error && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </div>
                            </Field>
                        )}
                    />
                </div>

                {/* Actions */}
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