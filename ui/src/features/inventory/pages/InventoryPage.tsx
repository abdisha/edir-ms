import {useState} from "react";
import {Package, Package2, Plus} from "lucide-react";
import {Button} from "@/shared/components/ui/button";
import {Card, CardContent} from "@/shared/components/ui/card";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/shared/components/ui/table";
import {StatCard} from "@/features/contribution/components/StatCard";
import {Separator} from "@/shared/components/ui/separator";

interface InventoryItem {
  id: string;
  name: string;
  category: "funeral" | "general";
  quantity: number;
  description?: string;
  dateAdded: string;
}

// Mock data - replace with API call
const mockItems: InventoryItem[] = [
  {
    id: "1",
    name: "Burial Cloth",
    category: "funeral",
    quantity: 5,
    description: "Traditional white burial cloth",
    dateAdded: "2024-07-20",
  },
  {
    id: "2",
    name: "Candles",
    category: "funeral",
    quantity: 12,
    description: "Ceremonial candles",
    dateAdded: "2024-07-19",
  },
  {
    id: "3",
    name: "Incense",
    category: "funeral",
    quantity: 8,
    description: "Funeral incense sticks",
    dateAdded: "2024-07-18",
  },
  {
    id: "4",
    name: "Flowers",
    category: "general",
    quantity: 20,
    description: "Various flowers",
    dateAdded: "2024-07-17",
  },
];

const InventoryPage = () => {
  const [items] = useState<InventoryItem[]>(mockItems);

  const totalItems = items.length;
  const funeralItems = items.filter((item) => item.category === "funeral").length;
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="space-y-6">
      {/* Dashboard Banner */}
      <Card className="overflow-hidden">
        <div className="bg-primary/5">
          <CardContent className="space-y-6 py-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div className="space-y-3">
                <h1 className="text-3xl font-bold">Inventory Management</h1>
                <p className="max-w-3xl text-muted-foreground">
                  Track and manage all items in your inventory
                </p>
              </div>
              <Button size="lg">
                <Plus className="mr-2 h-4 w-4" />
                Add Item
              </Button>
            </div>

            <Separator />

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <StatCard
                icon={<Package className="h-5 w-5" />}
                title="Total Items"
                value={totalItems.toString()}
              />
              <StatCard
                icon={<Package2 className="h-5 w-5" />}
                title="Funeral Items"
                value={funeralItems.toString()}
              />
              <StatCard
                icon={<Package className="h-5 w-5" />}
                title="Total Quantity"
                value={totalQuantity.toString()}
              />
            </div>
          </CardContent>
        </div>
      </Card>

      {/* Items Table */}
      <Card>
        <CardContent className="p-6">
          <div className="w-full overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-b hover:bg-transparent">
                  <TableHead className="h-12 px-6 font-semibold text-foreground">
                    Name
                  </TableHead>
                  <TableHead className="h-12 px-6 font-semibold text-foreground">
                    Category
                  </TableHead>
                  <TableHead className="h-12 px-6 font-semibold text-foreground">
                    Quantity
                  </TableHead>
                  <TableHead className="h-12 px-6 font-semibold text-foreground">
                    Description
                  </TableHead>
                  <TableHead className="h-12 px-6 font-semibold text-foreground">
                    Date Added
                  </TableHead>
                  <TableHead className="h-12 px-6 font-semibold text-foreground text-right">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.length > 0 ? (
                  items.map((item) => (
                    <TableRow
                      key={item.id}
                      className="border-b hover:bg-muted/30 transition-colors duration-150"
                    >
                      <TableCell className="px-6 py-4 font-medium">
                        {item.name}
                      </TableCell>
                      <TableCell className="px-6 py-4">
                        <span
                          className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${
                            item.category === "funeral"
                              ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                              : "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                          }`}
                        >
                          {item.category === "funeral" ? "Funeral" : "General"}
                        </span>
                      </TableCell>
                      <TableCell className="px-6 py-4">{item.quantity}</TableCell>
                      <TableCell className="px-6 py-4 text-muted-foreground">
                        {item.description || "-"}
                      </TableCell>
                      <TableCell className="px-6 py-4 text-sm">
                        {new Date(item.dateAdded).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="px-6 py-4 text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-primary hover:text-primary hover:bg-primary/10"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="h-32 text-center text-muted-foreground"
                    >
                      <div className="flex flex-col items-center justify-center gap-2">
                        <p className="text-base font-medium">
                          No items in inventory
                        </p>
                        <p className="text-sm">
                          Get started by adding your first item
                        </p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InventoryPage;