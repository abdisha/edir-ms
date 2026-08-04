import {useQuery} from "@tanstack/react-query";
import {getAllItems} from "@/features/funeral/apis/funeral-event.apis.ts";

export function useGetInventory(){
    return useQuery({
        queryKey:["allInventory"],
        queryFn:getAllItems,
        enabled:true
    })
}