import {useQuery} from "@tanstack/react-query";
import {
    getFuneralEventById,
    getFuneralEventItemIssue,
    getFuneralEvents
} from "@/features/funeral/apis/funeral-event.apis.ts";
import {FuneralEventQueryKey} from "@/features/funeral/apis/funeral-event-query.key.ts";

export function useGetFuneralEvent(){
    return useQuery({
        queryFn: getFuneralEvents,
        queryKey: FuneralEventQueryKey.allFuneralEvent
    });
}

export function useGetFuneralEventById(id: undefined | string) {
    return useQuery({
        queryFn: () => getFuneralEventById(id!),
        queryKey: FuneralEventQueryKey.funeralEvent(id!),
        enabled: !!id
    });
}

export function useGetItemIssueById(funeralId:string){
    return  useQuery({
        queryFn:()=>getFuneralEventItemIssue(funeralId),
        queryKey:FuneralEventQueryKey.itemIssueAll,
        enabled: Boolean(funeralId)
    })
}