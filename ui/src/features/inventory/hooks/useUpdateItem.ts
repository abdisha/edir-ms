import {useMutation, useQueryClient} from "@tanstack/react-query";
import {inventoryKeys} from "@/features/inventory/api/inventory.querykeys.ts";
import {toast} from "sonner";
import type {Options} from "@/shared/types.ts";
import {updateItem} from "@/features/inventory/api/inventory.apis.ts";

export function useUpdateItem(option:Options){
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn:updateItem,
        onSuccess:() => {
            queryClient.invalidateQueries({queryKey: inventoryKeys.allInventory})
                .then(()=>toast.success("Item updated successfully"))
            option?.onSuccess?.()
        }
    })
}