import {useMutation, useQueryClient} from "@tanstack/react-query";
import {createItem} from "@/features/inventory/api/inventory.apis.ts";
import {toast} from "sonner";
import type {AxiosError} from "axios";
import type {Options} from "@/shared/types.ts";
import {inventoryKeys} from "@/features/inventory/api/inventory.querykeys.ts";

export function useCreateInventory(option?:Options) {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: createItem,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: inventoryKeys.allInventory})
                .then(() => toast.success("Item created successfully"))
            option.onSuccess?.()
        },

        onError: (error : AxiosError<{ message: string }>) => {
            toast.error(error.response?.data.message)
        }

    })
}