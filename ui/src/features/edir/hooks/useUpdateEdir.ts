import {useMutation, useQueryClient} from "@tanstack/react-query";
import {updateEdir} from "@/features/edir/api/edir-apis.ts";

import {toast} from "sonner";
import {MemberQueryKey} from "@/features/edir/api/member-query.key.ts";

export function useUpdateEdir() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateEdir,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: MemberQueryKey.edir,
            }).then(() => toast.success("Edir updated successfully"));
        },
        onError:()=>{
            toast.error("Edir update failed")
        }
    });
}