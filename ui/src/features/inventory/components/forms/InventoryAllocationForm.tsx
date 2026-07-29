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
import type {StoreAllocationSummary} from "@/features/inventory/types.ts";


interface InventoryAllocationFormProps {
    defaultValues?: Partial<InventoryAllocationFormValues>;
    itemId: string;
    itemName: string;
    stores: StoreAllocationSummary[];
    loading?: boolean;
    submitText?: string;
    onCancel?: () => void;
    onSubmit: (
        values: InventoryAllocationFormValues
    ) => Promise<void> | void;
}

export default function InventoryAllocationForm({
    defaultValues,
    itemId,
    itemName,
    stores,
    loading = false,
    submitText = "Allocate Item",
    onSubmit,
    onCancel
}: InventoryAllocationFormProps) {

    const {
        control,
        handleSubmit,
        formState: { errors,isValid},
    } = useForm<InventoryAllocationFormValues>({
        resolver: zodResolver(inventoryAllocationSchema),

        defaultValues: {
            quantity: 1,
            storeId: "",
            ...defaultValues,
        },
    });

    return (
        <form onSubmit={handleSubmit(onSubmit,(errors) => console.log(errors))} className="space-y-8">
            <FieldGroup>
                <Field>
                    <FieldLabel>Selected Inventory Item</FieldLabel>
                    isValid: {isValid}
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
                                        placeholder="Quantity"
                                        aria-label={'Quantity'}
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
                    <FieldLabel>Allocate To Store</FieldLabel>

                        <Controller
                            name="storeId"
                            control={control}
                            render={({ field }) => (
                                <Select  value={field.value} onValueChange={field.onChange}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Store">
                                            {stores.find((store) => store.storeId === field.value)?.storeName}
                                        </SelectValue>
                                    </SelectTrigger>
                                    <SelectContent>
                                        {stores.map((store) => (
                                            <SelectItem key={store.storeId} value={store.storeId}>
                                                <div className="flex items-center gap-2">
                                                    <User className="h-4 w-4" />
                                                    {store.storeName}
                                                </div>
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            )}
                        />

                    <FieldDescription>Select the Store who will receive this item.</FieldDescription>
                    {errors.storeId && (
                        <p className="text-sm text-destructive">{errors.storeId.message}</p>
                    )}
                </Field>
            </FieldGroup>

            <div className="flex justify-end gap-3 border-t pt-6">
                <Button type="button" variant={'outline'} onClick={onCancel} disabled={loading}>
                    Cancel
                </Button>
                <Button type="submit"  disabled={loading}>
                    {
                        loading? <p className="text-sm">Allocating..</p>:submitText
                    }

                </Button>
            </div>
        </form>
    );
}