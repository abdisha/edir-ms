import {api} from "@/shared/api/client.ts";

const endpoint = "inventory-issue"

export async function getIssues() {
    const result = await api.get(endpoint);
    return result.data;
}

export async function getIssueItems(id: String) {
    const result = await api.get(`${endpoint}/${id}`)
    return result.data;
}

export async function approve(data:{item:string,issueId:string,quantity:number,from:string}){
    const result = await  api.put(`${endpoint}/${data.issueId}/approve`,data);
    return result.data;
}

export async function reject(itemIssueId:string){
    const result = await api.put(`${endpoint}/${itemIssueId}/reject`);
    return result.data;

}