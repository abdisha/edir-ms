import {api} from "@/shared/api/client.ts";
import type {Edir} from "../types/edir";

export async function getEdir(): Promise<Edir> {
    const response = await api.get("/edir");

    return response.data;
}