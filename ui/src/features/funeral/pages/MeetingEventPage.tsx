import {useNavigate, useParams} from "react-router";
import {useGetMeetingEventById} from "@/features/funeral/hooks/useGetMeetingEvents.ts";
import {SpinnerPage} from "@/pages/SpinnerPage.tsx";
import {PageError} from "@/pages/PageError.tsx";
import MeetingEventForm from "@/features/funeral/components/MeetingEventForm.tsx";
import {useCreateMeetingEvent, useUpdateMeetingEvent} from "@/features/funeral/hooks/useMeetingEvent.ts";

const MeetingEventPage = () => {
    const {eventId = ""} = useParams<{ eventId: string }>();
    const navigate = useNavigate();
    const {
        data: meeting,
        isLoading: isMeetingLoading,
        isError: isMeetingError,
        error
    } = useGetMeetingEventById(eventId == "new-meeting-event" ? undefined : eventId);
    const updateMeetingEvent = useUpdateMeetingEvent({
        onSuccess: () => {
            console.log(updateMeetingEvent.data)
            navigate(`/${eventId}/meeting-event-detail`)
        }
    });

    const createMeetingEvent = useCreateMeetingEvent({
        onSuccess: (data) => {

                navigate(`/${data}/meeting-event-detail`)

        }
    })

    if (isMeetingLoading) {
        return <>
            <SpinnerPage/>
        </>
    }

    if (isMeetingError) {
        return <>
            <PageError title={"Error Fetching Meeting event"} description={error.message}/>
        </>
    }

    return (
        <div>
            {
                eventId && meeting ? (
                    <MeetingEventForm
                        defaultValues={meeting}
                        submitText={"Update Meeting"}
                        onSubmit={values =>
                            updateMeetingEvent.mutateAsync(
                                {
                                    id: eventId,
                                    data: values
                                }
                            )
                        }
                        loading={updateMeetingEvent.isPending}
                    />
                ) : (
                    <MeetingEventForm
                        submitText={"Create Meeting"}
                        onSubmit={values => createMeetingEvent.mutate(values)}
                        loading={createMeetingEvent.isPending}
                    />
                )
            }
        </div>
    )
}

export default MeetingEventPage;