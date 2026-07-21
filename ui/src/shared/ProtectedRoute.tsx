import {Navigate, Outlet} from "react-router";
import {useAuth} from "@/features/auths/useAuth.tsx";
import {SpinnerPage} from "@/pages/SpinnerPage.tsx";


export function ProtectedRoute() {
    const {
        isAuthenticated,
        isLoading,
    } = useAuth();

    if (isLoading) {
        return (
            <SpinnerPage
                message="Checking your session..."
            />
        );
    }

    if (!isAuthenticated) {
        return (
            <Navigate
                to="/login"
                replace
            />
        );
    }

    return <Outlet />;
}