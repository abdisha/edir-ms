import {useMutation, useQueryClient} from "@tanstack/react-query";
import {toast} from "sonner";
import {payContribution} from "@/features/contribution/api/membercontribution.apis.ts";

export async function useReceivePayment() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: payContribution,

        onSuccess: () => {
            queryClient.invalidateQueries(
            ).then(() => toast.success("Payment received successfully!"))
        },

        onError: (error: any) => {
            console.log(error)
            toast.error(error?.response?.data?.message || "Failed to receive payment")
        }
    })
}