import {useState} from "react";
import {
  AlertTriangle,
  ArrowUpRight,
  CheckCircle2,
  Download,
  Edit,
  Eye,
  Flag,
  MoreHorizontal,
  Package,
  PackagePlus,
  PlusCircle,
  Search,
  Trash2
} from "lucide-react";
import {Button} from "@/shared/components/ui/button";
import {Input} from "@/shared/components/ui/input";
import {Card, CardContent, CardHeader, CardTitle} from "@/shared/components/ui/card";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/shared/components/ui/table";
import {Badge} from "@/shared/components/ui/badge";
import {Checkbox} from "@/shared/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import {useNavigate} from "react-router";

interface InventoryItem {
  id: string;
  name: string;
  sku: string;
  category: string;
  quantity: number;
  status: "IN_STOCK" | "ISSUED" | "DAMAGED" | "LOW_STOCK";
  location: string;
  lastUpdated: string;
}

const mockInventory: InventoryItem[] = [
  { id: "1", name: "Dell Latitude 5520", sku: "LAP-8821", category: "Electronics", quantity: 42, status: "IN_STOCK", location: "Warehouse A", lastUpdated: "2026-07-20" },
  { id: "2", name: "Aeron Ergonomic Chair", sku: "CHR-1029", category: "Furniture", quantity: 12, status: "ISSUED", location: "Floor 3", lastUpdated: "2026-07-22" },
  { id: "3", name: "HDMI Cable 2m", sku: "ACC-3341", category: "Accessories", quantity: 5, status: "LOW_STOCK", location: "Warehouse B", lastUpdated: "2026-07-15" },
  { id: "4", name: "Projector Epson X49", sku: "AV-9920", category: "Electronics", quantity: 2, status: "DAMAGED", location: "Repair Hub", lastUpdated: "2026-07-18" },
  { id: "5", name: "Wireless Keyboard & Mouse", sku: "ACC-5521", category: "Accessories", quantity: 30, status: "IN_STOCK", location: "Warehouse A", lastUpdated: "2026-07-23" },
];

export function InventoryPage() {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  // Calculate quick stats
  const totalItems = mockInventory.reduce((acc, item) => acc + item.quantity, 0);
  const damagedCount = mockInventory.filter(i => i.status === "DAMAGED").reduce((acc, item) => acc + item.quantity, 0);
  const issuedCount = mockInventory.filter(i => i.status === "ISSUED").reduce((acc, item) => acc + item.quantity, 0);

  // Selection handlers
  const toggleAll = () => {
    if (selectedIds.length === mockInventory.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(mockInventory.map(i => i.id));
    }
  };

  const toggleSelect = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(item => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const filteredData = mockInventory.filter(item =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
      <div className="flex flex-col gap-6 p-6 md:p-8 max-w-7xl mx-auto w-full">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">Inventory Management</h1>
            <p className="text-sm text-muted-foreground">Monitor stock levels, track damaged items, and manage asset issuance.</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="gap-2 shadow-xs">
              <Download className="h-4 w-4" />
              Export Report
            </Button>
            <Button className="gap-2 shadow-md">
              <PlusCircle className="h-4 w-4" />
              <div className="flex flex-col items-start leading-tight">
                <span className="text-xs font-bold">Add New Item</span>
                <span className="text-[10px] opacity-80 font-normal">Register item to stock</span>
              </div>
            </Button>
            {/* Receive Item Button */}
            <Button className="gap-2 shadow-md bg-emerald-600 hover:bg-emerald-700 text-white">
              <PackagePlus className="h-4 w-4" />
              <div className="flex flex-col items-start leading-tight">
                <span className="text-xs font-bold">Receive Item</span>
                <span className="text-[10px] opacity-80 font-normal">Record incoming item</span>
              </div>
            </Button>
            {/* Create Issue Button */}
            <Button className="gap-2 shadow-md bg-amber-600 hover:bg-amber-700 text-white"
              onClick={()=>{navigate('/inventory-issue')}}
            >
              <Flag className="h-4 w-4" />
              <div className="flex flex-col items-start leading-tight">
                <span className="text-xs font-bold">Issue inventory</span>
                <span className="text-[10px] opacity-80 font-normal">Issue items to event</span>
              </div>
            </Button>
          </div>
        </div>

        {/* Stat Cards Banner */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="border-border/50 shadow-xs bg-card">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Stock Items</CardTitle>
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <Package className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{totalItems}</div>
              <p className="text-xs text-muted-foreground mt-1">Across all storage spaces</p>
            </CardContent>
          </Card>

          <Card className="border-border/50 shadow-xs bg-card">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Issued Items</CardTitle>
              <div className="h-8 w-8 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-600">
                <ArrowUpRight className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{issuedCount}</div>
              <p className="text-xs text-muted-foreground mt-1">Currently checked out to users</p>
            </CardContent>
          </Card>

          <Card className="border-border/50 shadow-xs bg-card">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Damaged Stock</CardTitle>
              <div className="h-8 w-8 rounded-full bg-rose-500/10 flex items-center justify-center text-rose-600">
                <AlertTriangle className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{damagedCount}</div>
              <p className="text-xs text-muted-foreground mt-1">Requires maintenance or disposal</p>
            </CardContent>
          </Card>
        </div>

        {/* Selectable Table Section */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                  placeholder="Search by name, SKU, or category..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 bg-card"
              />
            </div>
            {selectedIds.length > 0 && (
                <div className="flex items-center gap-2 w-full sm:w-auto justify-end bg-muted/50 p-1.5 rounded-lg border">
              <span className="text-xs font-medium px-2 text-muted-foreground">
                {selectedIds.length} selected
              </span>
                  <Button size="sm" variant="destructive" className="h-7 text-xs">
                    Bulk Delete
                  </Button>
                </div>
            )}
          </div>

          <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12 text-center">
                    <Checkbox
                        checked={selectedIds.length === mockInventory.length && mockInventory.length > 0}
                        onCheckedChange={toggleAll}
                        aria-label="Select all items"
                    />
                  </TableHead>
                  <TableHead className="font-semibold">Item Name & SKU</TableHead>
                  <TableHead className="font-semibold">Category</TableHead>
                  <TableHead className="font-semibold">Quantity</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                  <TableHead className="font-semibold">Location</TableHead>
                  <TableHead className="text-right font-semibold">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="h-32 text-center text-muted-foreground">
                        No inventory items found matching your filters.
                      </TableCell>
                    </TableRow>
                ) : (
                    filteredData.map((item) => {
                      const isSelected = selectedIds.includes(item.id);
                      return (
                          <TableRow
                              key={item.id}
                              className={`hover:bg-muted/50 transition-colors ${isSelected ? "bg-muted/40" : ""}`}
                          >
                            <TableCell className="text-center">
                              <Checkbox
                                  checked={isSelected}
                                  onCheckedChange={() => toggleSelect(item.id)}
                                  aria-label={`Select ${item.name}`}
                              />
                            </TableCell>
                            <TableCell>
                              <div className="flex flex-col">
                                <span className="font-medium text-foreground">{item.name}</span>
                                <span className="text-xs text-muted-foreground">SKU: {item.sku}</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <span className="text-sm">{item.category}</span>
                            </TableCell>
                            <TableCell>
                              <span className="font-semibold text-foreground">{item.quantity}</span>
                            </TableCell>
                            <TableCell>
                              <InventoryStatusBadge status={item.status} />
                            </TableCell>
                            <TableCell>
                              <span className="text-sm text-muted-foreground">{item.location}</span>
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
                    );
                    })
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
  );
}

export default InventoryPage;

function InventoryStatusBadge({ status }: { status: InventoryItem["status"] }) {
  switch (status) {
    case "IN_STOCK":
      return (
          <Badge variant="default" className="bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20 border-emerald-500/20 gap-0.5 font-medium shadow-none px-1 py-0 text-[9px] uppercase tracking-wider">
            <CheckCircle2 className="h-2.5 w-2.5" />
            In Stock
          </Badge>
      );
    case "ISSUED":
      return (
          <Badge variant="secondary" className="bg-blue-500/10 text-blue-600 hover:bg-blue-500/20 border-blue-500/20 gap-0.5 font-medium shadow-none px-1 py-0 text-[9px] uppercase tracking-wider">
            <ArrowUpRight className="h-2.5 w-2.5" />
            Issued
          </Badge>
      );
    case "LOW_STOCK":
      return (
          <Badge variant="secondary" className="bg-amber-500/10 text-amber-600 hover:bg-amber-500/20 border-amber-500/20 gap-0.5 font-medium shadow-none px-1 py-0 text-[9px] uppercase tracking-wider">
            <AlertTriangle className="h-2.5 w-2.5" />
            Low Stock
          </Badge>
      );
    case "DAMAGED":
      return (
          <Badge variant="destructive" className="bg-rose-500/10 text-rose-600 hover:bg-rose-500/20 border-rose-500/20 gap-0.5 font-medium shadow-none px-1 py-0 text-[9px] uppercase tracking-wider">
            <AlertTriangle className="h-2.5 w-2.5" />
            Damaged
          </Badge>
      );
  }
}