import type {CreateFuneralEvent, UpInsItemIssue} from "@/features/funeral/types/types.ts";
import {api} from "@/shared/api/client.ts";

const endpoint = "funeral-events";
export async function createFuneralEvent(data:CreateFuneralEvent){
        const result = await  api.post(endpoint,data);
        return result.data;
}


export async function getFuneralEvents(){
    const result = await  api.get(endpoint);
    return result.data;
}

export async function getFuneralEventById(id:string){
    const result = await  api.get(`${endpoint}/${id}`);
    return result.data;
}

export async function addFuneralEventItemIssue(data:UpInsItemIssue){
    const result = await  api.post(`${endpoint}/issue-item`,data);
    return result.data;
}

export async function getFuneralEventItemIssue(funeralEventId:string){
    const result = await  api.get(`${endpoint}/${funeralEventId}/issue-item`);
    return result.data;
}