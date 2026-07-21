import {createBrowserRouter} from "react-router";
import MainLayout from "@/layouts/MainLayout.tsx";
import {EdirRoutes} from "@/features/edir/EdirRoutes.tsx";
import {ContributionRoutes} from "@/features/contribution/ContributionRoutes.tsx";
import {authRouter} from "@/features/auths/authRouter.tsx";
import {PublicRoute} from "@/shared/PublicRoute.tsx";
import {ProtectedRoute} from "@/shared/ProtectedRoute.tsx";

export const router = createBrowserRouter([
    {
        element:<PublicRoute/>,
        children:[
            ...authRouter,

        ]
    },

    {
        element:<ProtectedRoute/>,
        children:[
            {
                path:'/',
                element:<MainLayout/>,
                children:[
                    ...EdirRoutes,
                    ...ContributionRoutes
                ]

            }
        ]
    }

]);