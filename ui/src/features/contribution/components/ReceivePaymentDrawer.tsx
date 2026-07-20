import {Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle,} from "@/shared/components/ui/drawer";

import {PaymentForm} from "./PaymentForm";

interface Props {

    open: boolean;

    onOpenChange(
        open: boolean
    ): void;

    memberId: string;

}

export function ReceivePaymentDrawer({

                                         open,

                                         onOpenChange,

                                         memberId,

                                     }: Props){

    return(

        <Drawer
            open={open}
            onOpenChange={onOpenChange}
        >

            <DrawerContent className="mx-auto max-w-2xl">

                <DrawerHeader>

                    <DrawerTitle>

                        Receive Payment

                    </DrawerTitle>

                    <DrawerDescription>

                        Record a contribution payment.

                    </DrawerDescription>

                </DrawerHeader>

                <PaymentForm
                    memberId={memberId}
                />

            </DrawerContent>

        </Drawer>

    )

}