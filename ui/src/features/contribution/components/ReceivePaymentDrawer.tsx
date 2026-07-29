import {PaymentForm} from "./PaymentForm";
import {useAuth} from "@/features/auths/useAuth.tsx";
import {useGetMember} from "@/features/edir/hooks/useGetMembers.ts";
import {SpinnerCard} from "@/shared/components/SpinnerCard.tsx";
import {AlertCircle} from "lucide-react";
import {Alert, AlertDescription, AlertTitle} from "@/shared/components/ui/alert";
import {useReceivePayment} from "@/features/contribution/hooks/useReceivePayment.ts";
import {FormDrawer} from "@/shared/components/FromDrawer.tsx";

interface Props {
    open: boolean;
    loading:boolean;
    onOpenChange(
        open: boolean
    ): void;
    memberId: string;
}
export function ReceivePaymentDrawer({ open, onOpenChange,loading, memberId }: Props) {
    const onCancelHandle=()=>{
        onOpenChange(false);
    }
    return(
            <FormDrawer
                loading={loading}
                open={open}
                onOpenChange={onOpenChange}
                        title={"Receive Payment"}
                description={"Record a contribution payment"}>
                <ReceivePaymentContent
                    memberId={memberId}
                    onCancelHandle={onCancelHandle}
                />
            </FormDrawer>
    )
}

const ReceivePaymentContent = ({ memberId, onCancelHandle }:
                               { memberId: string, onCancelHandle: () => void}) => {

    const { data, isPending, isError } = useGetMember(memberId);
    const { user } = useAuth();
    const context = useReceivePayment({
        onSuccess: onCancelHandle,

    },memberId);

    const handleSubmit=(value:{amount:number,receiptNumber:string,remark:string})=>{
        context.mutate({
            amount:value.amount,
            receipterId:user?.id || "",
            memberId:memberId,
            paymentDate:new Date().toISOString(),
            receiptNumber:value.receiptNumber,
            remark:value.remark
        });
    }

    if(isPending){
        return <div className='flex flex-col items-center justify-center w-full py-12'>
            <SpinnerCard size={20} color={'green'} text={'Loading member information...'}/>
        </div>
    }

    if(isError ||!data){
        return( <div className="w-full">
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
        onSubmit={(value)=>handleSubmit({
            amount:value.amount,
            receiptNumber:value.receiptNumber,
            remark:value.remark || ""
        })}
        memberId={data.id}
    />
}
