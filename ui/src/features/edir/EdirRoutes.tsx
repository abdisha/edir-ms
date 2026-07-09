import EdirPage from "@/features/edir/pages/EdirPage.tsx";
import SetupEdirPage from "@/features/edir/pages/SetupEdirPage.tsx";

export const EdirRoutes = [
    {
        path:'/',
        element:<EdirPage/>
    }, {
        path:'/home',
        element:<EdirPage/>
    },
    {
        path:'/edirpage',
        element:<EdirPage/>
    },
    {
        path:'/setup-edir',
        element:<SetupEdirPage/>
    }
]