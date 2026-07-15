import {useQuery} from "@tanstack/react-query";
import {getEdir} from "../api/get-edir";
import {queryKeys} from "@/shared/api/queryKeys";

export function useEdir() {
    return useQuery({
        queryKey: queryKeys.edir,
        queryFn: getEdir,
    });
}