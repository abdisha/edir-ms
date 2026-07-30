import {queryKeys} from "@/shared/api/queryKeys.ts";
import {getMemberContribution, getMemberContributions} from "@/features/contribution/api/membercontribution.apis.ts";
import {useQuery} from "@tanstack/react-query";

export function useGetMemberContributions(uuid:string){
    return useQuery({
        queryKey:queryKeys.memberContribution(uuid),
        queryFn:()=>getMemberContributions(uuid),
        enabled:!!uuid,
    })
}

export function useGetMemberContribution(uuid:string){
    return useQuery({
        queryKey:queryKeys.memberContribution(uuid),
        queryFn:()=>getMemberContribution(uuid),
        enabled:!!uuid
    })
}