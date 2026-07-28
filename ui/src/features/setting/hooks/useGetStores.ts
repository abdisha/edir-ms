import {useQuery} from "@tanstack/react-query";
import storeKeys from "@/features/setting/api/store-keys.ts";
import {getStores} from "@/features/setting/api/store.api.ts";

export function useGetStores(){
    return useQuery({
        queryKey:storeKeys.stores,
        queryFn:getStores,
        enabled:true
    })
}