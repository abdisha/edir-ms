import {
    CalendarDays,
    CheckCircle2,
    ClipboardList,
    Clock3,
    Lock,
    MapPin,
    MoreVertical,
    Pencil,
    Trash2,
    Users,
} from "lucide-react";

import {Badge,} from "@/shared/components/ui/badge";

import {Button,} from "@/shared/components/ui/button";

import {Card, CardContent, CardDescription, CardHeader, CardTitle,} from "@/shared/components/ui/card";

import {Separator,} from "@/shared/components/ui/separator";
import {useNavigate, useParams} from "react-router";
import {useGetMeetingEventById} from "@/features/funeral/hooks/useGetMeetingEvents.ts";
import {SpinnerPage} from "@/pages/SpinnerPage.tsx";
import {PageError} from "@/pages/PageError.tsx";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/shared/components/ui/dropdown-menu.tsx";
import {useDeleteMeetingEvent} from "@/features/funeral/hooks/useMeetingEvent.ts";


export default function MeetingEventDetailPage() {
    const {eventId = ""} = useParams<{ eventId: string }>();
    const {data: meeting, isLoading: meetingLoading, isError: meetingError, error} = useGetMeetingEventById(eventId);
    const navigate = useNavigate();
    const deleteMeetingEvent = useDeleteMeetingEvent({
        onSuccess: () => {
            navigate("/meeting-events")
        }
    })

    if (meetingLoading) {
        return <SpinnerPage/>
    }

    if (meetingError) {
        return <PageError title={'Unable to load meeting event'} description={error.message}/>
    }

    return (
        <div className="mx-auto max-w-5xl space-y-8">


            <Card>

                <CardContent className="p-8">

                    <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">

                        <div className="flex gap-5">

                            <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-primary/10">

                                <Users className="h-8 w-8 text-primary"/>

                            </div>

                            <div className="space-y-3">

                                <div className="flex flex-wrap items-center gap-3">

                                    <h1 className="text-3xl font-bold">

                                        {meeting.meetingName}

                                    </h1>

                                    {meeting.isClosed ? (

                                        <Badge variant="secondary">

                                            <Lock className="mr-1 h-3.5 w-3.5"/>

                                            Closed

                                        </Badge>

                                    ) : (

                                        <Badge className="bg-green-600 hover:bg-green-600">

                                            <Clock3 className="mr-1 h-3.5 w-3.5"/>

                                            Open

                                        </Badge>

                                    )}

                                </div>

                                <p className="max-w-3xl text-muted-foreground">

                                    This meeting contains the official agenda,
                                    location and scheduled meeting date for Edir
                                    members.

                                </p>

                            </div>

                        </div>

                        <div className="flex gap-3">
                            <DropdownMenu>
                                <DropdownMenuTrigger>
                                    <Button variant="ghost" size="icon">
                                        <MoreVertical className="h-5 w-5"/>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem
                                        onClick={() => navigate(`/${eventId}/meeting-event`)}
                                    >
                                        <Pencil className="mr-2 h-4 w-4"/>
                                        Edit
                                    </DropdownMenuItem>
                                    {!meeting.isClosed && (
                                        <DropdownMenuItem
                                            onClick={() => {
                                                //TODO: implement close meeting
                                            }}
                                        >
                                            <CheckCircle2 className="mr-2 h-4 w-4"/>
                                            Close
                                        </DropdownMenuItem>
                                    )}
                                    <DropdownMenuItem
                                        className="text-red-500"
                                        onClick={() => deleteMeetingEvent.mutate(eventId)}
                                    >
                                        <Trash2 className="mr-2 h-4 w-4"/>
                                        Delete
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>

                    </div>

                </CardContent>

            </Card>

            {/* Details */}

            <div className="grid gap-6 lg:grid-cols-3">

                <Card>

                    <CardHeader>

                        <CardTitle>
                            Meeting Information
                        </CardTitle>

                        <CardDescription>
                            General meeting details.
                        </CardDescription>

                    </CardHeader>

                    <CardContent className="space-y-6">

                        <div className="flex items-start gap-3">

                            <CalendarDays className="mt-1 h-5 w-5 text-primary"/>

                            <div>

                                <p className="text-sm text-muted-foreground">
                                    Meeting Date
                                </p>

                                <p className="font-medium">
                                    {new Date(
                                        meeting.eventDate
                                    ).toLocaleString()}
                                </p>

                            </div>

                        </div>

                        <Separator/>

                        <div className="flex items-start gap-3">

                            <MapPin className="mt-1 h-5 w-5 text-primary"/>

                            <div>

                                <p className="text-sm text-muted-foreground">
                                    Location
                                </p>

                                <p className="font-medium">
                                    {meeting.location}
                                </p>

                            </div>

                        </div>

                        <Separator/>

                        <div className="flex items-start gap-3">

                            <Clock3 className="mt-1 h-5 w-5 text-primary"/>

                            <div>

                                <p className="text-sm text-muted-foreground">
                                    Status
                                </p>

                                <p className="font-medium">

                                    {meeting.isClosed
                                        ? "Closed"
                                        : "Open"}

                                </p>

                            </div>

                        </div>

                    </CardContent>

                </Card>

                <Card className="lg:col-span-2">

                    <CardHeader>

                        <CardTitle className="flex items-center gap-2">

                            <ClipboardList className="h-5 w-5 text-primary"/>

                            Meeting Agenda

                        </CardTitle>

                        <CardDescription>
                            Topics planned for discussion during the meeting.
                        </CardDescription>

                    </CardHeader>

                    <CardContent>

                        <div className="rounded-lg border bg-muted/30 p-6 leading-7">

                            {meeting.agenda}

                        </div>

                    </CardContent>

                </Card>

            </div>
        </div>
    );
}