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

    const onCancelHandle=()=>{
        onOpenChange(false);
    }
    const onSubmit=()=>{}

    return(
        <Drawer
            open={open}
            onOpenChange={onOpenChange}
            showSwipeHandle={true}
            swipeDirection={"right"}
        >
            <DrawerContent className="mx-auto max-w-1/2">
                <DrawerHeader>
                    <DrawerTitle>
                        Receive Payment
                    </DrawerTitle>
                    <DrawerDescription>
                        Record a contribution payment.
                    </DrawerDescription>
                </DrawerHeader>
                <PaymentForm
                    loading={false}
                    onCancel={onCancelHandle}
                    onSubmit={onSubmit}
                    memberId={memberId}
                />
            </DrawerContent>
        </Drawer>
    )
}