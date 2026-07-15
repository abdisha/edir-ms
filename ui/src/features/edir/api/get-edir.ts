import {api} from "@/shared/api/client.ts";
import type {EdirResponse} from "../types/edir";

export async function getEdir(): Promise<EdirResponse> {
    const response = await api.get("/edir");

    return response.data;
}