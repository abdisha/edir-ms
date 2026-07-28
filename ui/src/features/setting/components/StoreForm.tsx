import {Controller, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";

import {
    Field,
    FieldContent,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
    FieldLegend,
    FieldSet,
} from "@/shared/components/ui/field";

import {Input} from "@/shared/components/ui/input";
import {Button} from "@/shared/components/ui/button";

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/shared/components/ui/select";
import {MapPin, Store} from "lucide-react";
import type {Member} from "@/features/setting/types.ts";

const schema = z.object({
    name: z.string().min(2),
    location: z.string().min(2),
    ownerId: z.string().uuid("Please select an owner"),
});

type FormValues = z.infer<typeof schema>;


interface Props {
    onCancel: () => void;
    members: Member[];
    onSubmit: (data: FormValues) => void;
    initialValues?: FormValues;
}

export default function InventoryStoreForm({
                                               onCancel,
                                               initialValues,
                                               members,
                                               onSubmit,
                                           }: Props) {
    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>({
        resolver: zodResolver(schema),
        defaultValues: {
            name: "",
            location: "",
            ownerId: "",
            ...initialValues,
        },
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <FieldSet>
                <FieldLegend>Store Information</FieldLegend>

                <FieldGroup>
                    <Controller
                        control={control}
                        name="ownerId"
                        rules={{ required: true }}
                        render={({ field }) => (
                            <Field data-invalid={!!errors.ownerId}>
                                <FieldLabel>Store Owner</FieldLabel>

                                <FieldContent>
                                    <Select
                                        value={field.value}
                                        onValueChange={field.onChange}
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select store owner">
                                                {members.find((member) => member.memberId === field.value)?.fullName}
                                            </SelectValue>
                                        </SelectTrigger>

                                        <SelectContent>
                                            <SelectGroup>
                                            {members.map((member) => (
                                                <SelectItem
                                                    key={member.memberId}
                                                    value={member.memberId}
                                                >
                                                    {member.fullName}
                                                </SelectItem>
                                            ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </FieldContent>

                                <FieldError>{errors.ownerId?.message}</FieldError>
                            </Field>
                        )}
                    />
                    <Field data-invalid={!!errors.name}>
                        <FieldLabel className="flex items-center gap-2">
                            <Store className="h-4 w-4 text-muted-foreground" />
                            Store Name
                            <span className="text-destructive">*</span>
                        </FieldLabel>

                        <FieldDescription>
                            Give the inventory store a unique and recognizable name.
                        </FieldDescription>

                        <FieldContent>
                            <Input
                                aria-label={'Store Name'}
                                placeholder="e.g. Main Warehouse"
                                {...register("name")}
                            />
                        </FieldContent>

                        <FieldError>{errors.name?.message}</FieldError>
                    </Field>

                    <Field data-invalid={!!errors.location}>
                        <FieldLabel className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            Location
                            <span className="text-destructive">*</span>
                        </FieldLabel>

                        <FieldDescription>
                            Enter the physical location where inventory is stored.
                        </FieldDescription>

                        <FieldContent>
                            <Input
                                aria-label={'Store Location'}
                                placeholder="e.g. Addis Ababa, Bole"
                                {...register("location")}
                            />
                        </FieldContent>

                        <FieldError>{errors.location?.message}</FieldError>
                    </Field>


                </FieldGroup>
            </FieldSet>

            <div className="flex justify-end gap-2">

                <Button type="submit">
                    Save Store
                </Button>
                <Button variant="outline" type="button" onClick={onCancel}>
                    Cancel
                </Button>
            </div>
        </form>
    );
}