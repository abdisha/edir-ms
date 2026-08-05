import {api} from "@/shared/api/client.ts";

const endpiont = "meeting-event";

export async function getMeetingEvents(){
    const result = await api.get(endpiont);
    return result.data;
}

export async function getMeetingEventById(id:string){
    const result = await api.get(`${endpiont}/${id}`);
    return result.data;
}

export async function createMeetingEvent(data:any){
    const result = await api.post(endpiont,data);
    return result.data;
}

export async function updateMeetingEvent(id:string,data:any){
    const result = await api.put(`${endpiont}/${id}`,data);
    return result.data;
}