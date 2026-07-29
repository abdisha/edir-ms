import {useMutation, useQueryClient} from "@tanstack/react-query";
import {toast} from "sonner";
import {payContribution} from "@/features/contribution/api/membercontribution.apis.ts";
import type {Options} from "@/shared/types.ts";
import {ContributionQueryKey} from "@/features/contribution/api/contribution-query-key.ts";
import type {AxiosError} from "axios";

export function useReceivePayment(option: Options, id: string) {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: payContribution,
        onSuccess: () => {
            Promise.all(
                [
                    queryClient.invalidateQueries({queryKey: ContributionQueryKey.contribution}),
                    queryClient.invalidateQueries({queryKey: ContributionQueryKey.memberContribution(id)})
                ]
            ).then(() => {
                option?.onSuccess?.()
                toast.success("Payment received successfully!")
            })
        },

        onError: (error: AxiosError<{ message: string }>) => {
            toast.error(error?.response?.data?.message || "Failed to receive payment")
        }
    })
}