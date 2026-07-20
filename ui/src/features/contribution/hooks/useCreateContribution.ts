import {useMutation, useQueryClient} from "@tanstack/react-query";
import {toast} from "sonner";
import {createContribution} from "@/features/contribution/api/contribution.apis.ts";

export function useCreateContribution(){
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: createContribution,

        onSuccess: () => {
            queryClient.invalidateQueries().then(() => toast.success("Contribution created successfully"))
        },

        onError:(error:any)=>{
            console.log(error)
            toast.error(error?.response?.data?.message ||"Failed to create contribution")
        }
    })
}
