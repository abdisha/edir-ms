import {api} from "@/shared/api/client.ts";
import type {Store} from "@/features/setting/types.ts";

const endpoint = "store";

export async function getStores() {
    const result = await api.get(endpoint);
    return result.data;
}

export async function createStore(store: Store) {
    const result = await api.post(endpoint, store);
    return result.data;
}

export async function getStore(id: string) {
    const result = await api.get(endpoint + "/" + id);
    return result.data;
}

export async function changeOwner(id: string, ownerId: string){
    const result = await api.put(endpoint + "/" + id, {ownerId})
    return result.data;
}

export async function changeName(id: string, name: string){
    const result = await api.put(endpoint + "/" + id, {name})
    return result.data;
}