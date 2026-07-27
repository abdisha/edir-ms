import {useMutation, useQueryClient} from "@tanstack/react-query";
import {createItem} from "@/features/inventory/api/inventory.apis.ts";
import {toast} from "sonner";

export function useCreateInventory() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: createItem,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["inventory"]})
                .then(() => toast.success("Item created successfully"))
        },
        onError: () => {
            toast.error("Failed to create item")
        }

    })
}