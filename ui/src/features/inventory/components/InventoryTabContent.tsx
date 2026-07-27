import {TabsContent} from "@/shared/components/ui/tabs.tsx";
import {Button} from "@/shared/components/ui/button.tsx";
import {PlusCircle} from "lucide-react";
import {FormDrawer} from "@/shared/components/FromDrawer.tsx";
import {useCreateInventory} from "@/features/inventory/hooks/useCreateInventory.ts";
import {useFormDrawer} from "@/shared/components/useFormDrawer.ts";
import InventoryItemTable from "@/features/inventory/components/InventoryItemTable.tsx";
import {InventoryItemForm} from "@/features/inventory/components/InventoryItemFrom.tsx";
import {useGetInventory} from "@/features/inventory/hooks/useGetInventory.ts";

const InventoryTabContent = () => {

    const {data, isLoading} = useGetInventory();

    const createMutation = useCreateInventory({
        onSuccess: () => {
            setOpen(false);
        }
    });
    const {open, setOpen} = useFormDrawer();
    const selectedInventoryIds: string[] = [];


    return (
        <TabsContent value="inventory" className="mt-4">
            <FormDrawer
                open={open}
                onOpenChange={setOpen}
                size={"xl"}
                title="Inventory Item"
                description="Register a new inventory item."
                loading={createMutation.isPending}
            >
                <InventoryItemForm
                    onSubmit={createMutation.mutate}
                    loading={createMutation.isPending}
                    onCancel={() => setOpen(false)}
                />
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
                <div className="flex items-center gap-3">

                    {selectedInventoryIds.length > 0 && (
                        <div
                            className="flex items-center gap-2 w-full sm:w-auto justify-end bg-muted/50 p-1.5 rounded-lg border">
                  <span className="text-xs font-medium px-2 text-muted-foreground">
                    {selectedInventoryIds.length} selected
                  </span>
                            <Button size="sm" variant="destructive" className="h-7 text-xs">
                                Bulk Delete
                            </Button>
                        </div>
                    )}
                </div>
            </div>
            <InventoryItemTable
                loading={isLoading}
                filteredInventoryData={data}
            />

        </TabsContent>
    )
}

export default InventoryTabContent