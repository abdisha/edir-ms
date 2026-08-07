import {useQuery} from "@tanstack/react-query";
import {getMembers} from "@/shared/api/shared-api.ts";

export function useGetMembers(){
    return useQuery({
        queryFn:getMembers,
        queryKey:["members-summary"]
    })

}