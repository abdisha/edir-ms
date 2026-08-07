import {useNavigate, useParams} from "react-router";
import {useGetFuneralEventById} from "@/features/funeral/hooks/useGetFuneralEvent.ts";
import FuneralEventForm from "@/features/funeral/components/FuneralEventForm.tsx";
import {useCreateFuneralEvent} from "@/features/funeral/hooks/useCreateFuneralEvent.ts";
import {useGetMembers} from "@/shared/hooks/useGetMembers.ts";
import {useEffect, useState} from "react";
import {Alert, AlertDescription, AlertTitle} from "@/shared/components/ui/alert.tsx";
import {AlertCircle} from "lucide-react";

const NEW_FUNERAL_ID = "new-funeral-event"
const FuneralEventPage =()=>{
    const { eventId = "" } = useParams<{ eventId: string }>();
    const members = useGetMembers();
    const {data: funeralQuery} = useGetFuneralEventById(eventId == NEW_FUNERAL_ID ? undefined : eventId);
    const navigate = useNavigate()
    const createMutation = useCreateFuneralEvent();
    const isCreateMode = eventId;
    const [editing, setEditing] = useState(false);
    useEffect(() => {
        if (createMutation.isSuccess && createMutation.data) {
            console.log("success" + createMutation.data)
            navigate("/" + createMutation.data + "/funeral-event-detail");
        }
    }, [createMutation.isSuccess]);

    if (members.isError) {
        return (
            <div className="container mx-auto max-w-5xl py-10">
                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4"/>
                    <AlertTitle>
                        Unable to load members
                    </AlertTitle>
                    <AlertDescription>
                        {members.error.message}
                    </AlertDescription>
                </Alert>
            </div>
        );
    }

    return (
        <>
            <FuneralEventForm
                members={members.data ?? []}
                loading={createMutation.isPending}
                submitText={
                    isCreateMode
                        ? "Create Funeral Event"
                        : "Save Changes"
                }
                defaultValues={
                    editing
                        ? funeralQuery.data
                        : undefined
                }
                onSubmit={async (values) => {
                    console.log(values);
                    if (isCreateMode) {
                        await createMutation.mutateAsync(
                            {
                                ...values,
                                relationShip:values.relationShip
                            }
                        );

                    }
                    setEditing(false);

                }}
            />
        </>
    )
}

export default  FuneralEventPage;