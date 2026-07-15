import {useMutation, useQueryClient} from "@tanstack/react-query";
import {queryKeys} from "@/shared/api/queryKeys.ts";
import {toast} from "sonner";
import {createEdir} from "@/features/edir/api/edir-apis.ts";

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