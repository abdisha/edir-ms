import {Button} from "@/shared/components/ui/button.tsx";
import {PlusCircle} from "lucide-react";
import {TabsContent} from "@/shared/components/ui/tabs.tsx";
import InventoryReturnTable from "@/features/inventory/components/tables/InventoryReturnTable.tsx";

const InventoryReturnTabContent =()=>{
    return (
        <TabsContent value="returned-item" className="mt-6">
            <h2 className="text-lg font-bold  mb-2">Returned Items Log</h2>
            <p className="text-sm text-muted-foreground mb-4">
                Keep track of all items that have been returned to inventory, noting their condition and return date.
            </p>
            <div className="flex justify-start mb-4">
                <Button className="gap-2 shadow-md">
                    <PlusCircle className="h-4 w-4" />
                    <div className="flex flex-col items-start leading-tight">
                        <span className="text-xs font-bold">Add Returned Item</span>
                        <span className="text-[10px] opacity-80 font-normal">
                  Record a returned item
                </span>
                    </div>
                </Button>
            </div>
            <InventoryReturnTable
                returnedItems={[]}
            />
        </TabsContent>
    )
}

export default InventoryReturnTabContent;