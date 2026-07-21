import {useMutation} from "@tanstack/react-query";
import {login, register} from "@/features/auths/api/auth.apis.ts";


export function useLogin() {
    return useMutation({
        mutationFn: login,
    });
}

export function useRegister() {
    return useMutation({
        mutationFn: register,
    });
}