import type {RegisterFormValues} from "../schemas/register.schema";
import {api} from "@/shared/api/client.ts";
import type {LoginFormValues} from "@/features/auths/schemas/login.schema.ts";

const endpoint="/accounts/";
export async function register(
    request: RegisterFormValues
) {
    const { data } = await api.post(
        `${endpoint}register`,
        request
    );

    return data;
}

export async function login(request: LoginFormValues) {
    const { data } = await api.post("/auth/login", request);
    return data;
}

export async function getCurrentUser() {
    const { data } = await api  .get("/auth/me");
    return data;
}

export async function logoutRequest() {
    await api.post("/auth/logout");
}
