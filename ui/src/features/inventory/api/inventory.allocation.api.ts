import {api} from "@/shared/api/client.ts";

const endpoint="/inventory-allocation";

export async  function getUnAllocatedItems(){
    const result = await api.get(endpoint+"/unallocated");
    return result.data;

}