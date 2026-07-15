import {flexRender, getCoreRowModel, useReactTable,} from "@tanstack/react-table";


import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/shared/components/ui/table.tsx";


import {columns} from "./columns.tsx";
import type {Member} from "@/features/edir/types/members.ts";


interface Props {

    data: Member[];

}



export function MemberTable({
                                data
                            }:Props){



    const table =
        useReactTable({

            data,

            columns,

            getCoreRowModel:
                getCoreRowModel(),

        });




    return (

        <div
            className="
rounded-xl
border
overflow-hidden
"
        >


            <Table>


                <TableHeader>


                    {
                        table.getHeaderGroups()
                            .map(group=>(


                                <TableRow
                                    key={group.id}
                                >


                                    {
                                        group.headers.map(header=>(


                                            <TableHead
                                                key={header.id}
                                                className="h-12"
                                            >

                                                {
                                                    flexRender(
                                                        header.column.columnDef.header,
                                                        header.getContext()
                                                    )
                                                }


                                            </TableHead>


                                        ))

                                    }


                                </TableRow>


                            ))

                    }


                </TableHeader>





                <TableBody>


                    {
                        table.getRowModel()
                            .rows.length ?


                            table.getRowModel()
                                .rows
                                .map(row=>(


                                    <TableRow
                                        key={row.id}
                                        className="
hover:bg-muted/50
transition-colors
"
                                    >


                                        {
                                            row.getVisibleCells()
                                                .map(cell=>(


                                                    <TableCell
                                                        key={cell.id}
                                                        className="py-4"
                                                    >


                                                        {
                                                            flexRender(
                                                                cell.column.columnDef.cell,
                                                                cell.getContext()
                                                            )
                                                        }


                                                    </TableCell>


                                                ))

                                        }


                                    </TableRow>


                                ))


                            :

                            <TableRow>

                                <TableCell
                                    colSpan={columns.length}
                                    className="
h-32
text-center
text-muted-foreground
"
                                >

                                    No members found

                                </TableCell>

                            </TableRow>


                    }


                </TableBody>


            </Table>


        </div>

    )

}