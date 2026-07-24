import React, {useState} from "react";
import {Checkbox} from "@/shared/components/ui/checkbox";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/shared/components/ui/table";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/shared/components/ui/pagination";
import {Card, CardContent} from "@/shared/components/ui/card";
import {Button} from "@/shared/components/ui/button";

import {Badge,} from "@/shared/components/ui/badge";

import {
    ArrowDownLeft,
    ArrowUpRight,
    Eye,
    MoreHorizontal,
    Package,
    PackageCheck,
    Pencil,
    Plus,
    Trash2,
} from "lucide-react";

interface InventoryItem {
    id: string;
    name: string;
    description?: string;
    category: string;
    quantity: number;
    allocated?: number;
    dateAdded: string;
}

interface InventoryItemTableProps {
    items: InventoryItem[];
}

const InventoryItemTable = ({ items }: InventoryItemTableProps) => {
    const [selectedItems, setSelectedItems] = useState<string[]>([]);

    const toggleItem = (id: string) => {
        setSelectedItems(prev =>
            prev.includes(id)
                ? prev.filter(item => item !== id)
                : [...prev, id]
        );
    };

    const toggleAll = () => {
        if (selectedItems.length === items.length) {
            setSelectedItems([]);
        } else {
            setSelectedItems(items.map(item => item.id));
        }
    };

    return (
        <div className="space-y-4">
            {selectedItems.length > 0 && (
                <Card className="border-primary bg-primary/5">
                    <CardContent className="flex flex-col gap-4 p-4 md:flex-row md:items-center md:justify-between">
                        <div>
                            <p className="font-medium">{selectedItems.length} items selected</p>
                            <p className="text-sm text-muted-foreground">
                                Choose an action to perform on selected inventory.
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <Button variant="outline">
                                <PackageCheck className="mr-2 h-4 w-4" />
                                Allocate
                            </Button>
                            <Button variant="outline">
                                <ArrowUpRight className="mr-2 h-4 w-4" />
                                Issue
                            </Button>
                            <Button variant="outline">
                                <ArrowDownLeft className="mr-2 h-4 w-4" />
                                Receive
                            </Button>
                            <Button variant="destructive">
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            )}
        <Card>
            <CardContent className="p-0">
                <div className="flex items-center justify-between border-b px-6 py-4">
                    <div>
                        <h2 className="font-semibold">Inventory List</h2>
                        <p className="text-sm text-muted-foreground">
                            Select one or more inventory items to perform bulk actions.
                        </p>
                    </div>
                    <Badge variant="secondary">{items.length} Items</Badge>
                </div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-12">
                                <Checkbox
                                    checked={selectedItems.length === items.length && items.length > 0}
                                    onCheckedChange={toggleAll}
                                />
                            </TableHead>
                            <TableHead>Item</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Quantity</TableHead>
                            <TableHead>Available</TableHead>
                            <TableHead>Allocated</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Added</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {items.length ? (
                            items.map(item => {
                                const allocated = item.allocated ?? 0;
                                const available = item.quantity - allocated;
                                const status =
                                    available === 0
                                        ? "Allocated"
                                        : available <= 5
                                            ? "Low Stock"
                                            : "Available";
                                return (
                                    <TableRow key={item.id}>
                                        <TableCell>
                                            <Checkbox
                                                checked={selectedItems.includes(item.id)}
                                                onCheckedChange={() => toggleItem(item.id)}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <div>
                                                <div className="font-medium">{item.name}</div>
                                                <div className="text-xs text-muted-foreground">
                                                    {item.description || "No description"}
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge
                                                variant={
                                                    item.category === "funeral"
                                                        ? "default"
                                                        : "secondary"
                                                }
                                            >
                                                {item.category}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>{item.quantity}</TableCell>
                                        <TableCell>
                                            <span className="font-medium text-green-600">{available}</span>
                                        </TableCell>
                                        <TableCell>
                                            <span className="font-medium text-blue-600">{allocated}</span>
                                        </TableCell>
                                        <TableCell>
                                            {status === "Available" && <Badge>Available</Badge>}
                                            {status === "Allocated" && <Badge variant="secondary">Allocated</Badge>}
                                            {status === "Low Stock" && <Badge variant="destructive">Low Stock</Badge>}
                                        </TableCell>
                                        <TableCell>{new Date(item.dateAdded).toLocaleDateString()}</TableCell>
                                        <TableCell className="text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button size="icon" variant="ghost">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem>
                                                        <Eye className="mr-2 h-4 w-4" />
                                                        View
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem>
                                                        <Pencil className="mr-2 h-4 w-4" />
                                                        Edit
                                                    </DropdownMenuItem>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem>
                                                        <PackageCheck className="mr-2 h-4 w-4" />
                                                        Allocate
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem>
                                                        <ArrowUpRight className="mr-2 h-4 w-4" />
                                                        Issue
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem>
                                                        <ArrowDownLeft className="mr-2 h-4 w-4" />
                                                        Receive
                                                    </DropdownMenuItem>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem className="text-destructive">
                                                        <Trash2 className="mr-2 h-4 w-4" />
                                                        Delete
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                );
                            })
                        ) : (
                            <TableRow>
                                <TableCell colSpan={9} className="h-72">
                                    <div className="flex flex-col items-center justify-center">
                                        <Package className="mb-4 h-14 w-14 text-muted-foreground" />
                                        <h3 className="text-lg font-semibold">No Inventory Items</h3>
                                        <p className="mt-2 text-muted-foreground">
                                            Add your first inventory item to begin managing Edir assets.
                                        </p>
                                        <Button className="mt-6">
                                            <Plus className="mr-2 h-4 w-4" />
                                            Add Item
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
                <div className="border-t p-4">
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious href="#" />
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink isActive href="#">1</PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink href="#">2</PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationNext href="#" />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            </CardContent>
        </Card>

        </div>
    );
};

export default InventoryItemTable;
