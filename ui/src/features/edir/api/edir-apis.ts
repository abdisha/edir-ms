import {api} from "@/shared/api/client.ts";
import type {CreateEdirRequest, EdirResponse, UpdateEdirRequest} from "@/features/edir/types/edir.ts";

export async function createEdir(request: CreateEdirRequest) {
    const response = await api.post("/edir", request);
    return response.data;
}

export async function getEdir(): Promise<EdirResponse> {
    const response = await api.get("/edir");
    return response.data;
}

export async function updateEdir(request: UpdateEdirRequest) {
    const response = await api.put("/edir", request);
    return response.data;
}