import {api} from "@/shared/api/client.ts";
import type {CreateEdirRequest} from "@/features/edir/types/edir.ts";

export async function createEdir(request: CreateEdirRequest) {
    const response = await api.post("/edir", request);
    return response.data;
}