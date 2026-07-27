import {useState} from "react";
import {
  AlertTriangle,
  ArrowDownLeft,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Clock,
  Edit,
  Eye,
  Flag,
  MoreHorizontal,
  Package,
  PlusCircle,
  Search,
  Shuffle,
  Trash2,
  User,
  XCircle,
} from "lucide-react";
import {Button} from "@/shared/components/ui/button";
import {Input} from "@/shared/components/ui/input";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/shared/components/ui/table";
import {Badge} from "@/shared/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/shared/components/ui/tabs";
import {FormDrawer} from "@/shared/components/FromDrawer.tsx";
import {InventoryItemForm} from "@/features/inventory/components/InventoryItemFrom.tsx";
import {useCreateInventory} from "../hooks/useCreateInventory";
import {useFormDrawer} from "@/shared/components/useFormDrawer.ts";
import InventoryStatBanner from "@/features/inventory/components/InventoryStatBanner.tsx";
import InventoryItemTable from "@/features/inventory/components/InventoryItemTable.tsx";

// Mock Data Type for Inventory Issues
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

// Mock Data Type for Returned Items
interface ReturnedItem {
  id: string;
  item: string;
  returnedBy: string;
  returnDate: string;
  condition: "GOOD" | "DAMAGED" | "MISSING_PARTS";
  notes?: string;
}

const mockReturnedItems: ReturnedItem[] = [
  { id: "RET-001", item: "Aeron Ergonomic Chair", returnedBy: "Bob Johnson", returnDate: "2023-07-25", condition: "GOOD" },
  { id: "RET-002", item: "Dell Latitude 5520", returnedBy: "Alice Smith", returnDate: "2023-07-24", condition: "DAMAGED", notes: "Screen cracked" },
  { id: "RET-003", item: "Wireless Keyboard & Mouse", returnedBy: "Eve Adams", returnDate: "2023-07-12", condition: "GOOD" },
];

// New: Mock Data Type for Allocated Items
interface AllocatedItem {
  id: string;
  itemName: string;
  sku: string;
  allocatedDate: string;
  returnDueDate?: string;
}

// New: Mock Data for Member Allocations
interface MemberAllocation {
  memberId: string;
  memberName: string;
  department: string;
  items: AllocatedItem[];
}

const mockAllocations: MemberAllocation[] = [
  {
    memberId: "MEM-001",
    memberName: "Alice Smith",
    department: "Engineering",
    items: [
      { id: "ALLOC-001", itemName: "Dell Latitude 5520", sku: "LAP-8821", allocatedDate: "2023-07-01", returnDueDate: "2024-07-01" },
      { id: "ALLOC-002", itemName: "Monitor Dell U2721DE", sku: "MON-4321", allocatedDate: "2023-07-01" },
    ],
  },
  {
    memberId: "MEM-002",
    memberName: "Bob Johnson",
    department: "Marketing",
    items: [
      { id: "ALLOC-003", itemName: "Aeron Ergonomic Chair", sku: "CHR-1029", allocatedDate: "2023-07-10" },
    ],
  },
  {
    memberId: "MEM-003",
    memberName: "Charlie Brown",
    department: "Sales",
    items: [
      { id: "ALLOC-004", itemName: "iPad Pro 11-inch", sku: "TAB-9876", allocatedDate: "2023-06-15", returnDueDate: "2023-12-15" },
      { id: "ALLOC-005", itemName: "Apple Pencil 2nd Gen", sku: "ACC-1122", allocatedDate: "2023-06-15", returnDueDate: "2023-12-15" },
    ],
  },
];


export function InventoryPage() {
  const [selectedInventoryIds, setSelectedInventoryIds] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>(mockInventory);
  const [issues, setIssues] = useState<InventoryIssue[]>(mockInventoryIssues);
  const [returnedItems, setReturnedItems] = useState<ReturnedItem[]>(mockReturnedItems);
  const [allocations, setAllocations] = useState<MemberAllocation[]>(mockAllocations); // New: State for allocations
  const [openAllocations, setOpenAllocations] = useState<string[]>([]); // New: State for collapsible rows
  const createMutation = useCreateInventory();
  const {open, setOpen} = useFormDrawer();

  // Calculate quick stats (can be moved to a separate component or context if needed)
  const totalItems = inventoryItems.reduce((acc, item) => acc + item.quantity, 0);
  const damagedCount = inventoryItems.filter(i => i.status === "DAMAGED").reduce((acc, item) => acc + item.quantity, 0);
  const issuedCount = inventoryItems.filter(i => i.status === "ISSUED").reduce((acc, item) => acc + item.quantity, 0);

  // Selection handlers for Inventory tab
  const toggleAllInventory = () => {
    if (selectedInventoryIds.length === inventoryItems.length) {
      setSelectedInventoryIds([]);
    } else {
      setSelectedInventoryIds(inventoryItems.map(i => i.id));
    }
  };

  const toggleSelectInventory = (id: string) => {
    if (selectedInventoryIds.includes(id)) {
      setSelectedInventoryIds(selectedInventoryIds.filter(item => item !== id));
    } else {
      setSelectedInventoryIds([...selectedInventoryIds, id]);
    }
  };

  const filteredInventoryData = inventoryItems.filter(item =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // New: Toggle allocation group visibility
  const toggleAllocationGroup = (memberId: string) => {
    setOpenAllocations(prev =>
      prev.includes(memberId) ? prev.filter(id => id !== memberId) : [...prev, memberId]
    );
  };


  return (
      <div className="flex flex-col gap-4  md:p-8 max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">Inventory Management Hub</h1>
            <p className="text-sm text-muted-foreground">Manage inventory, track issues, and monitor returned items.</p>
          </div>
        </div>

       <InventoryStatBanner totalItems={21} damagedCount={21} issuedCount={0}/>

        <FormDrawer
            open={open}
            onOpenChange={setOpen}
            size={"xl"}
            title="Inventory Item"
            description="Register a new inventory item."
            loading={createMutation.isPending}
        >

          <InventoryItemForm
              onSubmit={(values) => {
                       createMutation.mutate(values);
                    }
              }
              loading={createMutation.isPending}
              onCancel={() => setOpen(false)}
          />

        </FormDrawer>

        {/* Tabs Section */}
        <Tabs defaultValue="inventory"  className="w-full">
          <TabsList className="grid w-full grid-cols-4" variant="line"> {/* Updated grid-cols-4 and added variant="line" */}
            <TabsTrigger value="inventory" className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              Inventory
            </TabsTrigger>
            <TabsTrigger value="item-issue" className="flex items-center gap-2">
              <Flag className="h-4 w-4" />
              Item Issues
            </TabsTrigger>
            <TabsTrigger value="returned-item" className="flex items-center gap-2">
              <ArrowDownLeft className="h-4 w-4" />
              Returned Items
            </TabsTrigger>
            <TabsTrigger value="item-allocation" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Item Allocation
            </TabsTrigger>
          </TabsList>

          {/* Inventory Tab Content */}
          <TabsContent value="inventory" className="mt-6">
            <h2 className="text-lg font-bold  mb-2">Inventory Overview</h2>
            <p className="text-sm text-muted-foreground mb-4">
              View and manage all physical assets and stock levels within your organization.
            </p>
            <div className="flex flex-col sm:flex-row items-start gap-3 mb-4">
              <Button className="gap-2 shadow-md" onClick={() => setOpen(true)}>
                <PlusCircle className="h-4 w-4 "/>
                <div className="flex flex-col items-start leading-tight">
                  <span className="text-xs font-bold">Add New Item</span>
                  <span className="text-[10px] opacity-80 font-normal">Register asset to stock</span>
                </div>
              </Button>
              <div className="relative w-full sm:w-80">

                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                    placeholder="Search by name, SKU, or category..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 bg-card"
                />
              </div>
              <div className="flex items-center gap-3">

                {selectedInventoryIds.length > 0 && (
                    <div className="flex items-center gap-2 w-full sm:w-auto justify-end bg-muted/50 p-1.5 rounded-lg border">
                  <span className="text-xs font-medium px-2 text-muted-foreground">
                    {selectedInventoryIds.length} selected
                  </span>
                      <Button size="sm" variant="destructive" className="h-7 text-xs">
                        Bulk Delete
                      </Button>
                    </div>
                )}
              </div>
            </div>
            <InventoryItemTable selectedInventoryIds={selectedInventoryIds}
                                inventoryItems={[]}
                                filteredInventoryData={[]}
                                toggleAllInventory={toggleAllInventory}
                                toggleSelectInventory={toggleSelectInventory}/>
          </TabsContent>

          {/* Item Issue Tab Content */}
          <TabsContent value="item-issue" className="mt-6">
            <h2 className="text-lg font-bold   mb-2">Current Item Issues</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Monitor and manage all reported issues related to inventory items, from hardware malfunctions to missing components.
            </p>
            <div className="flex justify-start mb-4">
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
          </TabsContent>

          {/* Returned Item Tab Content */}
          <TabsContent value="returned-item" className="mt-6">
            <h2 className="text-lg font-bold  mb-2">Returned Items Log</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Keep track of all items that have been returned to inventory, noting their condition and return date.
            </p>
            <div className="flex justify-start mb-4">
              <Button className="gap-2 shadow-md">
                <PlusCircle className="h-4 w-4" />
                <div className="flex flex-col items-start leading-tight">
                  <span className="text-xs font-bold">Add Returned Item</span>
                  <span className="text-[10px] opacity-80 font-normal">
                  Record a returned item
                </span>
                </div>
              </Button>
            </div>
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
          </TabsContent>

          {/* New: Item Allocation Tab Content */}
          <TabsContent value="item-allocation" className="mt-6">
            <h2 className="text-lg font-boldmb-2">Member Item Allocations</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Manage the allocation of inventory items to specific team members or departments.
            </p>
            <div className="flex justify-start gap-3 mb-4">
              <Button className="gap-2 shadow-md">
                <User className="h-4 w-4" />
                <div className="flex flex-col items-start leading-tight">
                  <span className="text-xs font-bold">Allocate Item</span>
                  <span className="text-[10px] opacity-80 font-normal">Assign item to member</span>
                </div>
              </Button>
              <Button variant="outline" className="gap-2 shadow-md">
                <Shuffle className="h-4 w-4" />
                <div className="flex flex-col items-start leading-tight">
                  <span className="text-xs font-bold">Transfer Item</span>
                  <span className="text-[10px] opacity-80 font-normal">Reassign allocated item</span>
                </div>
              </Button>
            </div>
            <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-semibold w-1/4">Member Name</TableHead>
                    <TableHead className="font-semibold w-1/4">Department</TableHead>
                    <TableHead className="font-semibold w-1/2">Allocated Items Summary</TableHead>
                    <TableHead className="text-right font-semibold">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {allocations.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={4} className="h-32 text-center text-muted-foreground">
                          No item allocations found.
                        </TableCell>
                      </TableRow>
                  ) : (
                      allocations.map((allocation) => (
                          <>
                            <TableRow
                                key={allocation.memberId}
                                className="cursor-pointer hover:bg-muted/50 transition-colors"
                                onClick={() => toggleAllocationGroup(allocation.memberId)}
                            >
                              <TableCell className="font-medium flex items-center gap-2">
                                {openAllocations.includes(allocation.memberId) ? (
                                    <ChevronUp className="h-4 w-4 text-muted-foreground" />
                                ) : (
                                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                                )}
                                {allocation.memberName}
                              </TableCell>
                              <TableCell>{allocation.department}</TableCell>
                              <TableCell className="text-muted-foreground text-sm">
                                {allocation.items.length} items allocated
                              </TableCell>
                              <TableCell className="text-right">
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button size="icon" variant="ghost" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                                      <MoreHorizontal className="h-4 w-4" />
                                      <span className="sr-only">Actions</span>
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end" className="w-40">
                                    <DropdownMenuItem className="cursor-pointer">
                                      <Eye className="mr-2 h-4 w-4 text-muted-foreground" />
                                      View Allocations
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="cursor-pointer">
                                      <Shuffle className="mr-2 h-4 w-4 text-muted-foreground" />
                                      Transfer All
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem className="cursor-pointer text-destructive focus:text-destructive">
                                      <Trash2 className="mr-2 h-4 w-4" />
                                      Deallocate All
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </TableCell>
                            </TableRow>
                            {openAllocations.includes(allocation.memberId) && allocation.items.length > 0 && (
                                <TableRow className="bg-muted/20">
                                  <TableCell colSpan={4} className="p-0">
                                    <div className="overflow-hidden">
                                      <Table className="w-full">
                                        <TableBody>
                                          {allocation.items.map((item) => (
                                              <TableRow key={item.id} className="hover:bg-muted/40">
                                                <TableCell className="pl-12 py-2 text-muted-foreground w-1/4"></TableCell> {/* Empty cell for alignment */}
                                                <TableCell className="py-2 font-medium w-1/4">{item.itemName}</TableCell>
                                                <TableCell className="py-2 text-sm text-muted-foreground w-1/2">
                                                  SKU: {item.sku} | Allocated: {item.allocatedDate}
                                                  {item.returnDueDate && ` | Due: ${item.returnDueDate}`}
                                                </TableCell>
                                                <TableCell className="text-right py-2">
                                                  <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                      <Button size="icon" variant="ghost" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                        <span className="sr-only">Actions</span>
                                                      </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end" className="w-40">
                                                      <DropdownMenuItem className="cursor-pointer">
                                                        <Eye className="mr-2 h-4 w-4 text-muted-foreground" />
                                                        View Item
                                                      </DropdownMenuItem>
                                                      <DropdownMenuItem className="cursor-pointer">
                                                        <Shuffle className="mr-2 h-4 w-4 text-muted-foreground" />
                                                        Transfer Item
                                                      </DropdownMenuItem>
                                                      <DropdownMenuSeparator />
                                                      <DropdownMenuItem className="cursor-pointer text-destructive focus:text-destructive">
                                                        <Trash2 className="mr-2 h-4 w-4" />
                                                        Deallocate Item
                                                      </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                  </DropdownMenu>
                                                </TableCell>
                                              </TableRow>
                                          ))}
                                        </TableBody>
                                      </Table>
                                    </div>
                                  </TableCell>
                                </TableRow>
                            )}
                          </>
                      ))
                  )}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </Tabs>
      </div>
  );
}

export default InventoryPage;


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