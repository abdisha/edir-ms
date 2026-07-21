import {flexRender, getCoreRowModel, useReactTable} from "@tanstack/react-table";

import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/shared/components/ui/table.tsx";
import {Button} from "@/shared/components/ui/button.tsx";
import {Pagination, PaginationContent, PaginationItem,} from "@/shared/components/ui/pagination.tsx";
import {Skeleton} from "@/shared/components/ui/skeleton";

import {columns} from "./columns.tsx";
import type {Member} from "@/features/edir/types/members.ts";

interface PaginationInfo {
    currentPage: number;
    pageSize: number;
    totalPages: number;
    totalItems: number;
}

interface Props {
    data: Member[];
    pagination: PaginationInfo;
    onPageChange: (page: number) => void;
    loading?: boolean;
    emptyContent?: {
        title?: string;
        description?: string;
    };
}

export function MemberTable({
    data,
    pagination,
    onPageChange,
    loading = false,
    emptyContent = {
        title: "No members found",
        description: "Get started by adding your first member",
    },
}: Props) {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    const canGoPrevious = pagination.currentPage > 1;
    const canGoNext = pagination.currentPage < pagination.totalPages;

    // Show skeleton rows during loading
    const skeletonRows = Array.from({ length: pagination.pageSize }).map((_, i) => i);

    return (
        <div className="w-full space-y-6">
            {/* Table */}
            <div className="w-full overflow-x-auto">
                <Table>
                    {/* Header */}
                    <TableHeader>
                        {table.getHeaderGroups().map((group) => (
                            <TableRow key={group.id} className="border-b hover:bg-transparent">
                                {group.headers.map((header) => (
                                    <TableHead
                                        key={header.id}
                                        className="h-12 px-6 font-semibold text-foreground"
                                    >
                                        {flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>

                    {/* Body */}
                    <TableBody>
                        {loading ? (
                            // Loading skeleton rows
                            skeletonRows.map((index) => (
                                <TableRow key={`skeleton-${index}`}>
                                    {columns.map((column) => (
                                        <TableCell key={column.id || index} className="px-6 py-4">
                                            <Skeleton className="h-8 w-full" />
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : data.length > 0 ? (
                            // Data rows
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    className="border-b hover:bg-muted/30 transition-colors duration-150"
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id} className="px-6 py-4">
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            // Empty state
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-32 text-center text-muted-foreground"
                                >
                                    <div className="flex flex-col items-center justify-center gap-2">
                                        <p className="text-base font-medium">{emptyContent.title}</p>
                                        <p className="text-sm">{emptyContent.description}</p>
                                    </div>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination */}
            {!loading && pagination.totalPages > 1 && (
                <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">
                        Page <span className="font-semibold">{pagination.currentPage}</span> of{" "}
                        <span className="font-semibold">{pagination.totalPages}</span> •{" "}
                        <span className="font-semibold">{pagination.totalItems}</span> total members
                    </div>
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => onPageChange(pagination.currentPage - 1)}
                                    disabled={!canGoPrevious || loading}
                                >
                                    Previous
                                </Button>
                            </PaginationItem>

                            {/* Page Numbers */}
                            {Array.from({ length: pagination.totalPages }, (_, i) => {
                                const page = i + 1;
                                const isActive = pagination.currentPage === page;

                                // Show first, last, and nearby pages
                                if (
                                    page === 1 ||
                                    page === pagination.totalPages ||
                                    (page >= pagination.currentPage - 1 && page <= pagination.currentPage + 1)
                                ) {
                                    return (
                                        <PaginationItem key={i}>
                                            <button
                                                onClick={() => onPageChange(page)}
                                                disabled={loading}
                                                className={`h-9 w-9 rounded px-3 py-1 text-sm font-medium transition-colors ${
                                                    isActive
                                                        ? "bg-primary text-primary-foreground"
                                                        : "border border-input hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed"
                                                }`}
                                            >
                                                {page}
                                            </button>
                                        </PaginationItem>
                                    );
                                }

                                // Show ellipsis for gaps
                                if (
                                    (page === 2 && pagination.currentPage > 3) ||
                                    (page === pagination.totalPages - 1 && pagination.currentPage < pagination.totalPages - 2)
                                ) {
                                    return (
                                        <PaginationItem key={i}>
                                            <span className="px-2 text-muted-foreground">...</span>
                                        </PaginationItem>
                                    );
                                }

                                return null;
                            })}

                            <PaginationItem>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => onPageChange(pagination.currentPage + 1)}
                                    disabled={!canGoNext || loading}
                                >
                                    Next
                                </Button>
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            )}
        </div>
    );
}