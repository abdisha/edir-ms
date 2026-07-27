import {AlertTriangle, CheckCircle2, Edit, Eye, MoreHorizontal, Table, Trash2} from "lucide-react";
import {TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/shared/components/ui/table.tsx";
import {Checkbox} from "@/shared/components/ui/checkbox.tsx";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/shared/components/ui/dropdown-menu.tsx";
import type {InventoryItem} from "@/features/inventory/types.ts";
import {Button} from "@/shared/components/ui/button.tsx";
import {Badge} from "@/shared/components/ui/badge.tsx";

interface InventoryItemTableProp{
    selectedInventoryIds:string[],
    inventoryItems:InventoryItem[],
    filteredInventoryData:InventoryItem[],
    toggleAllInventory:()=>void,
    toggleSelectInventory:(id:string)=>void,
}


const  InventoryItemTable=({selectedInventoryIds,inventoryItems,filteredInventoryData,toggleAllInventory,toggleSelectInventory}:InventoryItemTableProp)=>{

    return( <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-12 text-center">
                        <Checkbox
                            checked={selectedInventoryIds.length === inventoryItems.length && inventoryItems.length > 0}
                            onCheckedChange={toggleAllInventory}
                            aria-label="Select all items"
                        />
                    </TableHead>
                    <TableHead className="font-semibold">Item Name & SKU</TableHead>
                    <TableHead className="font-semibold">Category</TableHead>
                    <TableHead className="font-semibold">Quantity</TableHead>
                    <TableHead className="font-semibold">Status</TableHead>
                    <TableHead className="font-semibold">Location</TableHead>
                    <TableHead className="text-right font-semibold">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {filteredInventoryData.length === 0 ? (
                    <TableRow>
                        <TableCell colSpan={7} className="h-32 text-center text-muted-foreground">
                            No inventory items found matching your filters.
                        </TableCell>
                    </TableRow>
                ) : (
                    filteredInventoryData.map((item) => {
                        const isSelected = selectedInventoryIds.includes(item.id);
                        return (
                            <TableRow
                                key={item.id}
                                className={`hover:bg-muted/50 transition-colors ${isSelected ? "bg-muted/40" : ""}`}
                            >
                                <TableCell className="text-center">
                                    <Checkbox
                                        checked={isSelected}
                                        onCheckedChange={() => toggleSelectInventory(item.id)}
                                        aria-label={`Select ${item.itemName}`}
                                    />
                                </TableCell>
                                <TableCell>
                                    <div className="flex flex-col">
                                        <span className="font-medium text-foreground">{item.itemName}</span>
                                        <span className="text-xs text-muted-foreground">SKU: {item.itemCode}</span>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <span className="font-semibold text-foreground">{item.quantity}</span>
                                </TableCell>
                                <TableCell>
                                    <InventoryStatusBadge status={item.itemStatus} />
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
                                                View
                                            </DropdownMenuItem>
                                            <DropdownMenuItem className="cursor-pointer">
                                                <Edit className="mr-2 h-4 w-4 text-muted-foreground" />
                                                Edit
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem className="cursor-pointer text-destructive focus:text-destructive">
                                                <Trash2 className="mr-2 h-4 w-4" />
                                                Delete
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        );
                    })
                )}
            </TableBody>
        </Table>
    </div>)
}

export default InventoryItemTable;


function InventoryStatusBadge({ status }: { status: InventoryItem["itemStatus"] }) {
    switch (status) {
        case "Active":
            return (
                <Badge variant="default" className="bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20 border-emerald-500/20 gap-0.5 font-medium shadow-none px-1 py-0 text-[9px] uppercase tracking-wider">
                    <CheckCircle2 className="h-2.5 w-2.5" />
                    In Stock
                </Badge>
            );

        case "InActive":
            return (
                <Badge variant="destructive" className="bg-rose-500/10 text-rose-600 hover:bg-rose-500/20 border-rose-500/20 gap-0.5 font-medium shadow-none px-1 py-0 text-[9px] uppercase tracking-wider">
                    <AlertTriangle className="h-2.5 w-2.5" />
                    Damaged
                </Badge>
            );
    }
}