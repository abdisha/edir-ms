import ContributionPage from "@/features/contribution/pages/ContributionPage.tsx";
import AddContributionPage from "@/features/contribution/pages/AddContributionPage.tsx";
import MemberContributionDetailPage from "@/features/contribution/pages/MemberContributionDetailPage.tsx";


export const ContributionRoutes = [
    {
        path:'/contributions',
        element:<ContributionPage/>
    },
    {
        path: '/add-contribution',
        element: <AddContributionPage/>
    },
    {
        path:'/:id/member-contribution-detail',
        element: <MemberContributionDetailPage/>
    }
]