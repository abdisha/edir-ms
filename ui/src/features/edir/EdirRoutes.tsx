import EdirPage from "@/features/edir/pages/EdirPage.tsx";
import SetupEdirPage from "@/features/edir/pages/SetupEdirPage.tsx";
import EditEdirPage from "@/features/edir/pages/EditEdirPage.tsx";
import MembersPage from "@/features/edir/pages/MembersPage.tsx";
import AddMembersPage from "@/features/edir/pages/AddMembersPage.tsx";
import EditMembersPage from "@/features/edir/pages/EditMembersPage.tsx";
import MemberDetailPage from "@/features/edir/pages/MemberDetailPage.tsx";

export const EdirRoutes = [
    {
        path:'/',
        index:true,
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
    },
    {
        path:'/members',
        element:<MembersPage/>
    },
    {
        path:'/add-members',
        element:<AddMembersPage/>
    },
    {
        path:'/edit-members',
        element:<EditMembersPage/>
    },
    {
        path:'/members/:id',
        element:<MemberDetailPage/>
    }
]