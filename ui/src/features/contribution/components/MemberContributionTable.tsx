import {CreditCard, Eye, MoreHorizontal,} from "lucide-react";

import {Button} from "@/shared/components/ui/button";

import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/shared/components/ui/table";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
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
    data: MemberContribution[],
    pageNumber: number,
    pageSize: number,
    totalElements: number,
    loading: boolean,

    onPageChange(
        page: number
    ): void,

    onReceivePayment: (contribution: MemberContribution) => void
}


export function MemberContributionTable({
                                            data,
                                            pageNumber,
                                            pageSize,
                                            totalElements,
                                            onPageChange,
                                            loading,
                                            onReceivePayment
                                        }: Props) {

    const totalPages =
        Math.ceil(totalElements / pageSize);

    if (loading) {
        return <SpinnerCard/>
    }
    if (!data) {
        return <h2>
            No data!..
        </h2>
    }

    return (

        <div className="space-y-6">
            <div className="rounded-xl border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>
                                Member
                            </TableHead>
                            <TableHead>
                                Contribution
                            </TableHead>
                            <TableHead>
                                Penalty
                            </TableHead>
                            <TableHead>
                                Rolled Over
                            </TableHead>
                            <TableHead>
                                Status
                            </TableHead>
                            <TableHead className="w-[60px]"/>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell className="font-medium">
                                    {item.memberId}
                                </TableCell>
                                <TableCell>
                                    {item.contributionAmount.toLocaleString()} ETB
                                </TableCell>
                                <TableCell>
                                    {item.penaltyAmount.toLocaleString()} ETB
                                </TableCell>
                                <TableCell>
                                    <div className="space-y-1">
                                        <div>
                                            Contribution:
                                            {" "}
                                            {item.rolledOverContribution}
                                        </div>
                                        <div>
                                            Penalty:
                                            {" "}
                                            {item.rolledOverPenalty}
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <StatusBadge
                                        status={item.status}
                                    />
                                </TableCell>
                                <TableCell>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger>
                                            <Button
                                                size="icon"
                                                variant="ghost"
                                            >
                                                <MoreHorizontal className="h-4 w-4"/>
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem>
                                                <Eye className="mr-2 h-4 w-4"/>
                                                View Details
                                            </DropdownMenuItem>
                                            <DropdownMenuItem
                                                onClick={() => onReceivePayment(item) }
                                            >
                                                <CreditCard className="mr-2 h-4 w-4"/>
                                                Receive Payment
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            onClick={() =>
                                onPageChange(pageNumber - 1)
                            }
                        />
                    </PaginationItem>
                    {Array.from({
                        length: totalPages,
                    }).map((_, index) => (
                        <PaginationItem key={index}>
                            <PaginationLink
                                isActive={
                                    index === pageNumber
                                }

                                onClick={() =>
                                    onPageChange(index)
                                }

                            >

                                {index + 1}

                            </PaginationLink>

                        </PaginationItem>

                    ))}

                    <PaginationItem>

                        <PaginationNext

                            onClick={() =>
                                onPageChange(pageNumber + 1)
                            }

                        />

                    </PaginationItem>

                </PaginationContent>

            </Pagination>

        </div>

    );

}

function StatusBadge({
                         status,
                     }: {
    status: MemberContribution["status"];
}) {
    switch (status) {

        case "PAID":

            return (
                <Badge>
                    Paid
                </Badge>
            );

        case "PARTIALLY_PAID":

            return (
                <Badge variant="secondary">
                    Partial
                </Badge>
            );

        default:

            return (
                <Badge variant="destructive">
                    Pending
                </Badge>
            );
    }
}