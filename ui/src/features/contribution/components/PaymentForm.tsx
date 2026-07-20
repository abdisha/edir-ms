import {useForm} from "react-hook-form";

import {zodResolver} from "@hookform/resolvers/zod";

import {type PaymentFormValues, paymentSchema,} from "../schemas/payment.schema";

import {Button} from "@/shared/components/ui/button";

import {Input} from "@/shared/components/ui/input";

import {Textarea} from "@/shared/components/ui/textarea";

import {Field, FieldError, FieldGroup, FieldLabel, FieldLegend, FieldSet,} from "@/shared/components/ui/field";

interface Props {

    memberId: string;

}

export function PaymentForm({

                                memberId,

                            }: Props){

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

                receipterId:"",

            }

        });

    const submit = (

        values:PaymentFormValues

    )=>{

        console.log(values);

    };

    return(

        <form

            onSubmit={form.handleSubmit(submit)}

            className="space-y-8 p-6"

        >
            <FieldSet>

                <FieldLegend>

                    Payment Details

                </FieldLegend>

                <FieldGroup className="grid gap-6 md:grid-cols-2">

                    <Field>

                        <FieldLabel>

                            Amount (ETB)

                        </FieldLabel>

                        <Input

                            type="number"

                            {...form.register("amount",{

                                valueAsNumber:true,

                            })}

                        />

                        <FieldError

                            errors={[form.formState.errors.amount]}

                        />

                    </Field>

                    <Field>

                        <FieldLabel>

                            Payment Date

                        </FieldLabel>

                        <Input

                            type="datetime-local"

                            {...form.register("paymentDate",{

                                valueAsDate:true,

                            })}

                        />

                        <FieldError

                            errors={[form.formState.errors.paymentDate]}

                        />

                    </Field>

                </FieldGroup>

            </FieldSet>
            <FieldSet>

                <FieldLegend>

                    Receipt Information

                </FieldLegend>

                <FieldGroup>

                    <Field>

                        <FieldLabel>

                            Receipt Number

                        </FieldLabel>

                        <Input

                            placeholder="RCPT-00001"

                            {...form.register("receiptNumber")}

                        />

                        <FieldError

                            errors={[form.formState.errors.receiptNumber]}

                        />

                    </Field>

                    <Field>

                        <FieldLabel>

                            Remark

                        </FieldLabel>

                        <Textarea

                            rows={4}

                            placeholder="Optional remark..."

                            {...form.register("remark")}

                        />

                        <FieldError

                            errors={[form.formState.errors.remark]}

                        />

                    </Field>

                </FieldGroup>

            </FieldSet>
            <FieldSet>

                <FieldLegend>

                    Received By

                </FieldLegend>

                <Field>

                    <FieldLabel>

                        Receiver

                    </FieldLabel>

                    <Input

                        placeholder="Receiver UUID"

                        {...form.register("receipterId")}

                    />

                    <FieldError

                        errors={[form.formState.errors.receipterId]}

                    />

                </Field>

            </FieldSet>
            <div className="flex justify-end gap-3">

                <Button

                    type="button"

                    variant="outline"

                >

                    Cancel

                </Button>

                <Button

                    type="submit"

                >

                    Save Payment

                </Button>

            </div>

        </form>

    )

}