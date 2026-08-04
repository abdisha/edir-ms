import {useNavigate, useParams} from "react-router";

import {FuneralEventBanner} from "@/features/funeral/components/FuneralEventBanner";
import {FuneralEventItemIssueTable} from "@/features/funeral/components/FuneralEventItemIssueTable";
import {useGetFuneralEventById, useGetItemIssueById,} from "@/features/funeral/hooks/useGetFuneralEvent";

import {SpinnerCard} from "@/shared/components/SpinnerCard";
import {Button} from "@/shared/components/ui/button";
import {Alert, AlertDescription, AlertTitle,} from "@/shared/components/ui/alert";

import {AlertCircle, ClipboardList, Pencil} from "lucide-react";
import {useGetMembers} from "@/shared/hooks/useGetMembers.ts";
import {FormDrawer} from "@/shared/components/FromDrawer.tsx";
import {useFormDrawer} from "@/shared/components/useFormDrawer.ts";
import ItemIssueForm from "@/features/funeral/components/ItemIssueForm.tsx";
import {useGetInventory} from "@/features/funeral/hooks/useGetInventory.ts";

const FuneralEventDetailPage = () => {
  const { eventId = "" } = useParams<{ eventId: string }>();
  const { data: funeralQuery, isLoading: pageLoading, isError:isFuneralError } = useGetFuneralEventById(eventId);
  const { data: itemIssueQuery, isLoading: itemIssueLoading,isError:isItemError,error:itemError } = useGetItemIssueById(eventId);
  const navigate = useNavigate();
  const members = useGetMembers();
  const {open,closeDrawer,openDrawer} = useFormDrawer();
  const {data:item,isLoading:isItemLoading,isError:itemErr} = useGetInventory();

    if (pageLoading || members.isLoading ||isItemLoading) {
        return (
            <div className="container mx-auto max-w-7xl py-10">
                <SpinnerCard
                    size={24}
                    text="Loading funeral event..."
                />
            </div>
        );
    }

    if (isFuneralError || itemErr) {
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
      {funeralQuery && (
        <FuneralEventBanner
           members={members.data}
          funeral={funeralQuery}
          onEdit={() => navigate(`/${eventId}/funeral-event`)}
        />
      )}
        <section className="space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="flex items-center gap-2 text-xl font-semibold">
                <ClipboardList className="h-5 w-5 text-primary" />
                Issued Inventory
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Items allocated for this funeral event.
              </p>
            </div>
            <Button variant="outline" onClick={()=>openDrawer()}>
              <Pencil className="mr-2 h-4 w-4" />
              Manage Items
            </Button>
          </div>
          <div className="rounded-xl border bg-background">
            <FuneralEventItemIssueTable
              isLoading={itemIssueLoading}
              issuedItems={itemIssueQuery}
            />
          </div>
        </section>
        <FormDrawer open={open} onOpenChange={openDrawer} title={'Issue Item for funeral'}>
            <ItemIssueForm funeralId={eventId}
                           items={item}
                           onCancel={()=>closeDrawer()}
                           onSubmit={(values)=>console.log(values)}/>
        </FormDrawer>
      {isItemError&& (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Unable to load issued items</AlertTitle>
          <AlertDescription>{itemError.message}</AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default FuneralEventDetailPage;