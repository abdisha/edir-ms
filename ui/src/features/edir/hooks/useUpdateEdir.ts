import {useMutation, useQueryClient} from "@tanstack/react-query";
import {queryKeys} from "@/shared/api/queryKeys.ts";
import {updateEdir} from "@/features/edir/api/update-edir.ts";
import {toast} from "sonner";

export function useUpdateEdir() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateEdir,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: queryKeys.edir,
            }).then(() => toast.success("Edir updated successfully"));
        },
        onError:()=>{
            toast.error("Edir update failed")
        }
    });
}