import ContributionPage from "@/features/contribution/pages/ContributionPage.tsx";
import AddContributionPage from "@/features/contribution/pages/AddContributionPage.tsx";


export const ContributionRoutes = [
    {
        path:'/contributions',
        element:<ContributionPage/>
    },
    {
        path: '/add-contribution',
        element: <AddContributionPage/>
    }
]