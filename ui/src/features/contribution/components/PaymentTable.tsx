import type {Payment} from "@/features/contribution/types/contribution.ts";
import {Receipt} from "lucide-react";
import {Button} from "@/shared/components/ui/button.tsx";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/shared/components/ui/table.tsx";
import {Badge} from "@/shared/components/ui/badge.tsx";

interface PaymentTableProp{
    payments:Payment[];
    setOpen:(open:boolean)=>void;
}
const PaymentTable =({payments,setOpen}:PaymentTableProp)=>{
    return (
        <>
            {payments?.length ? (
                <div className="rounded-lg border overflow-hidden">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>
                                    Receipt #
                                </TableHead>

                                <TableHead>
                                    Payment Date
                                </TableHead>

                                <TableHead>
                                    Amount
                                </TableHead>

                                <TableHead>
                                    Receiver
                                </TableHead>

                                <TableHead>
                                    Remark
                                </TableHead>

                            </TableRow>

                        </TableHeader>

                        <TableBody>

                            {payments.map(payment => (

                                <TableRow key={payment.id}>

                                    <TableCell className="font-medium">
                                        {payment.receiptId}
                                    </TableCell>

                                    <TableCell>
                                        {new Date(
                                            payment.paidAt
                                        ).toLocaleDateString()}
                                    </TableCell>

                                    <TableCell>

                                        <Badge
                                            variant="secondary"
                                            className="font-semibold"
                                        >
                                            ETB {payment.amount.toLocaleString()}
                                        </Badge>

                                    </TableCell>

                                    <TableCell>
                                        {payment.receiptId}
                                    </TableCell>

                                    <TableCell>

                                        {payment.Note || "-"}

                                    </TableCell>

                                </TableRow>

                            ))}
                        </TableBody>
                    </Table>
                </div>

            ) : (

                <div className="flex flex-col items-center justify-center py-20 text-center">
                    <Receipt className="mb-5 h-14 w-14 text-muted-foreground"/>
                    <h3 className="text-lg font-semibold">
                        No Payments Yet
                    </h3>

                    <p className="mt-2 max-w-md text-muted-foreground">
                        This member hasn&apos;t made any payments for this
                        contribution period. Once a payment is received,
                        it will appear here.
                    </p>
                    <Button className="mt-6" onClick={() => setOpen(true)}>
                        <Receipt className="mr-2 h-4 w-4"/>
                        Receive First Payment
                    </Button>
                </div>

            )}

        </>
    )
}

export default PaymentTable;