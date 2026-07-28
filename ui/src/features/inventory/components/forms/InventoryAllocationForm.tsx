import {zodResolver} from "@hookform/resolvers/zod";
import {Controller, useForm} from "react-hook-form";
import {Hash, Package, User} from "lucide-react";

import {Field, FieldContent, FieldDescription, FieldGroup, FieldLabel,} from "@/shared/components/ui/field";

import {Button} from "@/shared/components/ui/button";
import {Input} from "@/shared/components/ui/input";

import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from "@/shared/components/ui/select";
import {
    type InventoryAllocationFormValues,
    inventoryAllocationSchema
} from "@/features/inventory/schemas/inventory-allocation.schema.ts";

interface MemberOption {
    id: string;
    fullName: string;
}

interface InventoryAllocationFormProps {
    defaultValues?: Partial<InventoryAllocationFormValues>;
    itemId: string;
    itemName: string;
    members: MemberOption[];
    loading?: boolean;
    submitText?: string;
    onSubmit: (
        values: InventoryAllocationFormValues
    ) => Promise<void> | void;
}

export default function InventoryAllocationForm({
    defaultValues,
    itemId,
    itemName,
    members,
    loading = false,
    submitText = "Allocate Item",
    onSubmit,
}: InventoryAllocationFormProps) {

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<InventoryAllocationFormValues>({
        resolver: zodResolver(inventoryAllocationSchema),

        defaultValues: {
            item: itemId,
            quantity: 1,
            memberId: "",
            ...defaultValues,
        },
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <FieldGroup>
                <Field>
                    <FieldLabel>Selected Inventory Item</FieldLabel>
                    <FieldContent>
                        <div className="rounded-lg border bg-muted/40 p-4">
                            <div className="flex items-start gap-3">
                                <Package className="mt-0.5 h-5 w-5 text-primary" />
                                <div className="space-y-1">
                                    <p className="font-medium">{itemName}</p>
                                    <p className="text-xs text-muted-foreground break-all">
                                        {itemId}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </FieldContent>
                    <FieldDescription>The selected inventory item cannot be changed.</FieldDescription>
                </Field>
            </FieldGroup>

            <FieldGroup>
                <Field>
                    <FieldLabel>Quantity</FieldLabel>
                    <FieldContent>
                        <Controller
                            name="quantity"
                            control={control}
                            render={({ field }) => (
                                <div className="relative">
                                    <Hash className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        type="number"
                                        min={1}
                                        className="pl-9"
                                        value={field.value}
                                        onChange={(e) => field.onChange(Number(e.target.value))}
                                    />
                                </div>
                            )}
                        />
                    </FieldContent>
                    <FieldDescription>Enter the quantity to allocate.</FieldDescription>
                    {errors.quantity && (
                        <p className="text-sm text-destructive">{errors.quantity.message}</p>
                    )}
                </Field>

                <Field>
                    <FieldLabel>Allocate To Member</FieldLabel>
                    <FieldContent>
                        <Controller
                            name="memberId"
                            control={control}
                            render={({ field }) => (
                                <Select value={field.value} onValueChange={field.onChange}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select member" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {members.map((member) => (
                                            <SelectItem key={member.id} value={member.id}>
                                                <div className="flex items-center gap-2">
                                                    <User className="h-4 w-4" />
                                                    {member.fullName}
                                                </div>
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            )}
                        />
                    </FieldContent>
                    <FieldDescription>Select the member who will receive this item.</FieldDescription>
                    {errors.memberId && (
                        <p className="text-sm text-destructive">{errors.memberId.message}</p>
                    )}
                </Field>
            </FieldGroup>

            <div className="flex justify-end gap-3 border-t pt-6">
                <Button type="submit" disabled={loading}>
                    {submitText}
                </Button>
            </div>
        </form>
    );
}