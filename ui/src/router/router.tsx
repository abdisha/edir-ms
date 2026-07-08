import {createBrowserRouter} from "react-router";
import MainLayout from "@/layouts/MainLayout.tsx";
import DashboardPage from "@/features/dashboard/pages/DashboardPage.tsx";
import {EdirRouters} from "@/features/edir/EdirRouters.tsx";

export const router = createBrowserRouter([
       // ...authRouter,
       {
              path:'/',
              element:<MainLayout/>,
              children:[
                     {
                            path:'/',
                            element:<DashboardPage/>
                     },
                  ...EdirRouters
              ]

       }
]);