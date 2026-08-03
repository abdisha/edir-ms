import { useMemo, useState } from "react";
import { useParams } from "react-router";

import FuneralEventForm from "@/features/funeral/components/FuneralEventForm";
import { FuneralEventBanner } from "@/features/funeral/components/FuneralEventBanner";
import { FuneralEventItemIssueTable } from "@/features/funeral/components/FuneralEventItemIssueTable";

import { useCreateFuneralEvent } from "@/features/funeral/hooks/useCreateFuneralEvent";
import {
    useGetFuneralEventById,
    useGetItemIssueById,
} from "@/features/funeral/hooks/useGetFuneralEvent";

import { useGetMembers } from "@/shared/hooks/useGetMembers";

import { SpinnerCard } from "@/shared/components/SpinnerCard";
import { Button } from "@/shared/components/ui/button";
import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/shared/components/ui/alert";

import {
    AlertCircle,
    ClipboardList,
    Pencil,
} from "lucide-react";

const NEW_EVENT_ID = "new-funeral-event";

const FuneralEventDetailPage = () => {

    const { eventId = "" } = useParams<{ eventId: string }>();

    const isCreateMode = eventId === NEW_EVENT_ID;

    const [editing, setEditing] = useState(false);
    const [funeralId,setFuneralId] = useState();

    const members = useGetMembers();

    const createMutation = useCreateFuneralEvent({
        onSuccess: () => setEditing(false),
    });

    const funeralQuery =
        useGetFuneralEventById(
            isCreateMode ? undefined : eventId
        );

    const itemIssueQuery = useGetItemIssueById(isCreateMode ? undefined : eventId);

    const showForm = isCreateMode || editing;

    const pageLoading = useMemo(() => {

        if (members.isLoading)
            return true;

        return !isCreateMode && funeralQuery.isLoading;

        }, [
        members.isLoading,
        funeralQuery.isLoading,
        isCreateMode,
    ]);

    if (pageLoading) {
        return (
            <div className="container mx-auto max-w-7xl py-10">
                <SpinnerCard
                    size={24}
                    text="Loading funeral event..."
                />
            </div>
        );
    }

    if (members.isError) {
        return (
            <div className="container mx-auto max-w-5xl py-10">
                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
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

    if (!isCreateMode && funeralQuery.isError) {
        return (
            <div className="container mx-auto max-w-5xl py-10">
                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>
                        Unable to load funeral event
                    </AlertTitle>
                    <AlertDescription>
                        {funeralQuery.error.message}
                    </AlertDescription>
                </Alert>
            </div>
        );
    }

    return (

        <div className="container mx-auto max-w-7xl space-y-8 py-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">
                    {isCreateMode
                        ? "Register Funeral Event"
                        : "Funeral Event"}
                </h1>
                <p className="mt-2 text-muted-foreground">

                    {isCreateMode
                        ? "Create a new funeral event for an Edir member."
                        : "View and manage funeral event details, issued inventory, and financial support."}
                </p>
            </div>

            {/* CREATE / EDIT */}

            {showForm ? (

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
                            let funeralEventId =  createMutation.data
                        }
                        setEditing(false);

                    }}
                />

            ) : (

                funeralQuery.data && (
                    <FuneralEventBanner
                        funeral={funeralQuery.data}
                        onEdit={() => setEditing(true)}
                    />

                )

            )}

            {/* TABLE */}

            {!showForm &&
                itemIssueQuery.data &&
                itemIssueQuery.data.length > 0 && (

                    <section className="space-y-5">

                        <div className="flex items-center justify-between">

                            <div>

                                <h2 className="flex items-center gap-2 text-xl font-semibold">

                                    <ClipboardList className="h-5 w-5 text-primary"/>

                                    Issued Inventory

                                </h2>

                                <p className="mt-1 text-sm text-muted-foreground">

                                    Items allocated for this funeral event.

                                </p>

                            </div>

                            <Button variant="outline">

                                <Pencil className="mr-2 h-4 w-4"/>

                                Manage Items

                            </Button>

                        </div>

                        <div className="rounded-xl border bg-background">

                            <FuneralEventItemIssueTable
                                issuedItems={itemIssueQuery.data}
                            />

                        </div>

                    </section>

                )}

            {/* ITEM ISSUE ERROR */}

            {!showForm &&
                itemIssueQuery.isError && (

                    <Alert>

                        <AlertCircle className="h-4 w-4"/>

                        <AlertTitle>

                            Unable to load issued items

                        </AlertTitle>

                        <AlertDescription>

                            {itemIssueQuery.error.message}

                        </AlertDescription>

                    </Alert>

                )}

        </div>

    );

};

export default FuneralEventDetailPage;