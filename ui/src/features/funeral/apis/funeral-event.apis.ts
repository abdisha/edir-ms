import type {CreateFuneralEvent} from "@/features/funeral/types/types.ts";
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