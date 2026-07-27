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