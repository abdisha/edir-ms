import {useMutation, useQueryClient} from "@tanstack/react-query";
import {allocateItem} from "@/features/inventory/api/inventory.allocation.api.ts";
import type {Options} from "@/shared/types.ts";
import {inventoryKeys} from "@/features/inventory/api/inventory.querykeys.ts";
import {toast} from "sonner";
import type {AxiosError} from "axios";

export function useAllocate(option?:Options){
   const queryClient = useQueryClient();
    return useMutation({
        mutationFn:allocateItem,
        onSuccess:()=>{
            Promise.all(
                [queryClient.invalidateQueries({queryKey:inventoryKeys.allUnAllocatedItem}),
                queryClient.invalidateQueries({queryKey:inventoryKeys.allInventory})]
                ).then(()=> {
                    toast.success("Item allocated successfully")
                option?.onSuccess?.()
            })
        },
        onError:(error:AxiosError<{message:string}>)=>{
            toast.error(error.response?.data.message)
        }
    })
}