import {Barcode, Boxes, Package} from "lucide-react";
import {zodResolver} from "@hookform/resolvers/zod";
import {Controller, useForm} from "react-hook-form";
import {type InventoryItemFormValues, inventoryItemSchema,} from "../../schemas/inventory-item.schema.ts";
import {Button} from "@/shared/components/ui/button.tsx";
import {Input} from "@/shared/components/ui/input.tsx";
import {Field, FieldContent, FieldDescription, FieldLabel,} from "@/shared/components/ui/field.tsx";

interface InventoryItemFormProps {
  defaultValues?: Partial<InventoryItemFormValues>;
  loading?: boolean;
  submitText?: string;
  onSubmit: (values: InventoryItemFormValues) => Promise<void> | void;
  onCancel?: () => void;
}

export function InventoryItemForm({
  defaultValues,
  loading = false,
  submitText = "Save Item",
  onSubmit,
  onCancel
}: InventoryItemFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<InventoryItemFormValues>({
    resolver: zodResolver(inventoryItemSchema),
    defaultValues: {
      itemCode: "",
      itemName: "",
      initialQuantity: 0,
      ...defaultValues,
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Package className="h-6 w-6 text-primary" />
          Inventory Item
        </h2>
        <p className="text-muted-foreground mt-2 text-sm">
          Register a new inventory item or update an existing one.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-1">
        {/* Item Code */}
        <Field>
          <FieldLabel>Item Code</FieldLabel>
          <FieldContent>
            <Controller
              control={control}
              name="itemCode"
              render={({ field }) => (
                <div className="relative">
                  <Barcode className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input {...field} placeholder="CHAIR-001" className="pl-9" />
                </div>
              )}
            />
          </FieldContent>
          <FieldDescription>Unique inventory code.</FieldDescription>
          {errors.itemCode && (
            <p className="text-sm text-destructive">{errors.itemCode.message}</p>
          )}
        </Field>

        {/* Item Name */}
        <Field>
          <FieldLabel>Item Name</FieldLabel>
          <FieldContent>
            <Controller
              control={control}
              name="itemName"
              render={({ field }) => (
                <Input {...field}  aria-label={'Item Name'} placeholder="Plastic Chair" />
              )}
            />
          </FieldContent>
          <FieldDescription>Display name of the inventory item.</FieldDescription>
          {errors.itemName && (
            <p className="text-sm text-destructive">{errors.itemName.message}</p>
          )}
        </Field>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Quantity */}
        <Field>
          <FieldLabel>Initial Quantity</FieldLabel>
          <FieldContent>
            <Controller
              control={control}
              name="initialQuantity"
              render={({ field }) => (
                <div className="relative">
                  <Boxes className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                      placeholder="Quantity"
                    aria-label={'Quantity'}
                    type="number"
                    min={0}
                    className="pl-9"
                    value={field.value}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </div>
              )}
            />
          </FieldContent>
          <FieldDescription>
            Available quantity when the item is first registered.
          </FieldDescription>
          {errors.initialQuantity && (
            <p className="text-sm text-destructive">
              {errors.initialQuantity.message}
            </p>
          )}
        </Field>
      </div>

      <div className="flex justify-end gap-3 border-t pt-6">
        {onCancel && (
          <Button type="button" variant="outline" onClick={()=> {
            onCancel()
            control._reset();
          }}>
            Cancel
          </Button>
        )}
        <Button type="submit" disabled={loading}>
          {loading ? "Saving..." : submitText}
        </Button>
      </div>
    </form>
  );
}