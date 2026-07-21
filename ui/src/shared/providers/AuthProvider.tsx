import {type ReactNode, useCallback, useEffect, useState,} from "react";

import {AuthContext, type User} from "@/features/auths/AuthContext.tsx";
import {getAccessToken, removeAccessToken} from "@/lib/token-storage.ts";
import {getCurrentUser, logoutRequest} from "@/features/auths/api/auth.apis.ts";

interface Props {
    children: ReactNode;
}

export function AuthProvider({ children }: Props) {
    const [user, setUser] = useState<User | null>(null);

    const [isLoading, setIsLoading] =
        useState(true);

    const refresh = useCallback(async () => {
        try {
            const token = getAccessToken();

            if (!token) {
                setUser(null);
                return;
            }

            const me = await getCurrentUser();

            setUser(me);
        } catch {
            removeAccessToken();
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        console.log("refresh token is called")
        refresh();
    }, [refresh]);

    function login(user: User) {
        setUser(user);
        console.log("Login user:"+user)
    }

    async function logout() {
        try {
            await logoutRequest();
        } catch {
        } finally {
            removeAccessToken();
            setUser(null);
        }
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated: !!user,
                isLoading,
                login,
                logout,
                refresh,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}