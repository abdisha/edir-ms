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

import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from "@/shared/components/ui/select";
import {MapPin, Store} from "lucide-react";

const schema = z.object({
    name: z.string().min(2),
    location: z.string().min(2),
    ownerId: z.string().uuid("Please select an owner"),
});

type FormValues = z.infer<typeof schema>;

interface Member {
    id: string;
    fullName: string;
}

interface Props {
    members: Member[];
    onSubmit: (data: FormValues) => void;
}

export default function InventoryStoreForm({
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
                        render={({ field }) => (
                            <Field invalid={!!errors.ownerId}>
                                <FieldLabel>Store Owner</FieldLabel>

                                <FieldContent>
                                    <Select
                                        value={field.value}
                                        onValueChange={field.onChange}
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select store owner" />
                                        </SelectTrigger>

                                        <SelectContent>
                                            {members.map((member) => (
                                                <SelectItem
                                                    key={member.id}
                                                    value={member.id}
                                                >
                                                    {member.fullName}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </FieldContent>

                                <FieldError>{errors.ownerId?.message}</FieldError>
                            </Field>
                        )}
                    />
                    <Field invalid={!!errors.name}>
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
                                placeholder="e.g. Main Warehouse"
                                {...register("name")}
                            />
                        </FieldContent>

                        <FieldError>{errors.name?.message}</FieldError>
                    </Field>

                    <Field invalid={!!errors.location}>
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
                                placeholder="e.g. Addis Ababa, Bole"
                                {...register("location")}
                            />
                        </FieldContent>

                        <FieldError>{errors.location?.message}</FieldError>
                    </Field>


                </FieldGroup>
            </FieldSet>

            <div className="flex justify-end gap-2">
                <Button variant="outline" type="button">
                    Cancel
                </Button>

                <Button type="submit">
                    Save Store
                </Button>
            </div>
        </form>
    );
}