import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/shared/components/ui/table.tsx";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/shared/components/ui/dropdown-menu.tsx";
import {Button} from "@/shared/components/ui/button.tsx";
import {
    Calendar,
    ChevronDown,
    ChevronUp,
    Eye,
    Loader2,
    MoreHorizontal,
    Package,
    Shuffle,
    Trash2,
    User
} from "lucide-react";
import type {Allocation, StoreAllocationSummary} from "@/features/inventory/types.ts";

interface InventoryAllocationTableProp{
   stores:StoreAllocationSummary[];
   allocations:Allocation[];
   toggleAllocationGroup:(value:string)=>void;
   loading:boolean;
}


const InventoryAllocationTable = ({ loading, stores, allocations, toggleAllocationGroup }: InventoryAllocationTableProp) => {

    return (
        <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="font-semibold w-1/4">Store / Member</TableHead>
                        <TableHead className="font-semibold w-1/4">Location</TableHead>
                        <TableHead className="font-semibold w-1/2 text-center">Allocated Items Summary</TableHead>
                        <TableHead className="text-right font-semibold">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {loading ? (
                        <TableRow>
                            <TableCell colSpan={4} className="h-32 text-center">
                                <div className="flex items-center justify-center gap-2 text-muted-foreground">
                                    <Loader2 className="h-5 w-5 animate-spin" />
                                    <span>Loading allocations...</span>
                                </div>
                            </TableCell>
                        </TableRow>
                    ) :  stores.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={4} className="h-32 text-center text-muted-foreground">
                                No item allocations found.
                            </TableCell>
                        </TableRow>
                    ) : (
                        stores.map((store) => (
                            <>
                                <TableRow
                                    key={store.storeId}
                                    className="cursor-pointer hover:bg-muted/50 transition-colors"
                                    onClick={() => toggleAllocationGroup(store.storeId||"")}
                                >
                                    <TableCell className="font-medium">
                                        <div className="flex items-center gap-2">
                                            { allocations && allocations.some(a => a.storeId == store.storeId) ? (
                                                <ChevronUp className="h-4 w-4 text-primary" />
                                            ) : (
                                                <ChevronDown className="h-4 w-4 text-muted-foreground" />
                                            )}
                                            <User className="h-4 w-4 text-muted-foreground" />
                                            {store.storeName}
                                        </div>
                                    </TableCell>
                                    <TableCell>{store.location}</TableCell>
                                    <TableCell className="text-center">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                                            { store.totalItem} items
                                        </span>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger>
                                                <Button size="icon" variant="ghost" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                    <span className="sr-only">Actions</span>
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="w-40">
                                                <DropdownMenuItem className="cursor-pointer">
                                                    <Eye className="mr-2 h-4 w-4 text-muted-foreground" />
                                                    View Allocations
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="cursor-pointer">
                                                    <Shuffle className="mr-2 h-4 w-4 text-muted-foreground" />
                                                    Transfer All
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem className="cursor-pointer text-destructive focus:text-destructive">
                                                    <Trash2 className="mr-2 h-4 w-4" />
                                                    Deallocate All
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                                {allocations && allocations.some(a=>a.storeId==store.storeId) && allocations.length > 0 && (
                                    <TableRow className="bg-muted/20">
                                        <TableCell colSpan={4} className="p-0">
                                            <div className="overflow-hidden">
                                                <Table className="w-full">
                                                    <TableBody>
                                                        {allocations && allocations.filter(a=>a.storeId==store.storeId).map((item) => (
                                                            <TableRow key={item.allocationId} className="hover:bg-muted/40 border-none">
                                                                <TableCell className="pl-12 py-2 w-1/4">
                                                                    <div className="flex items-center gap-2 text-sm">
                                                                        <Package className="h-3.5 w-3.5 text-muted-foreground" />
                                                                        <span className="font-medium">{item.itemName}</span>
                                                                    </div>
                                                                </TableCell>
                                                                <TableCell className="py-2 text-xs text-muted-foreground w-1/4">
                                                                    Code: {item.itemCode}
                                                                </TableCell>
                                                                <TableCell className="py-2 text-sm text-muted-foreground w-1/2">
                                                                    <div className="flex items-center justify-center gap-4">
                                                                        <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {item.receivedDate}</span>
                                                                        <span className="font-semibold text-foreground">Qty: {item.issuedQuantity}</span>
                                                                    </div>
                                                                </TableCell>
                                                                <TableCell className="text-right py-2">
                                                                    <DropdownMenu>
                                                                        <DropdownMenuTrigger>
                                                                            <Button size="icon" variant="ghost" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                                                                                <MoreHorizontal className="h-4 w-4" />
                                                                                <span className="sr-only">Actions</span>
                                                                            </Button>
                                                                        </DropdownMenuTrigger>
                                                                        <DropdownMenuContent align="end" className="w-40">
                                                                            <DropdownMenuItem className="cursor-pointer">
                                                                                <Eye className="mr-2 h-4 w-4 text-muted-foreground" />
                                                                                View Item
                                                                            </DropdownMenuItem>
                                                                            <DropdownMenuItem className="cursor-pointer">
                                                                                <Shuffle className="mr-2 h-4 w-4 text-muted-foreground" />
                                                                                Transfer Item
                                                                            </DropdownMenuItem>
                                                                            <DropdownMenuSeparator />
                                                                            <DropdownMenuItem className="cursor-pointer text-destructive focus:text-destructive">
                                                                                <Trash2 className="mr-2 h-4 w-4" />
                                                                                Deallocate Item
                                                                            </DropdownMenuItem>
                                                                        </DropdownMenuContent>
                                                                    </DropdownMenu>
                                                                </TableCell>
                                                            </TableRow>
                                                        ))}
                                                    </TableBody>
                                                </Table>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    )
}

export default InventoryAllocationTable;