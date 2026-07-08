
import {AuthLayout} from "@/features/auths/layouts/AuthLayout.tsx";
import LoginPage from "@/features/auths/pages/LoginPage.tsx";
import RegisterPage from "@/features/auths/pages/RegisterPage.tsx";

export const authRouter = [
    {
        path:'/',
        element: <AuthLayout />,
        children: [
            {path:'/',
                element: <LoginPage />,
            },
            {
                path: "/login",
                element: <LoginPage />,
            },
            {
                path: "/register",
                element: <RegisterPage />,
            },
        ],
    },
];