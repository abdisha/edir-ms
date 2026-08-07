import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/shared/components/ui/table";
import {Button} from "@/shared/components/ui/button";
import {Edit, MapPin, Store as StoreIcon} from "lucide-react";
import type {Member} from "@/shared/types.ts";

interface Store {
  id: string;
  name: string;
  location: string;
  ownerId: string;
  ownerName?: string;
}

interface StoreTableProps {
  data: Store[];
  members: Member[];
  onEdit: (store: Store) => void;
}

const StoreTable = ({ members, data, onEdit }: StoreTableProps) => {
    return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[250px]">Store Name</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Owner</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((store) => (
            <TableRow key={store.id}>
              <TableCell className="font-medium">
                <div className="flex items-center gap-2">
                  <StoreIcon className="h-4 w-4 text-muted-foreground" />
                  {store.name}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  {store.location}
                </div>
              </TableCell>
              <TableCell>
                {members.find((member) => member.memberId === store.ownerId)?.fullName}
                <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
                {  store.ownerId.substring(0, 8)}...
                </div>
              </TableCell>
              <TableCell className="text-right">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onEdit(store)}
                  className="flex items-center gap-2 ml-auto"
                >
                  <Edit className="h-4 w-4" />
                  Edit
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default StoreTable;