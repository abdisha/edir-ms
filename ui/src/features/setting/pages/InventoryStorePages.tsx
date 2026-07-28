import {useNavigate} from "react-router";
import {ArrowLeft, Plus, Warehouse} from "lucide-react";

import {Button} from "@/shared/components/ui/button";
import {Card, CardContent, CardDescription, CardHeader, CardTitle,} from "@/shared/components/ui/card";

import StoreTable from "../components/StoreTable";
import type {Store} from "@/features/setting/types.ts";
import {useFormDrawer} from "@/shared/components/useFormDrawer.ts";
import {FormDrawer} from "@/shared/components/FromDrawer.tsx";
import StoreForm from "../components/StoreForm";

const InventoryStorePages = () => {
    const navigate = useNavigate();
    const {open,setOpen} = useFormDrawer()
    const stores:Store[] = [];

    const handleEditStore = (store: any) => {
        console.log("Edit store:", store);
    };

    return (
        <div className="space-y-6 p-6">
            {/* Back Button */}
            <Button
                variant="ghost"
                className="w-fit"
                onClick={() => navigate(-1)}
            >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
            </Button>

            {/* Header */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                        <Warehouse className="h-6 w-6 text-primary" />
                    </div>

                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">
                            Inventory Stores
                        </h1>
                        <p className="text-muted-foreground">
                            Manage all inventory storage locations and warehouses.
                        </p>
                    </div>
                </div>

                <Button onClick={()=>setOpen(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Store
                </Button>
            </div>

            {/* Table */}
            <Card>
                <CardHeader>
                    <CardTitle>Stores</CardTitle>
                    <CardDescription>
                        View and manage your inventory stores.
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    {stores.length > 0 ? (
                        <StoreTable data={stores} onEdit={handleEditStore} />
                    ) : (
                        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed py-16">
                            <Warehouse className="mb-4 h-12 w-12 text-muted-foreground" />

                            <h3 className="text-lg font-semibold">No stores found</h3>

                            <p className="mt-2 max-w-sm text-center text-sm text-muted-foreground">
                                You haven't created any inventory stores yet. Create your first
                                store to organize inventory by location.
                            </p>

                            <Button className="mt-6" onClick={() => setOpen(true)}>
                                <Plus className="mr-2 h-4 w-4" />
                                Create Store
                            </Button>
                        </div>
                    )}
                </CardContent>
            </Card>
            <FormDrawer open={open} onOpenChange={setOpen} title={'Add Store or edit store'}>
                <StoreForm
                members={[]}
                onSubmit={()=>{}}
                />

            </FormDrawer>
        </div>
    );
};

export default InventoryStorePages;