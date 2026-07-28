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