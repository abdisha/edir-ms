import {zodResolver} from "@hookform/resolvers/zod";
import {Controller, useForm} from "react-hook-form";

import {CheckCircle2, Hash, Package,} from "lucide-react";

import {Button} from "@/shared/components/ui/button";
import {
    Field,
    FieldContent,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
    FieldSet,
} from "@/shared/components/ui/field";

import {Input} from "@/shared/components/ui/input";
import {Separator} from "@/shared/components/ui/separator";
import {
    type InventoryIssueDecisionFormValues,
    inventoryIssueDecisionSchema
} from "@/features/inventory/schemas/inventory-approval-form.schema.ts";

interface InventoryIssueApprovalFormProps {
    funeralId: string;
    issueId: string;
    defaultQuantity?: number;
    loading?: boolean;
    onApprove: (
        values: InventoryIssueDecisionFormValues
    ) => void | Promise<void>;
    onCancel: () => void;
}


const InventoryIssueApprovalForm = ({
                                        funeralId,
                                        issueId,
                                        defaultQuantity = 1,
                                        loading = false,
                                        onApprove,
                                        onCancel,
                                    }: InventoryIssueApprovalFormProps) => {

    const form = useForm<InventoryIssueDecisionFormValues>({
        resolver: zodResolver(
            inventoryIssueDecisionSchema
        ),

        defaultValues: {
            funeralId,
            issueId,
            quantity: defaultQuantity,
        },
    });

    const handleApprove = async (
        values: InventoryIssueDecisionFormValues
    ) => {
        await onApprove(values);
    };

    return (
        <form className="w-full">

            <FieldGroup className="space-y-6">

                <FieldSet>

                    <div className="space-y-1">

                        <h3 className="text-base font-semibold">
                            Issue Decision
                        </h3>

                        <p className="text-sm text-muted-foreground">
                            Review the inventory issue details and
                            approve or reject the requested quantity.
                        </p>

                    </div>


                    <div className="mt-4 rounded-lg border bg-muted/30 p-4">

                        <div className="grid gap-4 sm:grid-cols-2">
                            <Field>
                                <FieldLabel>
                                    <Hash className="h-4 w-4"/>
                                    Funeral ID
                                </FieldLabel>
                                <FieldContent>
                                    <Input
                                        aria-label={'Enter funeral id'}
                                        value={funeralId}
                                        readOnly
                                        className="bg-background font-mono text-xs"
                                    />

                                    <FieldDescription>
                                        The funeral event associated
                                        with this inventory issue.
                                    </FieldDescription>

                                </FieldContent>

                            </Field>


                            {/* Issue ID */}

                            <Field>

                                <FieldLabel>
                                    <Hash className="h-4 w-4"/>
                                    Issue ID
                                </FieldLabel>

                                <FieldContent>

                                    <Input
                                        aria-label={'Enter issue id'}
                                        value={issueId}
                                        readOnly
                                        className="bg-background font-mono text-xs"
                                    />

                                    <FieldDescription>
                                        Unique identifier of the
                                        inventory issue.
                                    </FieldDescription>

                                </FieldContent>

                            </Field>

                        </div>

                    </div>

                </FieldSet>
                <Separator/>
                <FieldSet>
                    <div className="space-y-1">
                        <h3 className="text-base font-semibold">
                            Issue Quantity
                        </h3>
                        <p className="text-sm text-muted-foreground">
                            Specify the quantity that should be
                            approved for this issue.
                        </p>
                    </div>
                    <Controller
                        name="quantity"
                        control={form.control}

                        render={({
                                     field,
                                     fieldState,
                                 }) => (

                            <Field
                                data-invalid={
                                    fieldState.invalid
                                }
                                className="mt-4"
                            >

                                <FieldLabel>
                                    <Package className="h-4 w-4"/>
                                    Quantity
                                </FieldLabel>

                                <FieldContent>

                                    <Input
                                        {...field}
                                        aria-label={'Enter quantity'}
                                        type="number"
                                        min={1}
                                        step={1}
                                        disabled={loading}
                                        placeholder="Enter quantity"
                                        onChange={(event) =>
                                            field.onChange(
                                                event.target.value
                                            )
                                        }
                                    />

                                    <FieldDescription>
                                        Enter the number of items
                                        to be issued.
                                    </FieldDescription>

                                    {fieldState.error && (
                                        <FieldError
                                            errors={[
                                                fieldState.error,
                                            ]}
                                        />
                                    )}

                                </FieldContent>
                            </Field>
                        )}
                    />

                </FieldSet>
                <Separator/>
                <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                    <Button
                        type="button"
                        variant="outline"
                        disabled={loading}
                        onClick={onCancel}
                    >
                        Cancel
                    </Button>

                    <Button
                        type="button"
                        disabled={loading}
                        className=" bg-emerald-600 text-white hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-700"
                        onClick={form.handleSubmit(
                            handleApprove
                        )}
                    >
                        <CheckCircle2 className="mr-2 h-4 w-4"/>
                        {loading
                            ? "Processing..."
                            : "Approve"}

                    </Button>
                </div>
            </FieldGroup>
        </form>
    );
};

export default InventoryIssueApprovalForm;