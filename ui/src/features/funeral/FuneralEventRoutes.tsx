import FuneralEventPage from "@/features/funeral/pages/FuneralEventPage.tsx";
import FuneralEventDetailPage from "@/features/funeral/pages/FuneralEventDetailPage.tsx";

const FuneralEventRoutes=[
    {
        path:'/funeral-event',
        element:<FuneralEventPage/>
    },
    {
        path:'/funeral-event-detail',
        element:<FuneralEventDetailPage/>
    }
]

export default FuneralEventRoutes;