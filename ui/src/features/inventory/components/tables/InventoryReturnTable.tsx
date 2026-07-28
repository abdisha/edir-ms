import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/shared/components/ui/table.tsx";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/shared/components/ui/dropdown-menu.tsx";
import {Button} from "@/shared/components/ui/button.tsx";
import {AlertTriangle, ArrowDownLeft, CheckCircle2, Edit, Eye, MoreHorizontal, Trash2} from "lucide-react";
import {Badge} from "@/shared/components/ui/badge.tsx";
import type {ReturnedItem} from "@/features/inventory/types.ts";

interface InventoryReturnTableProp{
 returnedItems:ReturnedItem[];
}

const InventoryReturnTable =({returnedItems}:InventoryReturnTableProp)=>{

    return (
        <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="font-semibold">Return ID</TableHead>
                        <TableHead className="font-semibold">Item</TableHead>
                        <TableHead className="font-semibold">Returned By</TableHead>
                        <TableHead className="font-semibold">Return Date</TableHead>
                        <TableHead className="font-semibold">Condition</TableHead>
                        <TableHead className="text-right font-semibold">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {returnedItems.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={6} className="h-32 text-center text-muted-foreground">
                                No returned items found.
                            </TableCell>
                        </TableRow>
                    ) : (
                        returnedItems.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell className="font-medium">{item.id}</TableCell>
                                <TableCell>{item.item}</TableCell>
                                <TableCell>{item.returnedBy}</TableCell>
                                <TableCell>{item.returnDate}</TableCell>
                                <TableCell>
                                    <ReturnedItemConditionBadge condition={item.condition} />
                                </TableCell>
                                <TableCell className="text-right">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger>
                                            <Button
                                                size="icon"
                                                variant="ghost"
                                                className="h-8 w-8 text-muted-foreground hover:text-foreground"
                                            >
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
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    )
}

export default InventoryReturnTable;

function ReturnedItemConditionBadge({ condition }: { condition: ReturnedItem["condition"] }) {
    switch (condition) {
        case "GOOD":
            return (
                <Badge variant="default" className="bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20 border-emerald-500/20 gap-0.5 font-medium shadow-none px-1 py-0 text-[9px] uppercase tracking-wider">
                    <CheckCircle2 className="h-2.5 w-2.5" />
                    Good
                </Badge>
            );
        case "DAMAGED":
            return (
                <Badge variant="destructive" className="bg-rose-500/10 text-rose-600 hover:bg-rose-500/20 border-rose-500/20 gap-0.5 font-medium shadow-none px-1 py-0 text-[9px] uppercase tracking-wider">
                    <AlertTriangle className="h-2.5 w-2.5" />
                    Damaged
                </Badge>
            );
        case "MISSING_PARTS":
            return (
                <Badge variant="secondary" className="bg-amber-500/10 text-amber-600 hover:bg-amber-500/20 border-amber-500/20 gap-0.5 font-medium shadow-none px-1 py-0 text-[9px] uppercase tracking-wider">
                    <ArrowDownLeft className="h-2.5 w-2.5" />
                    Missing Parts
                </Badge>
            );
    }
}