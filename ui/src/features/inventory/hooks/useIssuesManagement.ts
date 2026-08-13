import {useMutation, useQueryClient} from "@tanstack/react-query";
import {approve, reject} from "@/features/inventory/api/inventory.issue.api.ts";
import type {AxiosError} from "axios";
import {toast} from "sonner";

export function useApprove(){
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn:approve,
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey: ["inventory-issue"]}).then(
                ()=>{
                    toast.success("Approved successfully")
                }
            )
        },
        onError:(error:AxiosError<{message:string}>)=>{
            toast.error(error.response?.data.message)
        }
    })
}

export function useReject(){
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn:reject,
        onSuccess:()=> {
            queryClient.invalidateQueries({queryKey: ["inventory-issues"]})
                .then(
                    () => {
                        toast.success("Rejected successfully")
                    }
                )
        },
        onError:(error:AxiosError<{message:string}>)=>{
            toast.error(error.response?.data.message)
        }
    })
}