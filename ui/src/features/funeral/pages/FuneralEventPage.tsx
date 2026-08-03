import {useNavigate, useParams} from "react-router";
import {useGetFuneralEventById} from "@/features/funeral/hooks/useGetFuneralEvent.ts";
import FuneralEventForm from "@/features/funeral/components/FuneralEventForm.tsx";
import {useCreateFuneralEvent} from "@/features/funeral/hooks/useCreateFuneralEvent.ts";
import {useGetMembers} from "@/shared/hooks/useGetMembers.ts";
import {useState} from "react";

const FuneralEventPage =()=>{
    const { eventId = "" } = useParams<{ eventId: string }>();
    const members = useGetMembers();
    const {data:funeralQuery} = useGetFuneralEventById(eventId);
    const navigate = useNavigate()
    const createMutation = useCreateFuneralEvent({
        onSuccess: () => {
            console.log("saved "+createMutation.data)
            navigate(createMutation.data+"/funeral-events")
        },
    });
    const isCreateMode = eventId;
    const [editing, setEditing] = useState(false);

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
                        await createMutation.mutateAsync(values);

                    }
                    setEditing(false);

                }}
            />
        </>
    )
}

export default  FuneralEventPage;