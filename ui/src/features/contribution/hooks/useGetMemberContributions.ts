import {getMemberContribution, getMemberContributions} from "@/features/contribution/api/membercontribution.apis.ts";
import {useQuery} from "@tanstack/react-query";
import {ContributionQueryKey} from "@/features/contribution/api/contribution-query-key.ts";

export function useGetMemberContributions(uuid:string){
    return useQuery({
        queryKey:ContributionQueryKey.memberContribution(uuid),
        queryFn:()=>getMemberContributions(uuid),
        enabled:!!uuid,
    })
}

export function useGetMemberContribution(uuid:string){
    return useQuery({
        queryKey:ContributionQueryKey.memberContribution(uuid),
        queryFn:()=>getMemberContribution(uuid),
        enabled:!!uuid
    })
}