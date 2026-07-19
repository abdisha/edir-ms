import {useQuery} from "@tanstack/react-query";
import {queryKeys} from "@/shared/api/queryKeys.ts";
import {getContribution} from "@/features/contribution/api/contribution.apis.ts";

export function useGetContribution(){
    return useQuery({
        queryKey:queryKeys.contribution,
        queryFn:getContribution
    })
}