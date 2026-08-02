import EventPage from "@/features/funeral/pages/EventPage.tsx";
import EventDetailPage from "@/features/funeral/pages/EventDetailPage.tsx";
import FuneralEventPage from "@/features/funeral/pages/FuneralEventPage.tsx";

const FuneralEventRoutes=[
    {
        path:'/event',
        element:<EventPage/>
    },
    {
        path:'/event-detail',
        element:<EventDetailPage/>
    },
    {
        path:"/:eventId/funeral-event",
        element:<FuneralEventPage/>
    }

]

export default FuneralEventRoutes;