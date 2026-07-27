import {useQuery} from "@tanstack/react-query";
import {inventoryKeys} from "@/features/inventory/api/inventory.querykeys.ts";
import {getAllItems} from "@/features/inventory/api/inventory.apis.ts";

export function useGetInventory(){
    return useQuery({
        queryKey:inventoryKeys.allInventory,
        queryFn:getAllItems,
        enabled:true
    })
}