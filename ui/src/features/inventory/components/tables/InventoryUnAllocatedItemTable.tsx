import {type ColumnDef, flexRender, getCoreRowModel, useReactTable,} from "@tanstack/react-table";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/shared/components/ui/table.tsx";
import {Button} from "@/shared/components/ui/button.tsx";
import {Badge} from "@/shared/components/ui/badge.tsx";
import {Boxes, Inbox, Loader2, PackagePlus} from "lucide-react";

export type InventoryItem = {
  itemId: string;
  itemName: string;
  itemStatus: "ACTIVE" | "INACTIVE";
  quantity: number;
  allocated: number;
  itemCode: string;
};

interface Props {
  data: InventoryItem[];
  isLoading?: boolean;
  onAllocate: (item: InventoryItem) => void;
  onTransfer?: (item: InventoryItem) => void;
}

const InventoryUnAllocatedItemTable = ({ data, isLoading, onAllocate }: Props) => {
  const columns: ColumnDef<InventoryItem>[] = [
    {
      accessorKey: "itemName",
      header: "Item",
      cell: ({ row }) => (
        <div className="flex flex-col">
          <span className="font-medium">{row.original.itemName}</span>
          <span className="text-xs text-muted-foreground">{row.original.itemCode}</span>
        </div>
      ),
    },
    {
      accessorKey: "itemStatus",
      header: "Status",
      cell: ({ row }) => (
        <Badge variant={row.original.itemStatus === "ACTIVE" ? "default" : "secondary"}>
          {row.original.itemStatus}
        </Badge>
      ),
    },
    { accessorKey: "quantity", header: "Total Qty" },
    { accessorKey: "allocated", header: "Allocated" },
    {
      id: "unallocated",
      header: "Available",
      cell: ({ row }) => row.original.quantity - row.original.allocated,
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex items-center justify-end">
          <Button
            size="sm"
            className="h-8 px-2 lg:px-3"
            onClick={() => onAllocate(row.original)}
          >
            <PackagePlus className="mr-2 h-3.5 w-3.5" />
            Allocate
          </Button>
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="space-y-4 w-full">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <Boxes className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold tracking-tight">Unallocated Inventory</h2>
        </div>
        <p className="text-sm text-muted-foreground">
          Manage items that are currently in stock but have not yet been assigned to a specific department or member.
        </p>
      </div>
      <div className="rounded-md border bg-card">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  <div className="flex items-center justify-center">
                    <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                  </div>
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  <div className="rounded-md border border-dashed p-8 text-center text-muted-foreground">
                    <div className="flex justify-center items-center flex-col-2 gap-2 mb-4">
                      <Inbox/> No unallocated items found.
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default InventoryUnAllocatedItemTable;