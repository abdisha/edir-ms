import {api} from "@/shared/api/client.ts";
import type {CreateItemRequest} from "@/features/inventory/types.ts";

const endpoint="/inventory";

export async function createItem(item:CreateItemRequest){
    const result = await api.post(endpoint, item);
    return  result.data;
}

export async function getAllItems(){
    const result =  await api.get(endpoint);
    return result.data;
}

export async function getItemById(id?:string){
    if(!id) return;
    const result = await api.get(endpoint+"/"+id)
    return result.data
}

export async function updateItem(updateItem:{itemId:string,itemName:string,quantityAtHand:number}){
    const result = await api.put(endpoint,updateItem);
    return result.data;
}