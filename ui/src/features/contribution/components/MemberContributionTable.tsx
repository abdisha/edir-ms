import {AlertCircle, CheckCircle2, Clock, CreditCard, Eye, MoreHorizontal, User} from "lucide-react";
import {Button} from "@/shared/components/ui/button";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/shared/components/ui/table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/shared/components/ui/pagination";
import {Badge} from "@/shared/components/ui/badge.tsx";
import {SpinnerCard} from "@/shared/components/SpinnerCard.tsx";
import type {MemberContribution} from "@/features/contribution/types/contribution.ts";

interface Props {
    data: MemberContribution[];
    pageNumber: number;
    pageSize: number;
    totalElements: number;
    loading: boolean;
    onSelected: (contribution: MemberContribution) => void;
    onPageChange: (page: number) => void;
    onReceivePayment: (contribution: MemberContribution) => void;
}

export function MemberContributionTable({
                                            data,
                                            pageNumber,
                                            pageSize,
                                            totalElements,
                                            onPageChange,
                                            loading,
                                            onReceivePayment,
                                            onSelected,
                                        }: Props) {
    const totalPages = Math.ceil(totalElements / pageSize);

    if (loading) {
        return <SpinnerCard />;
    }

    if (!data) {
        return (
            <div className="flex flex-col items-center justify-center p-12 text-center rounded-lg border bg-card">
                <AlertCircle className="h-10 w-10 text-muted-foreground/60 mb-2" />
                <h3 className="font-semibold text-lg">No data available</h3>
                <p className="text-sm text-muted-foreground">Check back later or refresh the view.</p>
            </div>
        );
    }

    // Calculate current entry bounds for description
    const startItem = totalElements === 0 ? 0 : pageNumber * pageSize + 1;
    const endItem = Math.min((pageNumber + 1) * pageSize, totalElements);

    return (
        <div className="space-y-4">
            {/* Table Card Container */}
            <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
                <Table>
                    <TableHeader className="bg-muted/40">
                        <TableRow className="hover:bg-transparent">
                            <TableHead className="font-semibold">Member</TableHead>
                            <TableHead className="font-semibold">Contribution</TableHead>
                            <TableHead className="font-semibold">Penalty</TableHead>
                            <TableHead className="font-semibold">Rolled Over</TableHead>
                            <TableHead className="font-semibold">Status</TableHead>
                            <TableHead className="text-right font-semibold pr-4">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} className="h-32 text-center text-muted-foreground">
                                    No contributions found matching your criteria.
                                </TableCell>
                            </TableRow>
                        ) : (
                            data.map((item) => (
                                <TableRow
                                    key={item.id}
                                    className="group hover:bg-muted/50 transition-colors cursor-pointer"
                                >
                                    {/* Member Info */}
                                    <TableCell className="py-3.5" onClick={() => onSelected(item)}>
                                        <div className="flex items-center gap-3">
                                            <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors shrink-0">
                                                <User className="h-4 w-4" />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="font-medium text-foreground group-hover:text-primary transition-colors">
                                                    {item.fullName}
                                                </span>
                                                <span className="text-xs text-muted-foreground">
                                                    ID: {item.id.slice(0, 8)}...
                                                </span>
                                            </div>
                                        </div>
                                    </TableCell>

                                    {/* Contribution Amount */}
                                    <TableCell onClick={() => onSelected(item)}>
                                        <div className="font-semibold text-foreground">
                                            {item.contributionAmount.toLocaleString()} <span className="text-xs font-normal text-muted-foreground">ETB</span>
                                        </div>
                                    </TableCell>

                                    {/* Penalty Amount */}
                                    <TableCell onClick={() => onSelected(item)}>
                                        <div className={`font-medium ${item.penaltyAmount > 0 ? "text-destructive" : "text-muted-foreground"}`}>
                                            {item.penaltyAmount.toLocaleString()} <span className="text-xs font-normal">ETB</span>
                                        </div>
                                    </TableCell>

                                    {/* Rolled Over Details */}
                                    <TableCell onClick={() => onSelected(item)}>
                                        <div className="flex flex-col gap-0.5 text-xs">
                                            <div className="flex items-center justify-between gap-3 w-28 text-muted-foreground">
                                                <span>Contr:</span>
                                                <span className="font-medium text-foreground">{item.rolledOverContribution}</span>
                                            </div>
                                            <div className="flex items-center justify-between gap-3 w-28 text-muted-foreground">
                                                <span>Pen:</span>
                                                <span className="font-medium text-foreground">{item.rolledOverPenalty}</span>
                                            </div>
                                        </div>
                                    </TableCell>

                                    {/* Status Badge */}
                                    <TableCell onClick={() => onSelected(item)}>
                                        <StatusBadge status={item.status} />
                                    </TableCell>

                                    {/* Actions */}
                                    <TableCell className="text-right pr-4" onClick={(e) => e.stopPropagation()}>
                                        <div className="flex items-center justify-end gap-2">
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                className="hidden md:flex h-8 gap-1.5 border-primary/20 hover:border-primary hover:bg-primary/5 text-primary shadow-xs"
                                                onClick={() => onReceivePayment(item)}
                                                disabled={item.status === "PAID"}
                                            >
                                                <CreditCard className="h-3.5 w-3.5" />
                                                Receive Pay
                                            </Button>

                                            <DropdownMenu>
                                                <DropdownMenuTrigger>
                                                    <Button size="icon" variant="ghost" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                        <span className="sr-only">Open menu</span>
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className="w-48">
                                                    <DropdownMenuItem onClick={() => onSelected(item)} className="cursor-pointer">
                                                        <Eye className="mr-2 h-4 w-4 text-muted-foreground" />
                                                        View Details
                                                    </DropdownMenuItem>
                                                    <DropdownMenuSeparator className="md:hidden" />
                                                    <DropdownMenuItem
                                                        className="md:hidden cursor-pointer"
                                                        onClick={() => onReceivePayment(item)}
                                                        disabled={item.status === "PAID"}
                                                    >
                                                        <CreditCard className="mr-2 h-4 w-4 text-muted-foreground" />
                                                        Receive Payment
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>
                                    </TableCell>

                                </TableRow>

                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination & Details Footer */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-2">
                <p className="text-sm text-muted-foreground">
                    Showing <span className="font-medium text-foreground">{startItem}</span> to{" "}
                    <span className="font-medium text-foreground">{endItem}</span> of{" "}
                    <span className="font-medium text-foreground">{totalElements}</span> entries
                </p>

                {totalPages > 1 && (
                    <Pagination className="mx-0 w-auto">
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious
                                    onClick={() => onPageChange(pageNumber - 1)}
                                    aria-disabled={pageNumber === 0}
                                    className={pageNumber === 0 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                                />
                            </PaginationItem>

                            {Array.from({ length: totalPages }).map((_, index) => (
                                <PaginationItem key={index} className="hidden sm:inline-block">
                                    <PaginationLink
                                        isActive={index === pageNumber}
                                        onClick={() => onPageChange(index)}
                                        className="cursor-pointer"
                                    >
                                        {index + 1}
                                    </PaginationLink>
                                </PaginationItem>
                            ))}

                            <PaginationItem>
                                <PaginationNext
                                    onClick={() => onPageChange(pageNumber + 1)}
                                    aria-disabled={pageNumber >= totalPages - 1}
                                    className={pageNumber >= totalPages - 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                )}
            </div>
        </div>
    );
}

function StatusBadge({ status }: { status: MemberContribution["status"] }) {
    switch (status) {
        case "PAID":
            return (
                <Badge variant="default" className="bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20 border-emerald-500/20 gap-1 font-medium shadow-none">
                    <CheckCircle2 className="h-3 w-3" />
                    Paid
                </Badge>
            );
        case "PARTIALLY_PAID":
            return (
                <Badge variant="secondary" className="bg-amber-500/10 text-amber-600 hover:bg-amber-500/20 border-amber-500/20 gap-1 font-medium shadow-none">
                    <Clock className="h-3 w-3" />
                    Partial
                </Badge>
            );
        default:
            return (
                <Badge variant="destructive" className="bg-rose-500/10 text-rose-600 hover:bg-rose-500/20 border-rose-500/20 gap-1 font-medium shadow-none">
                    <AlertCircle className="h-3 w-3" />
                    Pending
                </Badge>
            );
    }
}