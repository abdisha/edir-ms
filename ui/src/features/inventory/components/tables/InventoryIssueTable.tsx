import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/shared/components/ui/table.tsx";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/shared/components/ui/dropdown-menu.tsx";
import {Button} from "@/shared/components/ui/button.tsx";
import {AlertTriangle, CheckCircle2, Clock, Edit, Eye, MoreHorizontal, Trash2, XCircle} from "lucide-react";
import {Badge} from "@/shared/components/ui/badge.tsx";
import type {InventoryIssue} from "@/features/inventory/types.ts";

const InventoryIssueTable =()=>{
    const issues:InventoryIssue[]=[];
    return (
        <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="font-semibold">Issue ID</TableHead>
                        <TableHead className="font-semibold">Item</TableHead>
                        <TableHead className="font-semibold">Issue Type</TableHead>
                        <TableHead className="font-semibold">Status</TableHead>
                        <TableHead className="font-semibold">Reported By</TableHead>
                        <TableHead className="font-semibold">Reported Date</TableHead>
                        <TableHead className="text-right font-semibold">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {issues.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={7} className="h-32 text-center text-muted-foreground">
                                No inventory issues found.
                            </TableCell>
                        </TableRow>
                    ) : (
                        issues.map((issue) => (
                            <TableRow key={issue.id}>
                                <TableCell className="font-medium">{issue.id}</TableCell>
                                <TableCell>{issue.item}</TableCell>
                                <TableCell>{issue.issueType}</TableCell>
                                <TableCell>
                                    <IssueStatusBadge status={issue.status} />
                                </TableCell>
                                <TableCell>{issue.reportedBy}</TableCell>
                                <TableCell>{issue.reportedDate}</TableCell>
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

export default InventoryIssueTable;

function IssueStatusBadge({ status }: { status: InventoryIssue["status"] }) {
    switch (status) {
        case "OPEN":
            return (
                <Badge variant="secondary" className="bg-blue-500/10 text-blue-600 hover:bg-blue-500/20 border-blue-500/20 gap-0.5 font-medium shadow-none px-1 py-0 text-[9px] uppercase tracking-wider">
                    <Clock className="h-2.5 w-2.5" />
                    Open
                </Badge>
            );
        case "IN_PROGRESS":
            return (
                <Badge variant="secondary" className="bg-amber-500/10 text-amber-600 hover:bg-amber-500/20 border-amber-500/20 gap-0.5 font-medium shadow-none px-1 py-0 text-[9px] uppercase tracking-wider">
                    <AlertTriangle className="h-2.5 w-2.5" />
                    In Progress
                </Badge>
            );
        case "RESOLVED":
            return (
                <Badge variant="default" className="bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20 border-emerald-500/20 gap-0.5 font-medium shadow-none px-1 py-0 text-[9px] uppercase tracking-wider">
                    <CheckCircle2 className="h-2.5 w-2.5" />
                    Resolved
                </Badge>
            );
        case "CLOSED":
            return (
                <Badge variant="outline" className="text-muted-foreground border-border gap-0.5 font-medium shadow-none px-1 py-0 text-[9px] uppercase tracking-wider">
                    <XCircle className="h-2.5 w-2.5" />
                    Closed
                </Badge>
            );
        case "CRITICAL":
            return (
                <Badge variant="destructive" className="bg-rose-500/10 text-rose-600 hover:bg-rose-500/20 border-rose-500/20 gap-0.5 font-medium shadow-none px-1 py-0 text-[9px] uppercase tracking-wider">
                    <AlertTriangle className="h-2.5 w-2.5" />
                    Critical
                </Badge>
            );
    }
}