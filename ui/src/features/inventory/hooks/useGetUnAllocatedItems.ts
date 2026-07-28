import {useQuery} from "@tanstack/react-query";
import {getUnAllocatedItems} from "@/features/inventory/api/inventory.allocation.api.ts";
import {inventoryKeys} from "@/features/inventory/api/inventory.querykeys.ts";

export function useGetUnAllocatedItems(){
    return useQuery({
        queryFn:getUnAllocatedItems,
        queryKey:inventoryKeys.allUnAllocatedItem
    })
}