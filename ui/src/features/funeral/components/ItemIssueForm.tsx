import {zodResolver} from "@hookform/resolvers/zod";
import {Controller, useForm, useWatch} from "react-hook-form";

import {type ItemIssueFormValues, itemIssueSchema,} from "../schemas/item-issue.schema";

import {Field, FieldContent, FieldDescription, FieldError, FieldGroup, FieldLabel,} from "@/shared/components/ui/field";

import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from "@/shared/components/ui/select";

import {Input} from "@/shared/components/ui/input";
import {Button} from "@/shared/components/ui/button";

import {Box, Hash, Package, PackagePlus,} from "lucide-react";

interface InventoryItem {
    itemId: string;
    itemCode: string;
    itemName: string;
}

interface Props {
    funeralId: string;

    items: InventoryItem[];

    loading?: boolean;

    defaultValues?: Partial<ItemIssueFormValues>;

    submitText?: string;

    onCancel: () => void;

    onSubmit(
        values: ItemIssueFormValues
    ): Promise<void> | void;
}

export default function ItemIssueForm({
                                          funeralId,
                                          items,
                                          loading = false,
                                          submitText = "Issue Item",
                                          defaultValues,
                                          onSubmit,
                                          onCancel
                                      }: Props) {
    const form = useForm<ItemIssueFormValues>({
        resolver: zodResolver(itemIssueSchema),
        defaultValues: {
            funeralId,
            quantity: 1,
            ...defaultValues,
        },
    });

    const selectedCode = useWatch({
        control: form.control,
        name: "itemCode",
    });

    const selectedItem = items.find(
        (i) => i.itemCode === selectedCode
    );

    return (
        <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mx-auto max-w-2xl space-y-8"
        >
            {/* Header */}

            <div className="space-y-2 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                    <PackagePlus className="h-7 w-7 text-primary"/>
                </div>

                <h2 className="text-2xl font-bold">
                    Issue Inventory Item
                </h2>

                <p className="text-muted-foreground">
                    Allocate inventory items for this funeral event.
                </p>
            </div>

            {/* Inventory */}

            <section className="rounded-xl border bg-card p-6 space-y-6">

                <div className="space-y-1">
                    <h3 className="font-semibold flex items-center gap-2">
                        <Package className="h-5 w-5 text-primary"/>
                        Inventory Item
                    </h3>

                    <p className="text-sm text-muted-foreground">
                        Select the inventory item to issue.
                    </p>
                </div>

                <FieldGroup>

                    <Controller
                        control={form.control}
                        name="itemCode"
                        render={({field, fieldState}) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel>
                                    Inventory Item
                                </FieldLabel>
                                <FieldContent>
                                    <Select
                                        value={field.value}
                                        onValueChange={field.onChange}
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select inventory item">
                                                {items.find(i => i.itemId == field.value)?.itemName}
                                            </SelectValue>
                                        </SelectTrigger>
                                        <SelectContent>
                                            {items.map((item) => (
                                                <SelectItem
                                                    key={item.itemCode}
                                                    value={item.itemCode}
                                                >
                                                    {item.itemName}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>

                                </FieldContent>

                                <FieldDescription>
                                    Choose an inventory item.
                                </FieldDescription>

                                {fieldState.error && (
                                    <FieldError
                                        errors={[fieldState.error]}
                                    />
                                )}

                            </Field>
                        )}
                    />

                </FieldGroup>

                {selectedItem && (

                    <div className="rounded-lg border bg-muted/30 p-4">

                        <div className="flex items-start gap-3">

                            <Box className="mt-1 h-5 w-5 text-primary"/>

                            <div>

                                <p className="font-medium">
                                    {selectedItem.itemName}
                                </p>

                                <p className="text-sm text-muted-foreground">
                                    Item Code: {selectedItem.itemCode}
                                </p>

                            </div>

                        </div>

                    </div>

                )}

            </section>

            {/* Quantity */}

            <section className="rounded-xl border bg-card p-6 space-y-6">

                <div className="space-y-1">

                    <h3 className="font-semibold">
                        Quantity
                    </h3>

                    <p className="text-sm text-muted-foreground">
                        Specify the quantity to issue.
                    </p>

                </div>

                <FieldGroup>

                    <Controller
                        control={form.control}
                        name="quantity"
                        render={({field, fieldState}) => (

                            <Field data-invalid={fieldState.invalid}>

                                <FieldLabel>
                                    Quantity
                                </FieldLabel>

                                <FieldContent>

                                    <div className="relative">

                                        <Hash className="absolute left-3 top-3 h-4 w-4 text-muted-foreground"/>

                                        <Input
                                            aria-label={'quantity'}
                                            type="number"
                                            min={1}
                                            className="pl-10"
                                            {...field}
                                            onChange={(e) => field.onChange(Number(e.target.value))}

                                        />

                                    </div>

                                </FieldContent>

                                <FieldDescription>
                                    Number of items to issue.
                                </FieldDescription>

                                {fieldState.error && (
                                    <FieldError
                                        errors={[fieldState.error]}
                                    />
                                )}

                            </Field>

                        )}
                    />

                </FieldGroup>

            </section>

            <div className="flex justify-end border-t pt-6 gap-4">
                <Button variant="outline" onClick={onCancel}>
                    Cancel
                </Button>
                <Button
                    type="submit"
                    disabled={loading}
                >
                    {
                        loading && (
                            <span className="sr-only">
                                Issuing item...
                            </span>
                        )
                    }

                    <PackagePlus className="mr-2 h-4 w-4"/>

                    {submitText}

                </Button>

            </div>

        </form>
    );
}