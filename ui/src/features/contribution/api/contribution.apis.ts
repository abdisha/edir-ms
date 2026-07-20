import {api} from "@/shared/api/client.ts";
import type {
    AddContributionRequest,
    ContributionResponse,
    UpdateContribution
} from "@/features/contribution/types/contribution.ts";

const endpoint:string  ="/contributions"
export async function createContribution(request: AddContributionRequest) {
    const response = await api.post(endpoint, request);
    return response.data;
}

export async function getContribution(): Promise<ContributionResponse> {
    const response = await api.get(endpoint+"/active");
    return response.data;
}

export async function updateContribution(request: UpdateContribution) {
    const response = await api.put(endpoint, request);

    return response.data;
}