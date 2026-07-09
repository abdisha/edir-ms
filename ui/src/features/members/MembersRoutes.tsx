import MembersPage from "@/features/members/pages/MembersPage.tsx";
import AddMembersPage from "@/features/members/pages/AddMembersPage.tsx";
import EditMembersPage from "@/features/members/pages/EditMembersPage.tsx";
import MemberDetailPage from "@/features/members/pages/MemberDetailPage.tsx";

export const MembersRoutes =[
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

