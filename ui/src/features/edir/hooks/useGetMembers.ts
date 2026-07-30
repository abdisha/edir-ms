import {useQuery} from "@tanstack/react-query";
import {getMember, getMembers} from "@/features/edir/api/member-apis.ts";
import {memberQueryKey} from "@/features/edir/api/member-query.key.ts";

export function useGetMembers(page:number,size:number) {
    return useQuery({
        queryKey: memberQueryKey.members(page,size),
        queryFn:()=> getMembers(page,size)
    });
}

export function useGetMember(uuid:string){
    return useQuery(({
        queryKey:memberQueryKey.member(uuid),
        queryFn:()=>getMember(uuid),
        enabled:true
    }))
}