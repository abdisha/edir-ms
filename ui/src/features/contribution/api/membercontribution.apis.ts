import {api} from "@/shared/api/client.ts";
import type {MemberContribution, Page, ReceivePayment} from "@/features/contribution/types/contribution.ts";

const endpoint:string  ="/member-contributions"

export async function getMemberContributions(uuid: string): Promise<Page> {
    if (!uuid) {
        return {
            content: [],
            pageNumber: 0,
            pageSize: 0,
            totalElements: 0,
            totalPages: 0,
        };
    }

    const response = await api.get(endpoint + "/contribution/" + uuid);
    return response.data;
}

export async  function getMemberContribution(uuid: string): Promise<MemberContribution>{
    const response = await api.get(endpoint + "/" + uuid);
    return response.data;
}

export async function  payContribution(payment:ReceivePayment){
    const  response = await  api.post(endpoint,payment);
    return response.data
}