import {api} from "@/shared/api/client.ts";
import type {Page} from "@/features/contribution/types/contribution.ts";

const endpoint:string  ="/member-contributions"

export async function getMemberContributions(uuid:string):Promise<Page>{
    const response = await api.get(endpoint+"/contribution/"+uuid);
    return response.data;
}