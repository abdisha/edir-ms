import {CalendarDays, ChevronRight, ClipboardList, Package, Warehouse,} from "lucide-react";

import {Card, CardContent, CardDescription, CardHeader, CardTitle,} from "@/shared/components/ui/card";

import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/shared/components/ui/table";

import {Badge} from "@/shared/components/ui/badge";
import {Skeleton} from "@/shared/components/ui/skeleton";

export interface IssueView {
    issueId: string;
    funeralId: string;
    funeralName: string;
    issueDate: string;
}

export interface IssueItemView {
    issueId: string;
    itemId: string;
    itemName: string;
    itemCode: string;
    quantity: number;
    fromId: string;
    store: string;
    status: string;
}

interface IssueTableProps {
    issues: IssueView[];
    issueItems?: IssueItemView[];

    selectedIssueId?: string;

    loading?: boolean;
    itemsLoading?: boolean;

    onSelectIssue: (issueId: string) => void;
}

export function IssueTable({
                               issues,
                               issueItems = [],
                               selectedIssueId,
                               loading = false,
                               itemsLoading = false,
                               onSelectIssue,
                           }: IssueTableProps) {
    const selectedIssue = issues.find(
        (issue) => issue.issueId === selectedIssueId
    );

    return (
        <div className="space-y-6">

            {/* =========================================================
                ISSUES
            ========================================================== */}

            <Card className="overflow-hidden">

                <CardHeader className="border-b bg-muted/20">

                    <div className="flex items-start gap-4">

                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10">

                            <ClipboardList className="h-5 w-5 text-primary" />

                        </div>

                        <div className="space-y-1">

                            <CardTitle>
                                Inventory Issues
                            </CardTitle>

                            <CardDescription>
                                Select an issue to view the inventory items
                                issued for that funeral event.
                            </CardDescription>

                        </div>

                    </div>

                </CardHeader>

                <CardContent className="p-0">

                    <div className="overflow-x-auto">

                        <Table>

                            <TableHeader>

                                <TableRow>

                                    <TableHead className="pl-6">
                                        Funeral Event
                                    </TableHead>

                                    <TableHead>
                                        Issue Date
                                    </TableHead>

                                    <TableHead>
                                        Funeral ID
                                    </TableHead>

                                    <TableHead className="text-right pr-6">
                                        Details
                                    </TableHead>

                                </TableRow>

                            </TableHeader>

                            <TableBody>

                                {loading ? (

                                    Array.from({ length: 5 }).map(
                                        (_, index) => (

                                            <TableRow key={index}>

                                                <TableCell className="pl-6">
                                                    <div className="flex items-center gap-3">
                                                        <Skeleton className="h-10 w-10 rounded-lg" />

                                                        <div className="space-y-2">
                                                            <Skeleton className="h-4 w-40" />
                                                            <Skeleton className="h-3 w-24" />
                                                        </div>
                                                    </div>
                                                </TableCell>

                                                <TableCell>
                                                    <Skeleton className="h-4 w-28" />
                                                </TableCell>

                                                <TableCell>
                                                    <Skeleton className="h-4 w-32" />
                                                </TableCell>

                                                <TableCell className="pr-6">
                                                    <Skeleton className="ml-auto h-8 w-8 rounded-md" />
                                                </TableCell>

                                            </TableRow>

                                        )
                                    )

                                ) : issues.length === 0 ? (

                                    <TableRow>

                                        <TableCell
                                            colSpan={4}
                                            className="h-56"
                                        >

                                            <EmptyIssues />

                                        </TableCell>

                                    </TableRow>

                                ) : (

                                    issues.map((issue) => {

                                        const selected =
                                            issue.issueId ===
                                            selectedIssueId;

                                        return (

                                            <TableRow
                                                key={issue.issueId}
                                                onClick={() =>
                                                    onSelectIssue(
                                                        issue.issueId
                                                    )
                                                }
                                                className={`
                                                    cursor-pointer
                                                    transition-colors
                                                    hover:bg-muted/40
                                                    ${selected
                                                    ? "bg-primary/5 hover:bg-primary/10"
                                                    : ""
                                                }
                                                `}
                                            >

                                                <TableCell className="pl-6">

                                                    <div className="flex items-center gap-3">

                                                        <div
                                                            className={`
                                                                flex h-10 w-10
                                                                items-center justify-center
                                                                rounded-lg
                                                                ${selected
                                                                ? "bg-primary/15 text-primary"
                                                                : "bg-muted text-muted-foreground"
                                                            }
                                                            `}
                                                        >

                                                            <Package className="h-5 w-5" />

                                                        </div>

                                                        <div>

                                                            <p className="font-medium">
                                                                {issue.funeralName}
                                                            </p>

                                                            <p className="text-xs text-muted-foreground">
                                                                Issue #{issue.issueId.slice(0, 8)}
                                                            </p>

                                                        </div>

                                                    </div>

                                                </TableCell>

                                                <TableCell>

                                                    <div className="flex items-center gap-2 text-sm">

                                                        <CalendarDays className="h-4 w-4 text-muted-foreground" />

                                                        {formatDate(
                                                            issue.issueDate
                                                        )}

                                                    </div>

                                                </TableCell>

                                                <TableCell>

                                                    <Badge
                                                        variant="outline"
                                                        className="font-mono text-xs"
                                                    >
                                                        {issue.funeralId.slice(
                                                            0,
                                                            8
                                                        )}
                                                        ...
                                                    </Badge>

                                                </TableCell>

                                                <TableCell className="pr-6">

                                                    <ChevronRight
                                                        className={`
                                                            ml-auto h-4 w-4
                                                            transition-transform
                                                            ${selected
                                                            ? "translate-x-1 text-primary"
                                                            : "text-muted-foreground"
                                                        }
                                                        `}
                                                    />

                                                </TableCell>

                                            </TableRow>

                                        );
                                    })

                                )}

                            </TableBody>

                        </Table>

                    </div>

                </CardContent>

            </Card>


            {/* =========================================================
                SELECTED ISSUE DETAILS
            ========================================================== */}

            {selectedIssue && (

                <Card className="overflow-hidden">

                    <CardHeader className="border-b bg-muted/20">

                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                            <div className="flex items-start gap-4">

                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10">

                                    <Warehouse className="h-5 w-5 text-primary" />

                                </div>

                                <div>

                                    <CardTitle>
                                        Issued Inventory
                                    </CardTitle>

                                    <CardDescription>

                                        Items issued for{" "}

                                        <span className="font-medium text-foreground">
                                            {selectedIssue.funeralName}
                                        </span>

                                    </CardDescription>

                                </div>

                            </div>

                            <Badge variant="secondary">

                                {issueItems.length}{" "}
                                {issueItems.length === 1
                                    ? "item"
                                    : "items"}

                            </Badge>

                        </div>

                    </CardHeader>

                    <CardContent className="p-0">

                        <div className="overflow-x-auto">

                            <Table>

                                <TableHeader>

                                    <TableRow>

                                        <TableHead className="pl-6">
                                            Item
                                        </TableHead>

                                        <TableHead>
                                            Item Code
                                        </TableHead>

                                        <TableHead>
                                            Store
                                        </TableHead>

                                        <TableHead className="text-center">
                                            Quantity
                                        </TableHead>

                                        <TableHead>
                                            Status
                                        </TableHead>

                                    </TableRow>

                                </TableHeader>

                                <TableBody>

                                    {itemsLoading ? (

                                        Array.from({ length: 4 }).map(
                                            (_, index) => (

                                                <TableRow key={index}>

                                                    <TableCell className="pl-6">
                                                        <Skeleton className="h-4 w-40" />
                                                    </TableCell>

                                                    <TableCell>
                                                        <Skeleton className="h-4 w-24" />
                                                    </TableCell>

                                                    <TableCell>
                                                        <Skeleton className="h-4 w-32" />
                                                    </TableCell>

                                                    <TableCell>
                                                        <Skeleton className="mx-auto h-6 w-12" />
                                                    </TableCell>

                                                    <TableCell>
                                                        <Skeleton className="h-6 w-20 rounded-full" />
                                                    </TableCell>

                                                </TableRow>

                                            )
                                        )

                                    ) : issueItems.length === 0 ? (

                                        <TableRow>

                                            <TableCell
                                                colSpan={5}
                                                className="h-40 text-center"
                                            >

                                                <div className="flex flex-col items-center gap-2">

                                                    <Package className="h-8 w-8 text-muted-foreground" />

                                                    <p className="font-medium">
                                                        No items issued
                                                    </p>

                                                    <p className="text-sm text-muted-foreground">
                                                        This issue does not contain
                                                        any inventory items.
                                                    </p>

                                                </div>

                                            </TableCell>

                                        </TableRow>

                                    ) : (

                                        issueItems.map((item) => (

                                            <TableRow key={item.itemId}>

                                                <TableCell className="pl-6">

                                                    <div>

                                                        <p className="font-medium">
                                                            {item.itemName}
                                                        </p>

                                                        <p className="text-xs text-muted-foreground">
                                                            Item ID:{" "}
                                                            {item.itemId.slice(
                                                                0,
                                                                8
                                                            )}
                                                            ...
                                                        </p>

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

                                                <TableCell className="text-center">

                                                    <Badge>
                                                        {item.quantity}
                                                    </Badge>

                                                </TableCell>

                                                <TableCell>

                                                    <StatusBadge
                                                        status={item.status}
                                                    />

                                                </TableCell>

                                            </TableRow>

                                        ))

                                    )}

                                </TableBody>

                            </Table>

                        </div>

                    </CardContent>

                </Card>

            )}

        </div>
    );
}


/* =========================================================
   EMPTY STATE
========================================================= */

function EmptyIssues() {
    return (
        <div className="flex flex-col items-center justify-center gap-4">

            <div className="rounded-full bg-muted p-5">

                <ClipboardList className="h-8 w-8 text-muted-foreground" />

            </div>

            <div className="text-center">

                <h3 className="font-semibold">
                    No inventory issues
                </h3>

                <p className="mt-1 max-w-sm text-sm text-muted-foreground">
                    Inventory issues created for funeral events will
                    appear here.
                </p>

            </div>

        </div>
    );
}


/* =========================================================
   STATUS
========================================================= */

function StatusBadge({
                         status,
                     }: {
    status: string;
}) {
    const normalized = status.toUpperCase();

    const isCompleted =
        normalized === "COMPLETED" ||
        normalized === "RETURNED" ||
        normalized === "CLOSED";

    return (
        <Badge
            variant={isCompleted ? "secondary" : "outline"}
        >
            {formatStatus(status)}
        </Badge>
    );
}


/* =========================================================
   HELPERS
========================================================= */

function formatDate(value: string) {
    return new Date(value).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
}

function formatStatus(value: string) {
    return value
        .toLowerCase()
        .replaceAll("_", " ")
        .replace(/\b\w/g, (char) => char.toUpperCase());
}