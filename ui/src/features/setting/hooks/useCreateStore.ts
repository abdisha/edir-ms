import {useMutation, useQueryClient} from "@tanstack/react-query";
import {createStore} from "../api/store.api";
import storeKeys from "@/features/setting/api/store-keys.ts";
import {toast} from "sonner";
import type {Options} from "@/shared/types.ts";

export function useCreateStore(option?: Options) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createStore,
        onSuccess: () => {
            queryClient.invalidateQueries(
                {queryKey: storeKeys.stores}
            ).then(() => toast.success("Store created successfully"));
            option?.onSuccess?.();
        },
        onError: () => {
            toast.error("Failed to create store");
        }
    })
}