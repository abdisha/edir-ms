import type {ColumnDef} from "@tanstack/react-table";
import {Eye, MapPin, MoreHorizontal, Pencil, Phone, Trash2, User} from "lucide-react";
import {Link} from "react-router";

import {Button} from "@/shared/components/ui/button.tsx";
import {Badge} from "@/shared/components/ui/badge.tsx";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu.tsx";

import type {Member} from "@/features/edir/types/members.ts";

export const columns: ColumnDef<Member>[] = [
  {
    id: "member",
    header: "Member",
    cell: ({ row }) => {
      const member = row.original;
      const fullName = `${member.firstName} ${member.lastName}`;
      const initials = `${member.firstName.charAt(0)}${member.lastName.charAt(0)}`;

      return (
        <Link
          to={`/members/${member.id}`}
          className="flex items-center gap-3 group"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold text-sm">
           {initials}
          </div>
          <div className="flex-1">
           <p className="font-medium group-hover:text-primary transition-colors">
             {fullName}
           </p>
           <p className="text-xs text-muted-foreground">
             ID: {member.id}
           </p>
          </div>
        </Link>
      );
    },
  },
  {
    accessorKey: "age",
    header: "Age",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <User className="h-4 w-4 text-muted-foreground" />
        <span>{row.original.age} years</span>
      </div>
    ),
  },
  {
    accessorKey: "phoneNumber",
    header: "Phone",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Phone className="h-4 w-4 text-muted-foreground" />
        <span>{row.original.phoneNumber}</span>
      </div>
    ),
  },
  {
    id: "location",
    header: "Location",
    cell: ({ row }) => {
      const member = row.original;
      return (
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-muted-foreground" />
          <div>
           <p className="font-medium text-sm">{member.address?.subcity}</p>
           <p className="text-xs text-muted-foreground">
             Woreda {member.address?.woreda}
           </p>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "memberStatus",
    header: "Status",
    cell: ({ row }) => (
      <Badge
        variant={
          row.original.memberStatus === "ACTIVE" ? "default" : "secondary"
        }
      >
        {row.original.memberStatus}
      </Badge>
    ),
  },
  {
    id: "actions",
    header: "",
    cell: ({ row }) => {
      const member = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
           <Button
             variant="ghost"
             size="icon"
             className="h-8 w-8"
             aria-label="More actions"
           >
             <MoreHorizontal className="h-4 w-4" />
           </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
           <DropdownMenuItem asChild>
             <Link
               to={`/members/${member.id}`}
               className="flex items-center cursor-pointer"
             >
               <Eye className="mr-2 h-4 w-4" />
               <span>View Details</span>
             </Link>
           </DropdownMenuItem>
           <DropdownMenuItem asChild>
             <Link
               to={`/members/${member.id}/edit`}
               className="flex items-center cursor-pointer"
             >
               <Pencil className="mr-2 h-4 w-4" />
               <span>Edit Member</span>
             </Link>
           </DropdownMenuItem>
           <DropdownMenuSeparator />
           <DropdownMenuItem
             variant="destructive"
             onClick={() => {
               console.log("delete", member.id);
             }}
           >
             <Trash2 className="mr-2 h-4 w-4" />
             <span>Delete</span>
           </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];