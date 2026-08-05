import {useQuery} from "@tanstack/react-query";
import {getMeetingEventById, getMeetingEvents} from "@/features/funeral/apis/meeting-event.api.ts";

export function useGetMeetingEvents(){
    return useQuery({
        queryKey:["meeting-events"],
        queryFn:getMeetingEvents
    })
}

export function useGetMeetingEventById(id:string){
    return useQuery({
        queryKey:["meeting-events"],
        queryFn:()=>getMeetingEventById(id),
        enabled:!!id
    })

}