import {api} from "@/shared/api/client.ts";

const endpoint="/inventory-allocation";
const storeEndpoint="/store"

export async  function getUnAllocatedItems(){
    const result = await api.get(endpoint+"/unallocated");
    return result.data;
}

export async function getStores(){
    const result = await api.get(storeEndpoint);
    return result.data;
}

export async function getAllocationByStoreId(storeId:string){
    console.log("storeId: "+storeId)
    const result = await api.get(`${endpoint}/${storeId}/store`);
    return result.data;
}

export async function allocateItem({item, quantity, storeId}: {item: string, quantity: number, storeId: string}){
    const result = await api.post(endpoint,{item,quantity,storeId});
    return result.data;
}

export async function getAllocationSummary(){
    const result = await api.get(`${endpoint}/alloction-summary`);
    return result.data;
}