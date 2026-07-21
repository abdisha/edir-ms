import {useQuery} from "@tanstack/react-query";
import {queryKeys} from "@/shared/api/queryKeys.ts";
import {getMember, getMembers} from "@/features/edir/api/member-apis.ts";

export function useGetMembers(page:number,size:number) {
    return useQuery({
        queryKey: queryKeys.members(page,size),
        queryFn:()=> getMembers(page,size),
        enabled:true
    });
}

export function useGetMember(uuid:string){
    return useQuery(({
        queryKey:queryKeys.member(uuid),
        queryFn:()=>getMember(uuid),
        enabled:true
    }))
}