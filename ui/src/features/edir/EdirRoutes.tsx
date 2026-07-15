import EdirPage from "@/features/edir/pages/EdirPage.tsx";
import SetupEdirPage from "@/features/edir/pages/SetupEdirPage.tsx";
import EditEdirPage from "@/features/edir/pages/EditEdirPage.tsx";

export const EdirRoutes = [
    {
        path:'/',
        element:<EdirPage/>
    }, {
        path:'/home',
        element:<EdirPage/>
    },
    {
        path:'/edit',
        element:<EditEdirPage/>
    },
    {
        path:'/setup-edir',
        element:<SetupEdirPage/>
    }
]