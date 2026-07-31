import FuneralEventPage from "@/features/funeral/pages/FuneralEventPage.tsx";
import FuneralEventDetailPage from "@/features/funeral/pages/FuneralEventDetailPage.tsx";

const FuneralEventRoutes=[
    {
        path:'/event-event',
        element:<FuneralEventPage/>
    },
    {
        path:'/event-event-detail',
        element:<FuneralEventDetailPage/>
    }
]

export default FuneralEventRoutes;