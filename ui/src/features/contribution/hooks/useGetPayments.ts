import {useQuery} from "@tanstack/react-query";
import {fetchPayment} from "@/features/contribution/api/membercontribution.apis.ts";

export function useGetPayments(uuid: string) {
    return useQuery({
        queryKey: ["payments"],
        queryFn: () => fetchPayment(uuid),

    })
}