import {Badge} from "@/shared/components/ui/badge";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/shared/components/ui/tabs";
import InventoryAllocationTable from "@/features/inventory/components/tables/InventoryAllocationTable.tsx";
import InventoryUnAllocatedItemTable from "@/features/inventory/components/tables/InventoryUnAllocatedItemTable.tsx";
import {useGetUnAllocatedItems} from "@/features/inventory/hooks/useGetUnAllocatedItems.ts";
import {FormDrawer} from "@/shared/components/FromDrawer.tsx";
import {useFormDrawer} from "@/shared/components/useFormDrawer.ts";
import InventoryAllocationForm from "@/features/inventory/components/forms/InventoryAllocationForm.tsx";
import {useState} from "react";
import type {InventoryItem} from "@/features/inventory/types.ts";
import {useAllocate} from "@/features/inventory/hooks/useAllocate.ts";
import {useGetAllocation, useGetAllocationSummary} from "@/features/inventory/hooks/useGetAllocation.ts";
import {Loader2} from "lucide-react";

const InventoryAllocationTabContent = () => {
    const {data: unAllocatedItems, isLoading: isUnAllocationLoading} = useGetUnAllocatedItems();
    const [storeId, setStoreId] = useState<string>()
    const {data:allocatedItems,isLoading:allocationLoading} = useGetAllocation(storeId || "")
    const allocateMutation = useAllocate({
        onSuccess:()=>setOpen(false)
    });
    const {data:storeSummary,isLoading:isSummaryLoading} =useGetAllocationSummary();

    const [item, setItem] = useState<InventoryItem>();
    const {open, setOpen} = useFormDrawer();

    const toggleStore=(storeId:string)=>{
        setStoreId(storeId)
    }


    return (
        <TabsContent value="item-allocation" className="mt-6">
            <h2 className="text-lg font-boldmb-2">Member Item Allocations</h2>
            <p className="text-sm text-muted-foreground mb-4">
                Manage the allocation of inventory items to specific team members or departments.
            </p>
            <Tabs defaultValue="allocated" className="w-full">
                <TabsList className="grid w-full max-w-[400px] grid-cols-2 mb-4">
                    <TabsTrigger value="allocated">Allocated Items</TabsTrigger>
                    <TabsTrigger value="unallocated" className="gap-2">
                        {unAllocatedItems && unAllocatedItems.length > 0 && (
                            <Badge variant="destructive"
                                   className="h-5 px-1.5  min-w-[20px] rounded-full flex items-center justify-center">
                                {unAllocatedItems.length}
                            </Badge>
                        )}
                        Unallocated Items

                    </TabsTrigger>
                </TabsList>
                <TabsContent value="allocated" className="border-none p-0">

                    {isSummaryLoading?(
                        <div className="flex items-center justify-center gap-2 text-muted-foreground">
                            <Loader2 className="h-5 w-5 animate-spin" />
                            <span>Loading allocations...</span>
                        </div>
                        ):
                            (
                        <InventoryAllocationTable
                            loading={allocationLoading}
                            allocations={allocatedItems}
                            stores={storeSummary}
                            toggleAllocationGroup={toggleStore}
                        />
                    )}

                </TabsContent>
                <TabsContent value="unallocated" className="border-none p-0">
                    <FormDrawer open={open} onOpenChange={setOpen} title={"Allocate Item"}>

                        {item && <InventoryAllocationForm itemId={item.itemCode}
                                                          itemName={item.itemName}
                                                          stores={storeSummary}
                                                          defaultValues={{
                                                              quantity: item.quantity
                                                          }}
                                                          loading={allocateMutation.isPending}
                                                          onCancel={()=>setOpen(false)}
                                                          onSubmit={(values) => {
                                                              console.log(values)
                                                              allocateMutation.mutate({
                                                                  item: item.itemId,
                                                                  quantity: values.quantity,
                                                                  storeId: values.storeId
                                                              })
                                                          }}/>}
                    </FormDrawer>

                    <InventoryUnAllocatedItemTable data={unAllocatedItems}
                                                   onAllocate={item => {
                                                       setOpen(true)
                                                       setItem(item)
                                                   }}
                                                   isLoading={isUnAllocationLoading}/>

                </TabsContent>
            </Tabs>
        </TabsContent>
    )
}

export default InventoryAllocationTabContent;