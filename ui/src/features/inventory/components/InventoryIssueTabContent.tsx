import {Button} from "@/shared/components/ui/button.tsx";
import {PlusCircle, Trash2Icon} from "lucide-react";
import {TabsContent} from "@/shared/components/ui/tabs.tsx";
import {useState} from "react";
import {useGetIssue, useGetIssueItem} from "@/features/inventory/hooks/useGetIssueItem.ts";
import InventoryIssueTable from "@/features/inventory/components/tables/InventoryIssueTable.tsx";
import {FormDrawer} from "@/shared/components/FromDrawer.tsx";
import InventoryIssueApprovalForm from "@/features/inventory/components/forms/InventoryApprovalForm.tsx";
import {useFormDrawer} from "@/shared/components/useFormDrawer.ts";
import type {IssueItemView} from "@/features/inventory/types.ts";
import {useApprove, useReject} from "@/features/inventory/hooks/useIssuesManagement.ts";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogMedia,
    AlertDialogTitle,
    AlertDialogTrigger
} from "@/shared/components/ui/alert-dialog.tsx";

const InventoryIssueTabContent =()=>{
    const [selectedIssueId, setSelectedIssueId] = useState<string>();
    const [selectedItemIssue, setSelectedItemIssue] = useState<IssueItemView>();
    const [selectedItemId, setSelectedItemId] = useState<string>();
    const [dialog, setDialog] = useState<boolean>(false);
    const approveMutation = useApprove();
    const rejectMutation = useReject();

    const {setOpen, open} = useFormDrawer();
    const {data: issueItems = [], isLoading: itemsLoading} = useGetIssueItem(selectedIssueId);

    const {data: issues = [], isLoading: isIssuesLoading} = useGetIssue();

    const handleSelectIssue = (item: IssueItemView) => {
        setSelectedItemIssue(item);
        setOpen(true);
    };

    const handleAlertDialog =(itemId:string)=>{
        setSelectedItemId(itemId);
        setDialog(true);
    }
    const handleReject =async ()=>{
       if(selectedItemId){
          await rejectMutation.mutateAsync(selectedItemId)
       }
    }

    return (
        <TabsContent value="item-issue" className="mt-4">
            <h2 className="text-lg font-bold   mb-2">Current Item Issues</h2>
            <p className="text-sm text-muted-foreground mb-4">
                Monitor and manage all reported issues related to inventory items, from hardware malfunctions to missing components.
            </p>
            <div className="flex justify-start mb-4">
                <Button className="gap-2 shadow-md">
                    <PlusCircle className="h-4 w-4" />
                    <div className="flex flex-col items-start leading-tight">
                        <span className="text-xs font-bold">Add New Item Issue</span>
                        <span className="text-[10px] opacity-80 font-normal">
                  Report a new problem
                </span>
                    </div>
                </Button>
            </div>
            <InventoryIssueTable
                issues={issues}
                issueItems={issueItems}
                onSelectIssue={issueId => setSelectedIssueId(issueId)}
                loading={isIssuesLoading}
                itemsLoading={itemsLoading}
                onItemRejected={handleAlertDialog}
                onItemSelect={handleSelectIssue}
            />

            <FormDrawer
                open={open}
                onOpenChange={setOpen}
                title="Review Inventory Issue"
                description="Approve or reject this inventory issue."
            >
                {selectedItemIssue && (
                    <InventoryIssueApprovalForm
                        funeralId={selectedItemIssue.issueId}
                        issueId={selectedItemIssue.issueId}
                        defaultQuantity={selectedItemIssue.quantity}
                        loading={itemsLoading}
                        onCancel={() => setOpen(false)}
                        onApprove={async (values) => {
                            await approveMutation.mutateAsync({
                                issueId: selectedIssueId || values.issueId,
                                from: selectedItemIssue.fromId,
                                item: selectedItemIssue.itemId,
                                quantity: values.quantity,
                            });

                            setOpen(false);
                        }}
                    />
                )}
            </FormDrawer>

            <AlertDialogDestructive
            open={dialog}
            setOpen={setDialog}
            title={"Reject Item Issue"}
            description={"Are you sure you want to reject this item issue?"}
            onConfirm={handleReject}
            />
        </TabsContent>
    )
}

export default InventoryIssueTabContent;

interface AlertProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    title: string;
    description: string;
    onConfirm: () => void;
}

export function AlertDialogDestructive({open, setOpen, title, description, onConfirm}: AlertProps) {
    return (
        <AlertDialog open={open} defaultOpen={false}>
            <AlertDialogTrigger type="button"/>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogMedia
                        className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
                        <Trash2Icon/>
                    </AlertDialogMedia>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>
                        {description}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel variant="outline" onClick={() => setOpen(false)}>Cancel</AlertDialogCancel>
                    <AlertDialogAction variant="destructive" onClick={onConfirm}>Reject</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
