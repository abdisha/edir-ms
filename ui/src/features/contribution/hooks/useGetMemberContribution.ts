import {queryKeys} from "@/shared/api/queryKeys.ts";
import {getMemberContributions} from "@/features/contribution/api/membercontribution.apis.ts";
import {useQuery} from "@tanstack/react-query";

export function useGetMemberContribution(uuid:string){
    return useQuery({
        queryKey:queryKeys.memberContribution(uuid),
        queryFn:()=>getMemberContributions(uuid),
        enabled:Boolean(true),
    })
}