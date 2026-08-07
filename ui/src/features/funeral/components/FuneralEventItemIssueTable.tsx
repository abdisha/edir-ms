import {CheckCircle2, Hash, MoreHorizontal, Package, Pencil, PlusCircle, Trash2,} from "lucide-react";

import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/shared/components/ui/table";

import {Badge} from "@/shared/components/ui/badge";
import {Skeleton} from "@/shared/components/ui/skeleton";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";

import {Button} from "@/shared/components/ui/button";

import type {ReadItemIssue} from "@/features/funeral/types/types";

interface FuneralEventItemIssueTableProps {
    issuedItems: ReadItemIssue[];
    isLoading: boolean;
    onRemove?: (itemId: string) => void;
    onEditQuantity?: (itemId: string) => void;
    onRequestMore?: (itemId: string) => void;
}

export function FuneralEventItemIssueTable({
                                               issuedItems,
                                               isLoading,
                                               onRemove,
                                               onEditQuantity,
                                               onRequestMore,
                                           }: FuneralEventItemIssueTableProps) {

    return (
        <div className="overflow-hidden rounded-xl border bg-background">

            <Table>

                <TableHeader>

                    <TableRow>

                        <TableHead>Item</TableHead>

                        <TableHead>Code</TableHead>

                        <TableHead>Status</TableHead>

                        <TableHead className="text-center">
                            Quantity
                        </TableHead>

                        <TableHead className="w-15" />

                    </TableRow>

                </TableHeader>

                <TableBody>

                    {isLoading ? (

                        Array.from({ length: 5 }).map((_, index) => (

                            <TableRow key={index}>

                                <TableCell>
                                    <div className="flex items-center gap-3">
                                        <Skeleton className="h-10 w-10 rounded-lg" />
                                        <div className="space-y-2">
                                            <Skeleton className="h-4 w-36" />
                                            <Skeleton className="h-3 w-24" />
                                        </div>
                                    </div>
                                </TableCell>

                                <TableCell>
                                    <Skeleton className="h-4 w-24" />
                                </TableCell>

                                <TableCell>
                                    <Skeleton className="h-6 w-20 rounded-full" />
                                </TableCell>

                                <TableCell className="text-center">
                                    <Skeleton className="mx-auto h-6 w-12 rounded-full" />
                                </TableCell>

                                <TableCell>
                                    <Skeleton className="h-8 w-8 rounded-md" />
                                </TableCell>

                            </TableRow>

                        ))

                    ) : issuedItems.length === 0 ? (

                        <TableRow>

                            <TableCell
                                colSpan={5}
                                className="h-56"
                            >

                                <div className="flex flex-col items-center justify-center gap-4">

                                    <div className="rounded-full bg-primary/10 p-5">

                                        <Package className="h-8 w-8 text-primary" />

                                    </div>

                                    <div className="text-center">

                                        <h3 className="font-semibold">
                                            No Issued Items
                                        </h3>

                                        <p className="mt-1 text-sm text-muted-foreground">
                                            Inventory items issued for this funeral
                                            event will appear here.
                                        </p>

                                    </div>

                                </div>

                            </TableCell>

                        </TableRow>

                    ) : (

                        issuedItems.map((item) => (

                            <TableRow
                                key={item.id}
                                className="transition-colors hover:bg-muted/40"
                            >

                                <TableCell>

                                    <div className="flex items-center gap-3">

                                        <div className="rounded-lg bg-primary/10 p-2">

                                            <Package className="h-5 w-5 text-primary" />

                                        </div>

                                        <div>

                                            <p className="font-medium">

                                                {item.name}

                                            </p>

                                            <p className="text-xs text-muted-foreground">
                                                Inventory Item
                                            </p>

                                        </div>

                                    </div>

                                </TableCell>

                                <TableCell>

                                    <div className="flex items-center gap-2 font-mono text-sm">

                                        <Hash className="h-4 w-4 text-muted-foreground" />

                                        {item.itemCode}

                                    </div>

                                </TableCell>

                                <TableCell>

                                    <Badge
                                        variant="secondary"
                                        className="gap-1"
                                    >
                                        <CheckCircle2 className="h-3 w-3" />
                                        Issued
                                    </Badge>

                                </TableCell>

                                <TableCell className="text-center">

                                    <Badge variant="outline">

                                        {item.quantity}

                                    </Badge>

                                </TableCell>

                                <TableCell>

                                    <DropdownMenu>

                                        <DropdownMenuTrigger >

                                            <Button
                                                aria-label={'more'}
                                                size="icon"
                                                variant="ghost">

                                                <MoreHorizontal className="h-4 w-4" />

                                            </Button>

                                        </DropdownMenuTrigger>

                                        <DropdownMenuContent
                                            align="end"
                                        >

                                            <DropdownMenuItem
                                                onClick={() =>
                                                    onEditQuantity?.(item.id)
                                                }
                                            >

                                                <Pencil className="mr-2 h-4 w-4" />

                                                Edit Quantity

                                            </DropdownMenuItem>

                                            <DropdownMenuItem
                                                onClick={() =>
                                                    onRequestMore?.(item.id)
                                                }
                                            >

                                                <PlusCircle className="mr-2 h-4 w-4" />

                                                Issue More

                                            </DropdownMenuItem>

                                            <DropdownMenuItem
                                                className="text-destructive focus:text-destructive"
                                                onClick={() =>
                                                    onRemove?.(item.id)
                                                }
                                            >

                                                <Trash2 className="mr-2 h-4 w-4" />

                                                Remove Item

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
    );
}