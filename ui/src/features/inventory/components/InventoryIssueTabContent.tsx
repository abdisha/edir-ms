import {Button} from "@/shared/components/ui/button.tsx";
import {PlusCircle} from "lucide-react";
import {TabsContent} from "@/shared/components/ui/tabs.tsx";
import InventoryIssueTable from "@/features/inventory/components/tables/InventoryIssueTable.tsx";

const InventoryIssueTabContent =()=>{
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
            <InventoryIssueTable/>
        </TabsContent>
    )
}

export default InventoryIssueTabContent;