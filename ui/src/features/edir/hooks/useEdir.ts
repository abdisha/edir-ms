import {useQuery} from "@tanstack/react-query";
import {getEdir} from "@/features/edir/api/edir-apis.ts";
import {queryKeys} from "@/shared/api/queryKeys";

export function useEdir() {
    return useQuery({
        queryKey: queryKeys.edir,
        queryFn: getEdir,
    });
}