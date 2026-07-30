import {useQuery} from "@tanstack/react-query";
import {getEdir} from "@/features/edir/api/edir-apis.ts";
import {MemberQueryKey} from "@/features/edir/api/member-query.key.ts";

export function useEdir() {
    return useQuery({
        queryKey: MemberQueryKey.edir,
        queryFn: getEdir,
    });
}