import {Navigate, Outlet} from "react-router";
import {useAuth} from "@/features/auths/useAuth.tsx";

export function PublicRoute() {
    const {
        isAuthenticated,
        isLoading,
    } = useAuth();

    if (isLoading) {
        return null;
    }

    if (isAuthenticated) {
        return (
            <Navigate
                to="/"
                replace
            />
        );
    }

    return <Outlet />;
}