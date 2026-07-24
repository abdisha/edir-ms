import {Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle,} from "@/shared/components/ui/drawer";
import {PaymentForm} from "./PaymentForm";
import {useAuth} from "@/features/auths/useAuth.tsx";
import {useGetMember} from "@/features/edir/hooks/useGetMembers.ts";
import {SpinnerCard} from "@/shared/components/SpinnerCard.tsx";
import {AlertCircle} from "lucide-react";
import {Alert, AlertDescription, AlertTitle} from "@/shared/components/ui/alert";
import {useReceivePayment} from "@/features/contribution/hooks/useReceivePayment.ts";

interface Props {
    open: boolean;
    onOpenChange(
        open: boolean
    ): void;
    memberId: string;
}
export function ReceivePaymentDrawer({ open, onOpenChange, memberId }: Props) {
    const onCancelHandle=()=>{
        onOpenChange(false);
    }
    return(
        <Drawer
            open={open}
            onOpenChange={onOpenChange}
            showSwipeHandle={true}
            swipeDirection={"right"}
        >
            <DrawerContent className="mx-auto max-w-full h-full max-h-[96vh] flex flex-col">


                <div className="overflow-y-auto px-4 pb-8">
                    <DrawerHeader className="px-0">
                        <DrawerTitle className="text-2xl font-bold">
                            Receive Payment
                        </DrawerTitle>
                        <DrawerDescription className="text-base">
                            Record a contribution payment
                        </DrawerDescription>
                    </DrawerHeader>
                        <ReceivePaymentContent
                            memberId={memberId}
                            onCancelHandle={onCancelHandle}
                        />

                </div>
            </DrawerContent>
        </Drawer>
    )
}

const ReceivePaymentContent = ({ memberId, onCancelHandle }:
                               { memberId: string, onCancelHandle: () => void}) => {

    const { data, isPending, isError } = useGetMember(memberId);
    const { user } = useAuth();
    const context= useReceivePayment();

    const handleSubmit=(value:{amount:number,receiptNumber:string,remark:string})=>{
        context.mutation({
            amount:value.amount,
            receipterId:user?.id,
            memberId:memberId,
            paymentDate:new Date().toISOString(),
            receiptNumber:value.receiptNumber,
            remark:value.remark
        })
        console.log(value)
        if(context.is){
            onCancelHandle();
        }

    }

    if(isPending){
        return <div className='flex items-center justify-center min-h-[300px]'>
            <SpinnerCard size={40} color={'green'} text={'loading member information'}/>

        </div>

    }

    if(isError ||!data){
        return( <div className="p-4">
            <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                    Failed to load member details. Please try again later.
                </AlertDescription>
            </Alert>
        </div>)

    }

    return <PaymentForm
        receiptId={user?.id}
        receiptName={user?.firstName+" "+user?.lastName}
        loading={false}
        memberName={data.firstName +" "+data.lastName}
        onCancel={onCancelHandle}
        onSubmit={handleSubmit}
        memberId={data.id}
    />


}
