import {useQuery} from "@tanstack/react-query";
import {getMembers} from "@/features/setting/api/store.api.ts";

export function useGetMembers(){
    return useQuery({
        queryFn:getMembers,
        queryKey:["members-summary"]
    })

}