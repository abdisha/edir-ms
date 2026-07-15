import {createBrowserRouter} from "react-router";
import MainLayout from "@/layouts/MainLayout.tsx";
import {EdirRoutes} from "@/features/edir/EdirRoutes.tsx";

export const router = createBrowserRouter([
       // ...authRouter,
       {
              path:'/',
              element:<MainLayout/>,
              children:[
                  ...EdirRoutes
              ]

       }
]);