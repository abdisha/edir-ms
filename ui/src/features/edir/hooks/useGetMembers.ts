import {useQuery} from "@tanstack/react-query";
import {getMember, getMembers} from "@/features/edir/api/member-apis.ts";
import {MemberQueryKey} from "@/features/edir/api/member-query.key.ts";

export function useGetMembers(page:number,size:number) {
    return useQuery({
        queryKey: MemberQueryKey.members(page,size),
        queryFn:()=> getMembers(page,size)
    });
}

export function useGetMember(uuid:string){
    return useQuery(({
        queryKey:MemberQueryKey.member(uuid),
        queryFn:()=>getMember(uuid),
        enabled:true
    }))
}