import {useMutation, useQueryClient} from "@tanstack/react-query";
import {toast} from "sonner";
import {createEdir} from "@/features/edir/api/edir-apis.ts";
import {MemberQueryKey} from "@/features/edir/api/member-query.key.ts";

export function useCreateEdir() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createEdir,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: MemberQueryKey.edir,
            }).then(() => {
                toast.success("Edir created successfully");
            });
        },
    });
}