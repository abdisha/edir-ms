import {useQuery} from "@tanstack/react-query";
import {getItemById} from "@/features/inventory/api/inventory.apis.ts";

export function useGetItemById(id?:string){
    return useQuery({
        queryKey:["item",id],
        queryFn: () => getItemById(id)
    })
}