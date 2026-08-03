import {api} from "@/shared/api/client.ts";

const memberEndpoint="members";
export async function getMembers(){
    const result = await api.get(memberEndpoint+"/member-summary");
    return result.data;

}
