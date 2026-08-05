import {useParams} from "react-router";
import {useGetMeetingEventById} from "@/features/funeral/hooks/useGetMeetingEvents.ts";
import {SpinnerPage} from "@/pages/SpinnerPage.tsx";
import {PageError} from "@/pages/PageError.tsx";
import MeetingEventForm from "@/features/funeral/components/MeetingEventForm.tsx";
import {useCreateMeetingEvent, useUpdateMeetingEvent} from "@/features/funeral/hooks/useMeetingEvent.ts";

const MeetingEventPage =()=>{
    const { eventId = "" } = useParams<{ eventId: string }>();
    const {data:meeting,isLoading:isMeetingLoading,isError:isMeetingError,error} = useGetMeetingEventById(eventId=="new-meeting-event"?undefined:eventId);
    const updateMeetingEvent = useUpdateMeetingEvent();
    const createMeetingEvent = useCreateMeetingEvent({
        onSuccess:()=>navigate(createMeetingEvent.data+"/meeting-event")
    })
    if(isMeetingLoading){
        return <>
            <SpinnerPage/>
        </>
    }

    if(isMeetingError){
        return <>
            <PageError title={"Error Fetching Meeting event"} description={error.message}/>
            </>
    }

    return (
        <div>
            {
                meeting ?(
                    <MeetingEventForm
                        defaultValues={meeting}
                        onSubmit={values => createMeetingEvent.mutate(values)}
                                      loading={updateMeetingEvent.isPending}
                    />
                ):(
                    <MeetingEventForm
                        onSubmit={values => createMeetingEvent.mutate(values)}
                        loading={updateMeetingEvent.isPending}
                    />
                )
            }
        </div>
    )
}

export default MeetingEventPage;