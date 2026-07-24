import {useState} from "react";
import {
    AlertTriangle,
    CheckCircle2,
    Clock,
    Edit,
    Eye,
    MoreHorizontal,
    PlusCircle,
    Trash2,
    XCircle,
} from "lucide-react";
import {Button} from "@/shared/components/ui/button";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/shared/components/ui/table";
import {Badge} from "@/shared/components/ui/badge";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";

// Mock Data Type
interface InventoryIssue {
  id: string;
  item: string;
  issueType: string;
  status: "OPEN" | "IN_PROGRESS" | "RESOLVED" | "CLOSED" | "CRITICAL";
  reportedBy: string;
  reportedDate: string;
  resolvedDate?: string;
  description: string;
}

const mockInventoryIssues: InventoryIssue[] = [
  {
    id: "ISSUE-001",
    item: "Dell Latitude 5520",
    issueType: "Hardware Malfunction",
    status: "OPEN",
    reportedBy: "Alice Smith",
    reportedDate: "2023-07-20",
    description: "Laptop not powering on.",
  },
  {
    id: "ISSUE-002",
    item: "Aeron Ergonomic Chair",
    issueType: "Broken Armrest",
    status: "IN_PROGRESS",
    reportedBy: "Bob Johnson",
    reportedDate: "2023-07-18",
    description: "Right armrest is loose and wobbly.",
  },
  {
    id: "ISSUE-003",
    item: "HDMI Cable 2m",
    issueType: "Missing Item",
    status: "RESOLVED",
    reportedBy: "Charlie Brown",
    reportedDate: "2023-07-15",
    resolvedDate: "2023-07-16",
    description: "Unable to locate HDMI cable in meeting room 3.",
  },
  {
    id: "ISSUE-004",
    item: "Projector Epson X49",
    issueType: "Image Distortion",
    status: "CRITICAL",
    reportedBy: "Diana Prince",
    reportedDate: "2023-07-22",
    description: "Projector displays distorted image, lines appearing.",
  },
  {
    id: "ISSUE-005",
    item: "Wireless Keyboard & Mouse",
    issueType: "Connectivity Issues",
    status: "CLOSED",
    reportedBy: "Eve Adams",
    reportedDate: "2023-07-10",
    resolvedDate: "2023-07-12",
    description: "Keyboard and mouse frequently disconnect.",
  },
];

const InventoryIssuePage = () => {
  const [issues, setIssues] = useState<InventoryIssue[]>(mockInventoryIssues);

  return (
    <div className="flex flex-col gap-6 p-6 md:p-8 max-w-7xl mx-auto w-full">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Inventory Issues
          </h1>
          <p className="text-sm text-muted-foreground">
            Track and manage reported problems with inventory items.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button className="gap-2 shadow-md">
            <PlusCircle className="h-4 w-4" />
            <div className="flex flex-col items-start leading-tight">
              <span className="text-xs font-bold">Add New Item Issue</span>
              <span className="text-[10px] opacity-80 font-normal">
                Report a new problem
              </span>
            </div>
          </Button>
        </div>
      </div>

      {/* Issues Table */}
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
                      <DropdownMenuTrigger asChild>
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
    </div>
  );
};

export default InventoryIssuePage;

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