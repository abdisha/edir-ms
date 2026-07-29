import {useQuery} from "@tanstack/react-query";
import {inventoryKeys} from "@/features/inventory/api/inventory.querykeys.ts";
import {getAllocationByStoreId, getAllocationSummary} from "@/features/inventory/api/inventory.allocation.api.ts";

export function useGetAllocation(storeId:string){
    return useQuery({
        queryFn:() => getAllocationByStoreId(storeId),
        queryKey:inventoryKeys.storeAllocation(storeId),
        enabled:!!storeId
    })
}

export function useGetAllocationSummary(){
    return useQuery({
        queryFn:() => getAllocationSummary(),
        queryKey:inventoryKeys.stores,
    })
}