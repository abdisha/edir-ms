import {useState} from "react";

import {
    CalendarDays,
    CheckCircle2Icon,
    ChevronDown,
    ChevronRight,
    ClipboardList,
    MapPin,
    MoreHorizontal,
    Package,
    Trash2,
    Warehouse,
} from "lucide-react";

import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/shared/components/ui/table";

import {Button} from "@/shared/components/ui/button";
import {Badge} from "@/shared/components/ui/badge";
import {Separator} from "@/shared/components/ui/separator";
import {Skeleton} from "@/shared/components/ui/skeleton";
import type {IssueItemView, IssueView} from "@/features/inventory/types.ts";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/shared/components/ui/dropdown-menu.tsx";

interface InventoryIssueTableProps {
    issues: IssueView[];
    issueItems: IssueItemView[];
    loading?: boolean;
    itemsLoading?: boolean;
    onSelectIssue?: (issueId: string) => void;
    onItemSelect?: (item: IssueItemView) => void;
    onItemRejected: (itemId: string) => void;
}

const InventoryIssueTable = ({
                                 issues,
                                 issueItems,
                                 loading = false,
                                 itemsLoading = false,
                                 onSelectIssue,
                                 onItemSelect,
                                 onItemRejected,
                             }: InventoryIssueTableProps) => {

    const [expandedIssues, setExpandedIssues] = useState<Set<string>>(new Set());

    const toggleIssue = (issueId: string) => {
        setExpandedIssues((previous) => {
            const next = new Set(previous);
            if (next.has(issueId)) {
                next.delete(issueId);
            } else {
                next.add(issueId);
            }
            return next;
        });
    };

    const getIssueItems = (issueId: string) => {
        return issueItems.filter(
            (item) => item.issueId === issueId
        );
    };

    return (<div className="overflow-hidden rounded-xl border bg-card shadow-sm">
            <Table>
                <TableHeader>
                    <TableRow className="bg-muted/40 hover:bg-muted/40">
                        <TableHead className="w-12" />
                        <TableHead>
                            Issue
                        </TableHead>
                        <TableHead>
                            Funeral Event
                        </TableHead>
                        <TableHead>
                            Issue Date
                        </TableHead>
                        <TableHead>
                            Items
                        </TableHead>
                        <TableHead className="text-right">
                            Actions
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {loading ? (
                        <IssueTableSkeleton />
                    ) : issues.length === 0 ? (
                        <TableRow>
                            <TableCell
                                colSpan={6}
                                className="h-56"
                            >
                                <EmptyState />
                            </TableCell>
                        </TableRow>
                    ) : (
                        issues.map((issue) => {
                            const isExpanded =
                                expandedIssues.has(
                                    issue.issueId
                                );
                            const items =
                                getIssueItems(
                                    issue.issueId
                                );
                            return (
                                <IssueGroup
                                    key={issue.issueId}
                                    issue={issue}
                                    items={items}
                                    expanded={isExpanded}
                                    itemsLoading={itemsLoading}
                                    onItemRejected={onItemRejected}
                                    onToggle={() =>
                                        toggleIssue(
                                            issue.issueId
                                        )
                                    }
                                    onSelectIssue={
                                        onSelectIssue
                                    }
                                    onItemSelect={
                                        onItemSelect
                                    }
                                />
                            );
                        })
                    )}
                </TableBody>
            </Table>
        </div>
    );
};

export default InventoryIssueTable;

interface IssueGroupProps {
    issue: IssueView;
    items: IssueItemView[];
    expanded: boolean;
    itemsLoading: boolean;
    onToggle: () => void;
    onSelectIssue?: (issueId: string) => void;
    onItemSelect?: (item: IssueItemView) => void;
    onItemRejected: (itemId: string) => void;
}

const IssueGroup = ({
                        issue,
                        items,
                        expanded,
                        itemsLoading,
                        onToggle,
                        onSelectIssue,
                        onItemSelect,
                        onItemRejected
                    }: IssueGroupProps) => {

    return (
        <>
            <TableRow
                onClick={() => onToggle()}
                className={`
                    cursor-pointer
                    border-b
                    transition-colors
                    ${
                    expanded
                        ? "bg-primary/[0.04]"
                        : "hover:bg-muted/30"
                }
                `}
            >
                <TableCell className="pl-4">
                    <Button
                        aria-label={'Expand issue'}
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={(event) => {
                            event.stopPropagation();
                            onToggle();
                            onSelectIssue?.(
                                issue.issueId
                            );
                        }}
                    >
                        {expanded ? (
                            <ChevronDown className="h-4 w-4" />
                        ) : (
                            <ChevronRight className="h-4 w-4" />
                        )}
                    </Button>
                </TableCell>
                <TableCell>
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                            <ClipboardList className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                            <p className="font-semibold">
                                Inventory Issue
                            </p>
                            <p className="font-mono text-xs text-muted-foreground">
                                {issue.issueId.slice(0, 8)}...
                            </p>
                        </div>
                    </div>
                </TableCell>
                <TableCell>
                    <div className="space-y-1">
                        <p className="font-medium">
                            {issue.funeralName}
                        </p>
                        <p className="flex items-center gap-1 text-xs text-muted-foreground">
                            <MapPin className="h-3 w-3" />
                            Funeral Event
                        </p>
                    </div>
                </TableCell>
                <TableCell>
                    <div className="flex items-center gap-2">
                        <CalendarDays className="h-4 w-4 text-muted-foreground" />
                        <span>
                            {formatDate(issue.issueDate)}
                        </span>
                    </div>
                </TableCell>
                <TableCell>
                    <Badge variant="secondary">
                        <Package className="mr-1.5 h-3.5 w-3.5" />
                        {issue.itemCount}{" "}
                        {issue.itemCount === 1
                            ? "Item"
                            : "Items"}
                    </Badge>
                </TableCell>
                <TableCell className="text-right">
                    <Button
                        aria-label={'View issue'}
                        variant="ghost"
                        size="icon"
                        onClick={(event) => {
                            event.stopPropagation();
                            onSelectIssue?.(
                                issue.issueId
                            );
                        }}
                    >
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </TableCell>
            </TableRow>
            {expanded && (
                <TableRow className="hover:bg-transparent">
                    <TableCell
                        colSpan={6}
                        className="p-0"
                    >
                        <div className="bg-muted/20 px-8 py-5">
                            <div className="mb-4 flex items-center justify-between">
                                <div>
                                    <h3 className="flex items-center gap-2 font-semibold">
                                        <Package className="h-4 w-4 text-primary" />
                                        Issued Items
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                        Inventory items associated with this
                                        issue.
                                    </p>
                                </div>
                                <Badge variant="outline">
                                    {issue.itemCount} items
                                </Badge>
                            </div>
                            <Separator className="mb-4" />
                            <div className="overflow-hidden rounded-lg border bg-background">
                                <Table>
                                    <TableHeader>
                                        <TableRow className="bg-muted/30">
                                            <TableHead className="pl-5">
                                                Item
                                            </TableHead>
                                            <TableHead>
                                                Item Code
                                            </TableHead>
                                            <TableHead>
                                                Store
                                            </TableHead>
                                            <TableHead>
                                                Quantity
                                            </TableHead>
                                            <TableHead>
                                                Status
                                            </TableHead>
                                            <TableHead className="text-right">
                                                Actions
                                            </TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {itemsLoading ? (
                                            <ItemSkeleton />
                                        ) : items.length === 0 ? (
                                            <TableRow>
                                                <TableCell
                                                    colSpan={5}
                                                    className="h-28 text-center"
                                                >
                                                    <div className="text-sm text-muted-foreground">
                                                        No items found for
                                                        this issue.
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ) : (
                                            items.map((item) => (
                                                <TableRow
                                                    key={item.itemId}
                                                    className="cursor-pointer"

                                                >
                                                    <TableCell className="pl-5">
                                                        <div className="flex items-center gap-3">
                                                            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-muted">
                                                                <Package className="h-4 w-4 text-muted-foreground" />
                                                            </div>

                                                            <div>
                                                                <p className="font-medium hover:text-primary">
                                                                    {item.itemName}
                                                                </p>
                                                                <p className="font-mono text-xs text-muted-foreground">
                                                                    {item.itemId.slice(
                                                                        0,
                                                                        8
                                                                    )}
                                                                    ...

                                                                </p>

                                                            </div>

                                                        </div>

                                                    </TableCell>
                                                    <TableCell>
                                                        <Badge
                                                            variant="outline"
                                                            className="font-mono"
                                                        >
                                                            {item.itemCode}
                                                        </Badge>
                                                    </TableCell>

                                                    <TableCell>
                                                        <div className="flex items-center gap-2">
                                                            <Warehouse className="h-4 w-4 text-muted-foreground" />
                                                            {item.store}
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>
                                                        <span className="font-semibold">
                                                            {item.quantity}
                                                        </span>
                                                    </TableCell>

                                                    <TableCell>
                                                        <StatusBadge
                                                            status={
                                                                item.status
                                                            }
                                                        />

                                                    </TableCell>
                                                    <TableCell className="text-right">
                                                        <DropdownMenu>
                                                            <DropdownMenuTrigger>
                                                                <Button size="icon" variant="ghost"
                                                                        className="h-8 w-8 text-muted-foreground hover:text-foreground">
                                                                    <MoreHorizontal className="h-4 w-4"/>
                                                                    <span className="sr-only">Actions</span>
                                                                </Button>
                                                            </DropdownMenuTrigger>
                                                            <DropdownMenuContent align="end" className="w-40">
                                                                <DropdownMenuItem className="cursor-pointer "
                                                                                  onClick={() =>
                                                                                      onItemSelect?.(
                                                                                          item
                                                                                      )
                                                                                  }
                                                                >
                                                                    <CheckCircle2Icon
                                                                        className="mr-2 h-4 w-4 text-muted-foreground"/>
                                                                    Approve
                                                                </DropdownMenuItem>
                                                                <DropdownMenuItem
                                                                    className="cursor-pointer text-destructive focus:text-destructive"
                                                                    onClick={() => onItemRejected(item.itemId)}>
                                                                    <Trash2
                                                                        className="mr-2 h-4 w-4 text-muted-foreground"/>
                                                                    Reject
                                                                </DropdownMenuItem>
                                                                <DropdownMenuSeparator/>
                                                            </DropdownMenuContent>
                                                        </DropdownMenu>
                                                    </TableCell>

                                                </TableRow>

                                            ))

                                        )}

                                    </TableBody>

                                </Table>

                            </div>

                        </div>

                    </TableCell>

                </TableRow>

            )}

        </>
    );
};

const EmptyState = () => (
    <div className="flex flex-col items-center justify-center gap-3">

        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">

            <ClipboardList className="h-6 w-6 text-muted-foreground" />

        </div>

        <div className="text-center">

            <p className="font-medium">
                No inventory issues
            </p>

            <p className="mt-1 text-sm text-muted-foreground">
                Inventory issues will appear here when they are created.
            </p>

        </div>

    </div>
);

const IssueTableSkeleton = () => (
    <>
        {Array.from({ length: 5 }).map((_, index) => (

            <TableRow key={index}>

                <TableCell colSpan={6}>

                    <div className="flex items-center gap-4">

                        <Skeleton className="h-8 w-8" />

                        <Skeleton className="h-10 w-full" />

                    </div>

                </TableCell>

            </TableRow>

        ))}
    </>
);

const ItemSkeleton = () => (
    <>
        {Array.from({ length: 3 }).map((_, index) => (

            <TableRow key={index}>

                <TableCell>
                    <Skeleton className="h-8 w-40" />
                </TableCell>

                <TableCell>
                    <Skeleton className="h-6 w-24" />
                </TableCell>

                <TableCell>
                    <Skeleton className="h-5 w-28" />
                </TableCell>

                <TableCell>
                    <Skeleton className="h-5 w-12" />
                </TableCell>

                <TableCell>
                    <Skeleton className="h-6 w-20" />
                </TableCell>

            </TableRow>

        ))}
    </>
);


const StatusBadge = ({
                         status,
                     }: {
    status: string;
}) => {

    const normalized = status.toUpperCase();

    const styles: Record<string, string> = {
        ISSUED:
            "bg-blue-500/10 text-blue-600 border-blue-500/20",
        RETURNED:
            "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
        PENDING:
            "bg-amber-500/10 text-amber-600 border-amber-500/20",
        DAMAGED:
            "bg-red-500/10 text-red-600 border-red-500/20",
    };

    return (
        <Badge
            variant="outline"
            className={
                styles[normalized] ??
                "bg-muted text-muted-foreground"
            }
        >
            {formatLabel(status)}
        </Badge>
    );
};


const formatLabel = (value: string) =>
    value
        .replaceAll("_", " ")
        .toLowerCase()
        .replace(/\b\w/g, (char) => char.toUpperCase());

const formatDate = (value: string) =>
    new Date(value).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
    });