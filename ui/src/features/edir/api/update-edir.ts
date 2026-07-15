import {api} from "@/shared/api/client.ts";
import type {UpdateEdirRequest} from "@/features/edir/types/edir.ts";

export async function updateEdir(request: UpdateEdirRequest) {
    const response = await api.put("/edir", request);

    return response.data;
}