import {useQuery} from "@tanstack/react-query";
import {getContribution} from "@/features/contribution/api/contribution.apis.ts";
import {ContributionQueryKey} from "@/features/contribution/api/contribution-query-key.ts";

export function useGetContribution(){
    return useQuery({
        queryKey:ContributionQueryKey.contribution,
        queryFn:getContribution,
        enabled:true
    })
}