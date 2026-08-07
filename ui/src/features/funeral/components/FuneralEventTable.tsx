import {CalendarDays, ChevronRight, FileText, HeartHandshake, Wallet} from "lucide-react";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/shared/components/ui/table";

import type {FuneralEvent} from "@/features/funeral/types/types";
import {Badge} from "@/shared/components/ui/badge";
import {Button} from "@/shared/components/ui/button";

interface FuneralEventTableProps {
    funeralEvents: FuneralEvent[];
    onSelect: (funeralId: string) => void;
}

export default function FuneralEventTable({funeralEvents,
                                              onSelect,
                                          }: FuneralEventTableProps) {

    if (funeralEvents.length === 0) {
        return (
            <div className="flex h-64 flex-col items-center justify-center gap-4 rounded-xl border border-dashed bg-muted/20">
                <div className="rounded-full bg-primary/10 p-4">
                    <HeartHandshake className="h-8 w-8 text-primary" />
                </div>
                <div className="text-center">
                    <h3 className="font-semibold">No Funeral Events</h3>

                    <p className="mt-1 text-sm text-muted-foreground">
                        Funeral events will appear here once they are created.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="overflow-hidden rounded-xl border bg-background">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[320px]">
                            Funeral Event
                        </TableHead>
                        <TableHead>
                            Funeral Date
                        </TableHead>
                        <TableHead>
                            Deceased Person
                        </TableHead>
                        <TableHead>
                            Relationship
                        </TableHead>
                        <TableHead className="text-right">
                            Payout
                        </TableHead>
                        <TableHead>
                            Status
                        </TableHead>
                        <TableHead className="w-20" />
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {funeralEvents.map((event) => (
                        <TableRow
                            key={event.funeralId}
                            className="cursor-pointer transition-colors hover:bg-muted/40"
                            onClick={() => onSelect(event.funeralId)}
                        >
                            <TableCell>
                                <div className="flex items-center gap-3">
                                    <div className="rounded-lg bg-primary/10 p-2">
                                        <FileText className="h-4 w-4 text-primary" />
                                    </div>
                                    <div>
                                        <p className="font-medium">
                                            {event.funeralName}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            {event.funeralId.slice(0, 8)}...
                                        </p>
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="flex items-center gap-2">
                                    <CalendarDays className="h-4 w-4 text-muted-foreground" />
                                    {new Date(
                                        event.funeralDate
                                    ).toLocaleDateString()}
                                </div>
                            </TableCell>
                            <TableCell>
                                {event.deceasedPersonFullName}
                            </TableCell>
                            <TableCell>
                                <Badge variant="secondary">
                                    {event.relationShip?.replaceAll("_", " ")}
                                </Badge>
                            </TableCell>
                            <TableCell className="text-right font-medium">
                                <div className="flex items-center justify-end gap-2">
                                    <Wallet className="h-4 w-4 text-muted-foreground" />
                                    ETB{" "}
                                    {event.payout.toLocaleString()}
                                </div>
                            </TableCell>
                            <TableCell>
                                {event.isClose ? (
                                    <Badge
                                        variant="secondary"
                                        className="bg-green-100 text-green-700 hover:bg-green-100 dark:bg-green-900/20 dark:text-green-400"
                                    >
                                        Closed
                                    </Badge>
                                ) : (
                                    <Badge>
                                        Active
                                    </Badge>
                                )}
                            </TableCell>
                            <TableCell>
                                <Button
                                    aria-label={'view-detail'}
                                    variant="ghost"
                                    size="icon"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onSelect(event.funeralId);
                                    }}
                                >
                                    <ChevronRight className="h-4 w-4" />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}