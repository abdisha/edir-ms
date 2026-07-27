import {ArrowDownLeft, Flag, Package, User,} from "lucide-react";
import {Tabs, TabsList, TabsTrigger} from "@/shared/components/ui/tabs";
import InventoryStatBanner from "@/features/inventory/components/InventoryStatBanner.tsx";
import InventoryTabContent from "@/features/inventory/components/InventoryTabContent.tsx";
import InventoryIssueTabContent from "@/features/inventory/components/InventoryIssueTabContent.tsx";
import InventoryReturnTabContent from "@/features/inventory/components/InventoryReturnTabContent.tsx";


export function InventoryPage() {
    return (
        <div className="flex flex-col gap-4  md:p-8 max-w-7xl mx-auto w-full">

            <InventoryStatBanner totalItems={21} damagedCount={21} issuedCount={0}/>

            <Tabs defaultValue="inventory" className="w-full">
                <TabsList className="grid w-full grid-cols-4"
                          variant="line">
                    <TabsTrigger value="inventory" className="flex items-center gap-2">
                        <Package className="h-4 w-4"/>
                        Inventory
                    </TabsTrigger>
                    <TabsTrigger value="item-issue" className="flex items-center gap-2">
                        <Flag className="h-4 w-4"/>
                        Item Issues
                    </TabsTrigger>
                    <TabsTrigger value="returned-item" className="flex items-center gap-2">
                        <ArrowDownLeft className="h-4 w-4"/>
                        Returned Items
                    </TabsTrigger>
                    <TabsTrigger value="item-allocation" className="flex items-center gap-2">
                        <User className="h-4 w-4"/>
                        Item Allocation
                    </TabsTrigger>
                </TabsList>

                {/* Inventory Tab Content */}
                <InventoryTabContent/>
                {/* Issue Tab Content */}
                <InventoryIssueTabContent/>
                {/* Returned Item Tab Content */}
                <InventoryReturnTabContent/>

            </Tabs>
        </div>
    );
}

export default InventoryPage;



