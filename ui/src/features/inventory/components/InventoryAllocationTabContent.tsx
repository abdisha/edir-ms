import { Button } from "@/shared/components/ui/button";
import { TabsContent } from "@/shared/components/ui/tabs";
import {Shuffle, User} from "lucide-react";
import InventoryAllocationTable from "@/features/inventory/components/InventoryAllocationTable.tsx";

const InventoryAllocationTabContent = ()=>{
    // New: Toggle allocation group visibility
    const toggleAllocationGroup = (memberId: string) => {
        // setOpenAllocations(prev =>
        //   prev.includes(memberId) ? prev.filter(id => id !== memberId) : [...prev, memberId]
        // );
    };

    return (
        <TabsContent value="item-allocation" className="mt-6">
            <h2 className="text-lg font-boldmb-2">Member Item Allocations</h2>
            <p className="text-sm text-muted-foreground mb-4">
                Manage the allocation of inventory items to specific team members or departments.
            </p>
            <div className="flex justify-start gap-3 mb-4">
                <Button className="gap-2 shadow-md">
                    <User className="h-4 w-4"/>
                    <div className="flex flex-col items-start leading-tight">
                        <span className="text-xs font-bold">Allocate Item</span>
                        <span className="text-[10px] opacity-80 font-normal">Assign item to member</span>
                    </div>
                </Button>
                <Button variant="outline" className="gap-2 shadow-md">
                    <Shuffle className="h-4 w-4"/>
                    <div className="flex flex-col items-start leading-tight">
                        <span className="text-xs font-bold">Transfer Item</span>
                        <span className="text-[10px] opacity-80 font-normal">Reassign allocated item</span>
                    </div>
                </Button>
            </div>
            <InventoryAllocationTable
                allocations={[]}
                openAllocations={[]}
                toggleAllocationGroup={toggleAllocationGroup}
            />
        </TabsContent>
    )
}

export default InventoryAllocationTabContent;