import {useMutation, useQueryClient} from "@tanstack/react-query";
import {createMeetingEvent, updateMeetingEvent} from "@/features/funeral/apis/meeting-event.api.ts";
import {toast} from "sonner";
import type {AxiosError} from "axios";

export function useCreateMeetingEvent(option:Optionsns) {
    const queryClient = useQueryClient();
    return useMutation({
            mutationFn: createMeetingEvent,
            onSuccess: () => {
                queryClient.invalidateQueries({queryKey: ["meeting-events"]})
                    .then(() => {
                            toast.success("Meeting event created successfully");
                            option?.onSuccess?.();
                        }
                    )
            },
            onError: (error: AxiosError<{ message: string }>) => {
                toast.error(error.response?.data.message)
            }
        }
    )
}


export function useUpdateMeetingEvent() {
    const queryClient = useQueryClient();
    return useMutation({
            mutationFn: updateMeetingEvent,
            onSuccess: () => {
                queryClient.invalidateQueries({queryKey: ["meeting-events"]})
                    .then(() => toast.success("Meeting event updated successfully"))
            },
            onError: (error: AxiosError<{ message: string }>) => {
                toast.error(error.response?.data.message)
            }
        }
    )

}