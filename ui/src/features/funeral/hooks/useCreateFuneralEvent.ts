import {useMutation, useQueryClient} from "@tanstack/react-query";
import {createFuneralEvent} from "@/features/funeral/apis/funeral-event.apis.ts";
import {FuneralEventQueryKey} from "@/features/funeral/apis/funeral-event-query.key.ts";
import {toast} from "sonner";
import type {AxiosError} from "axios";
import type {Options} from "@/shared/types.ts";

export function useCreateFuneralEvent(option?:Options) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createFuneralEvent,
        onSuccess: () => queryClient.invalidateQueries(
            {queryKey: FuneralEventQueryKey.allFuneralEvent}).then(
            () => {
                toast.success("Funeral event created successfully")
                option?.onSuccess?.()
            }
        ),
        onError: (error: AxiosError<{ message: string }>) => {
            error.response?.data && toast.error(error.response.data?.message);
        }
    })
}