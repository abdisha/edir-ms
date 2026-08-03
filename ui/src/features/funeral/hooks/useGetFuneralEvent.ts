import {useQuery} from "@tanstack/react-query";
import {getFuneralEventById, getFuneralEvents} from "@/features/funeral/apis/funeral-event.apis.ts";
import {FuneralEventQueryKey} from "@/features/funeral/apis/funeral-event-query.key.ts";

export function useGetFuneralEvent(){
    return useQuery({
        queryFn: getFuneralEvents,
        queryKey: FuneralEventQueryKey.allFuneralEvent
    });
}

export function useGetFuneralEventById(id: string) {
    return useQuery({
        queryFn: () => getFuneralEventById(id),
        queryKey: FuneralEventQueryKey.funeralEvent(id),
        enabled: !!id
    });
}