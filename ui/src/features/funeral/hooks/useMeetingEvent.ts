import {useMutation, useQueryClient} from "@tanstack/react-query";
import {createMeetingEvent, updateMeetingEvent, deleteMeetingEvent} from "@/features/funeral/apis/meeting-event.api.ts";
import {toast} from "sonner";
import type {AxiosError} from "axios";
import type {Options} from "@/shared/types.ts";

export function useCreateMeetingEvent(option:Options) {
    const queryClient = useQueryClient();
    return useMutation({
            mutationFn: createMeetingEvent,
            onSuccess: data => {
                queryClient.invalidateQueries({queryKey: ["meeting-events"]})
                    .then(() => {
                            toast.success("Meeting event created successfully");
                            console.log(data)
                            option?.onSuccess?.(data);
                        }
                    )
            },
            onError: (error: AxiosError<{ message: string }>) => {
                toast.error(error.response?.data.message)
            }
        }
    )
}


export function useUpdateMeetingEvent(option:Options) {
    const queryClient = useQueryClient();
    return useMutation({
            mutationFn: updateMeetingEvent,
            onSuccess: () => {
                queryClient.invalidateQueries({queryKey: ["meeting-events"]})
                    .then(() => toast.success("Meeting event updated successfully"))
                option?.onSuccess?.();
            },
            onError: (error: AxiosError<{ message: string }>) => {
                toast.error(error.response?.data.message)
            }
        }
    )

}

export function useDeleteMeetingEvent(option:Options) {
    const queryClient = useQueryClient();
    return useMutation({
            mutationFn: deleteMeetingEvent,
            onSuccess: () => {
                queryClient.invalidateQueries({queryKey: ["meeting-events"]})
                    .then(() => toast.success("Meeting event deleted successfully"));
                option?.onSuccess?.();
            },
            onError: (error: AxiosError<{ message: string }>) => {
                toast.error(error.response?.data.message);
            }
        }
    );
}