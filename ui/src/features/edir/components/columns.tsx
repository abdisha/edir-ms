import type {ColumnDef} from "@tanstack/react-table";
import {Eye, MapPin, MoreHorizontal, Pencil, Phone, Trash2, User,} from "lucide-react";

import {Link} from "react-router";


import {Button} from "@/shared/components/ui/button.tsx";

import {Badge} from "@/shared/components/ui/badge.tsx";


import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu.tsx";
import type {Member} from "@/features/edir/types/members.ts";


export const columns: ColumnDef<Member>[] = [

    {
        id: "member",


        header: "Member",


        cell: ({ row }) => {


            const member = row.original;


            const fullName =
                `${member.firstName} ${member.lastName}`;


            const initials =
                `${member.firstName.charAt(0)}
        ${member.lastName.charAt(0)}`;



            return (

                <Link
                    to={`/members/${member.id}`}
                    className="
          flex items-center gap-3
          group
          "
                >


                    <div
                        className="
            flex h-11 w-11
            items-center justify-center
            rounded-full
            bg-primary/10
            text-primary
            font-semibold
            "
                    >

                        {initials}

                    </div>



                    <div>


                        <p
                            className="
              font-medium
              group-hover:text-primary
              transition-colors
              "
                        >

                            {fullName}

                        </p>



                        <p className="text-xs text-muted-foreground">

                            Member ID: {member.id}

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

                <User
                    className="
          h-4 w-4
          text-muted-foreground
          "
                />

                {row.original.age}

            </div>

        ),
    },




    {
        accessorKey:"phoneNumber",

        header:"Phone",

        cell:({row})=>(

            <div className="flex items-center gap-2">

                <Phone
                    className="
          h-4 w-4
          text-muted-foreground
          "
                />

                {row.original.phoneNumber}

            </div>

        )
    },





    {
        id:"location",

        header:"Location",


        cell:({row})=>{


            const address =
                row.original.address;


            return (

                <div className="flex items-center gap-2">


                    <MapPin
                        className="
            h-4 w-4
            text-muted-foreground
            "
                    />



                    <div>


                        <p className="font-medium text-sm">

                            {address.subcity}

                        </p>


                        <p className="text-xs text-muted-foreground">

                            Woreda {address.woreda}

                        </p>


                    </div>


                </div>

            )

        }

    },





    {
        accessorKey:"status",

        header:"Status",

        cell:({row})=>(


            <Badge
                variant={
                    row.original.status==="ACTIVE"
                        ? "default"
                        : "secondary"
                }
            >

                {row.original.status}

            </Badge>

        )
    },





    {

        id:"actions",

        header:"",


        cell:({row})=>{


            const member=row.original;


            return (

                <DropdownMenu>


                    <DropdownMenuTrigger>
                        <Button
                            variant="ghost"
                            size="icon"
                            aria-label={'More Actions'}
                        >
                            <MoreHorizontal className="h-4 w-4"
                            />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        align="end"
                    >
                       <DropdownMenuItem>
      <Link
                                to={`/members/${member.id}`}
                            >

                                <Eye
                                    className="
                  mr-2 h-4 w-4
                  "
                                />

                                View


                            </Link>


                        </DropdownMenuItem>
                        <DropdownMenuItem >


                            <Link
                                to={`/members/${member.id}/edit`}
                            >

                                <Pencil
                                    className="
                  mr-2 h-4 w-4
                  "
                                />

                                Edit


                            </Link>


                        </DropdownMenuItem>






                        <DropdownMenuItem
                            className="
              text-destructive
              "
                            onClick={()=>{

                                console.log(
                                    "delete",
                                    member.id
                                )

                            }}
                        >


                            <Trash2
                                className="
                mr-2 h-4 w-4
                "
                            />


                            Delete


                        </DropdownMenuItem>



                    </DropdownMenuContent>



                </DropdownMenu>

            )

        }

    }

];