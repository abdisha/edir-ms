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