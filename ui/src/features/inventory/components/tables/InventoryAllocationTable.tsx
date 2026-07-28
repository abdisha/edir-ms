import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/shared/components/ui/table.tsx";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/shared/components/ui/dropdown-menu.tsx";
import {Button} from "@/shared/components/ui/button.tsx";
import {ChevronDown, ChevronUp, Eye, MoreHorizontal, Shuffle, Trash2} from "lucide-react";

interface InventoryAllocationTableProp{
   allocations:any[];
   openAllocations:any[];
   toggleAllocationGroup:(value:string)=>void;
}

const InventoryAllocationTable =({allocations,openAllocations,toggleAllocationGroup}:InventoryAllocationTableProp)=>{

    return (
        <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="font-semibold w-1/4">Member Name</TableHead>
                        <TableHead className="font-semibold w-1/4">Department</TableHead>
                        <TableHead className="font-semibold w-1/2">Allocated Items Summary</TableHead>
                        <TableHead className="text-right font-semibold">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {allocations.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={4} className="h-32 text-center text-muted-foreground">
                                No item allocations found.
                            </TableCell>
                        </TableRow>
                    ) : (
                        allocations.map((allocation) => (
                            <>
                                <TableRow
                                    key={allocation.memberId}
                                    className="cursor-pointer hover:bg-muted/50 transition-colors"
                                    onClick={() => toggleAllocationGroup(allocation.memberId)}
                                >
                                    <TableCell className="font-medium flex items-center gap-2">
                                        {openAllocations.includes(allocation.memberId) ? (
                                            <ChevronUp className="h-4 w-4 text-muted-foreground" />
                                        ) : (
                                            <ChevronDown className="h-4 w-4 text-muted-foreground" />
                                        )}
                                        {allocation.memberName}
                                    </TableCell>
                                    <TableCell>{allocation.department}</TableCell>
                                    <TableCell className="text-muted-foreground text-sm">
                                        {allocation.items.length} items allocated
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
                                {openAllocations.includes(allocation.memberId) && allocation.items.length > 0 && (
                                    <TableRow className="bg-muted/20">
                                        <TableCell colSpan={4} className="p-0">
                                            <div className="overflow-hidden">
                                                <Table className="w-full">
                                                    <TableBody>
                                                        {allocation.items.map((item) => (
                                                            <TableRow key={item.id} className="hover:bg-muted/40">
                                                                <TableCell className="pl-12 py-2 text-muted-foreground w-1/4"></TableCell> {/* Empty cell for alignment */}
                                                                <TableCell className="py-2 font-medium w-1/4">{item.itemName}</TableCell>
                                                                <TableCell className="py-2 text-sm text-muted-foreground w-1/2">
                                                                    SKU: {item.sku} | Allocated: {item.allocatedDate}
                                                                    {item.returnDueDate && ` | Due: ${item.returnDueDate}`}
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