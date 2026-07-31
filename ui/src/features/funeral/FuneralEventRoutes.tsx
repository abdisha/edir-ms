import EventPage from "@/features/funeral/pages/EventPage.tsx";
import EventDetailPage from "@/features/funeral/pages/EventDetailPage.tsx";

const FuneralEventRoutes=[
    {
        path:'/event-event',
        element:<EventPage/>
    },
    {
        path:'/event-event-detail',
        element:<EventDetailPage/>
    }
]

export default FuneralEventRoutes;