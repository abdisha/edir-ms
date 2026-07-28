import {TabsContent} from "@/shared/components/ui/tabs.tsx";
import {Button} from "@/shared/components/ui/button.tsx";
import {PlusCircle} from "lucide-react";
import {FormDrawer} from "@/shared/components/FromDrawer.tsx";
import {useCreateInventory} from "@/features/inventory/hooks/useCreateInventory.ts";
import {useFormDrawer} from "@/shared/components/useFormDrawer.ts";
import InventoryItemTable from "@/features/inventory/components/tables/InventoryItemTable.tsx";
import {InventoryItemForm} from "@/features/inventory/components/forms/InventoryItemFrom.tsx";
import {useGetInventory} from "@/features/inventory/hooks/useGetInventory.ts";
import {useGetItemById} from "@/features/inventory/hooks/useGetItemById.tsx";
import {useState} from "react";
import {useUpdateItem} from "@/features/inventory/hooks/useUpdateItem.ts";
import {SpinnerCard} from "@/shared/components/SpinnerCard.tsx";

const InventoryTabContent = () => {

    const {data: inventoryData, isLoading: isInventoryLoading} = useGetInventory();
    const [id, setId] = useState<string>();
    const {data: itemData, isLoading: isItemLoading} = useGetItemById(id);
    const {open, setOpen} = useFormDrawer();

    const updateMutation = useUpdateItem({
        onSuccess: () => {
            setOpen(false);
        }
    })

    const createMutation = useCreateInventory({
        onSuccess: () => {
            setOpen(false);
        }
    });

    const handleSubmit = (values: { itemName: any; initialQuantity: any; itemCode: any; }) => {
        if (id !== undefined) {
            updateMutation.mutate({itemId: id, itemName: values.itemName, quantityAtHand: values.initialQuantity})
        } else {
            createMutation.mutate({
                itemCode: values.itemCode,
                itemName: values.itemName,
                initialQuantity: values.initialQuantity
            })
        }
    }

    const onEdit = (id: string) => {
        setId(id);
        setOpen(true);
    }


    return (
        <TabsContent value="inventory" className="mt-4">
            <FormDrawer
                open={open}
                onOpenChange={setOpen}
                size={"xl"}
                title="Inventory Item"
                description="Register a new inventory item."
                loading={createMutation.isPending || isItemLoading}
            >
                {
                    isItemLoading &&
                    <SpinnerCard/>

                }
                {(itemData || !isItemLoading) &&
                <InventoryItemForm
                    onSubmit={handleSubmit}
                    loading={createMutation.isPending || isItemLoading}
                    defaultValues={
                        {
                            itemName: itemData?.itemName,
                            initialQuantity: itemData?.quantity,
                            itemCode: itemData?.itemCode
                        }
                    }
                    onCancel={() => {
                        setOpen(false)
                        setId(undefined)
                    }}
                />
                }
            </FormDrawer>

            <h2 className="text-lg font-bold  mb-2">Inventory Overview</h2>
            <p className="text-sm text-muted-foreground mb-4">
                View and manage all physical assets and stock levels within your Edir.
            </p>
            <div className="flex flex-col sm:flex-row items-start gap-3 mb-4">
                <Button className="gap-2 shadow-md" onClick={() => setOpen(true)}>
                    <PlusCircle className="h-4 w-4 "/>
                    <div className="flex flex-col items-start leading-tight">
                        <span className="text-xs font-bold">Add New Item</span>
                        <span className="text-[10px] opacity-80 font-normal">Register asset to stock</span>
                    </div>
                </Button>
                <div className="relative w-full sm:w-80">

                    {/*<Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />*/}
                    {/*<Input*/}
                    {/*    placeholder="Search by name, SKU, or category..."*/}
                    {/*    value={searchQuery}*/}
                    {/*    onChange={(e) => setSearchQuery(e.target.value)}*/}
                    {/*    className="pl-9 bg-card"*/}
                    {/*/>*/}
                </div>
            </div>
            <InventoryItemTable
                onEdit={onEdit}
                loading={isInventoryLoading}
                inventoryData={inventoryData}
            />

        </TabsContent>
    )
}

export default InventoryTabContent