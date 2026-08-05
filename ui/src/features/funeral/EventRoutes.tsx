import EventPage from "@/features/funeral/pages/EventPage.tsx";
import EventDetailPage from "@/features/funeral/pages/EventDetailPage.tsx";
import FuneralEventDetailPage from "@/features/funeral/pages/FuneralEventDetailPage.tsx";
import FuneralEventPage from "@/features/funeral/pages/FuneralEventPage.tsx";
import MeetingEventPage from "@/features/funeral/pages/MeetingEventPage.tsx";
import MeetingEventDetailPage from "@/features/funeral/pages/MeetingEventDetailPage.tsx";

const EventRoutes=[
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
    },
    {
        path:"/:eventId/funeral-event-detail",
        element:<FuneralEventDetailPage/>
    },
    {
        path:"/:eventId/meeting-event",
        element:<MeetingEventPage/>
    },
    {
        path:"/:eventId/meeting-event-detail",
        element:<MeetingEventDetailPage/>
    }


]

export default EventRoutes;