import {api} from "@/shared/api/client.ts";
import type {Page} from "@/features/contribution/types/contribution.ts";

const endpoint:string  ="/member-contributions"

export async function getMemberContributions(uuid: string): Promise<Page> {
    // Return an empty page when uuid is not provided to avoid undefined returns
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