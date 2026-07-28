import {Controller, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {type PaymentFormValues, paymentSchema,} from "../schemas/payment.schema";
import {Button} from "@/shared/components/ui/button";
import {Input} from "@/shared/components/ui/input";
import {Textarea} from "@/shared/components/ui/textarea";
import {
    Field,
    FieldContent,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
    FieldSeparator,
    FieldSet,
} from "@/shared/components/ui/field";
import {CalendarIcon, DollarSignIcon, FileTextIcon, HashIcon, UserIcon} from "lucide-react";
import {Popover, PopoverContent, PopoverTrigger} from "@/shared/components/ui/popover.tsx";
import {format} from "date-fns";
import {Calendar} from "@/shared/components/ui/calendar.tsx";

interface Props {
    memberId: string;
    loading: boolean;
    receiptId?: string;
    memberName?: string;
    receiptName?: string;
    onCancel(): void;
    onSubmit(
        values: PaymentFormValues
    ): void;
}

export function PaymentForm({
                                receiptId,
                                memberName,
                                receiptName,
                                memberId,
                                loading,
                                onCancel,
                                onSubmit
                            }: Props) {
    const form =
        useForm<PaymentFormValues>({
            resolver:
                zodResolver(paymentSchema),
            defaultValues:{
                memberId,
                amount:0,
                receiptNumber:"",
                remark:"",
                paymentDate:new Date(),
                receipterId: receiptId,
            }
        });


    return(
        <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-5"
        >
            <FieldSet>

                <FieldContent className="bg-muted/30 p-4 rounded-xl border border-border/50 flex gap-4 mb-6 shadow-sm">
                    <div className="flex items-center gap-4 w-full">
                        <div className="bg-primary/10 p-3 rounded-full ring-4 ring-primary/5">
                            <UserIcon className="h-6 w-6 text-primary"/>
                        </div>
                        <div className='grid grid-cols-2 gap-x-8 gap-y-1 flex-1'>
                            <div className='flex flex-col'>
                                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Receiver</span>
                                <span className="text-sm font-bold text-foreground/90">{receiptName}</span>
                            </div>
                            <div className='flex flex-col'>
                                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Paid By</span>
                                <span className="text-sm font-bold text-foreground/90">{memberName}</span>
                            </div>
                        </div>
                    </div>
                </FieldContent>
                <FieldSeparator>Payment Details</FieldSeparator>
                <FieldGroup className="grid gap-6 md:grid-cols-2">
                    <Field>
                        <FieldLabel>
                            Amount (ETB)
                        </FieldLabel>
                        <div className="relative">
                            <DollarSignIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                            <Input
                                type="number"
                                className="pl-10"
                                {...form.register("amount",{
                                    valueAsNumber:true,
                                })}
                            />
                        </div>
                        <FieldDescription>
                            The amount of the contribution being paid.
                        </FieldDescription>
                        <FieldError
                            errors={[form.formState.errors.amount]}
                        />
                    </Field>

                    <Controller
                            defaultValue={new Date()}
                            rules={{required: true}}
                            name="paymentDate"
                            control={form.control}
                            render={({field, fieldState}) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel>Payment Date</FieldLabel>
                                    <Popover>
                                        <PopoverTrigger>
                                            <Button variant="outline" className="w-full justify-start text-left font-normal">
                                                <CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground"/>
                                                {field.value ? format(field.value, "PPP") : "Select date"}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent>
                                            <Calendar
                                                animate={true}
                                                mode="single"
                                                selected={field.value}
                                                onSelect={field.onChange}
                                                captionLayout={'dropdown'}
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <FieldDescription>
                                        The date and time the payment was made.
                                    </FieldDescription>
                                    <FieldError errors={[fieldState.error]}/>
                                </Field>
                            )}
                        />
                </FieldGroup>
            </FieldSet>
            <FieldSet>
                <FieldSeparator>
                    Receipt Information
                </FieldSeparator>
                <FieldGroup>
                    <Field>
                        <FieldLabel>
                            Receipt Number
                        </FieldLabel>
                        <div className="relative">
                            <HashIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                            <Input
                                placeholder="RCPT-00001"
                                className="pl-10"
                                {...form.register("receiptNumber")}
                            />
                        </div>
                        <FieldDescription>
                            The unique identifier for the payment receipt.
                        </FieldDescription>
                        <FieldError
                            errors={[form.formState.errors.receiptNumber]}
                        />
                    </Field>
                    <Field>
                        <FieldLabel>
                            Remark
                        </FieldLabel>
                         <div className="relative">
                            <FileTextIcon className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                            <Textarea
                                rows={4}
                                placeholder="Optional remark..."
                                className="pl-10"
                                {...form.register("remark")}
                            />
                        </div>
                        <FieldDescription>
                            Add any optional notes or remarks for this payment.
                        </FieldDescription>
                        <FieldError
                            errors={[form.formState.errors.remark]}
                        />
                    </Field>
                </FieldGroup>
            </FieldSet>

            <div className="flex justify-end gap-3 pt-4 border-t">
                <Button
                    onClick={onCancel}
                    type="button"
                    variant="ghost"
                >
                    Cancel
                </Button>
                <Button
                    type="submit"
                    className="min-w-[120px]"
                    disabled={loading}
                >
                    {loading ? "Saving..." : "Save Payment"}
                </Button>
            </div>
        </form>
    )
}