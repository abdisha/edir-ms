import {useMutation, useQueryClient} from "@tanstack/react-query";
import {queryKeys} from "@/shared/api/queryKeys.ts";
import {createEdir} from "@/features/edir/api/create-edir.ts";
import {toast} from "sonner";

export function useCreateEdir() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createEdir,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: queryKeys.edir,
            }).then(() => {
                toast.success("Edir created successfully");
            });
        },
    });
}