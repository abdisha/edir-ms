import {api} from "@/shared/api/client.ts";

const endpoint = "meeting-event";

export async function getMeetingEvents(){
    const result = await api.get(endpoint);
    return result.data;
}

export async function getMeetingEventById(id:string){
    const result = await api.get(`${endpoint}/${id}`);
    return result.data;
}

export async function createMeetingEvent(data:any){
    const result = await api.post(endpoint,data);
    return result.data;
}

export async function updateMeetingEvent(request:{id: string, data: any}){
    const result = await api.put(`${endpoint}/${request.id}`,request.data);
    return result.data;
}

export async function deleteMeetingEvent(eventId:string){
    const result = await api.delete(`${endpoint}/${eventId}`);
    return result.data;

}