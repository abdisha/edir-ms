import {
  CalendarDays,
  ChevronRight,
  ClipboardList,
  MapPin,
  Users,
} from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";

import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import { Skeleton } from "@/shared/components/ui/skeleton";

export interface MeetingEvent {
    id: string;
    meetingName: string;
    agenda: string;
    location: string;
    eventDate: string;
}

interface MeetingEventTableProps {
  data: MeetingEvent[];
  loading?: boolean;
  onSelect: (meetingId: string) => void;
}

const MeetingEventTable = ({
  data,
  loading = false,
  onSelect,
}: MeetingEventTableProps) => {
  return (
    <Card className="shadow-sm">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10">
            <Users className="h-5 w-5 text-primary" />
          </div>

          <div>
            <CardTitle>Meeting Events</CardTitle>
            <CardDescription>
              Browse all scheduled Edir meetings. Click a meeting name to view
              details, agenda, attendance and meeting history.
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Meeting</TableHead>

              <TableHead>Date</TableHead>

              <TableHead>Location</TableHead>

              <TableHead>Agenda</TableHead>

              <TableHead className="w-15" />
            </TableRow>
          </TableHeader>

          <TableBody>
            {loading ? (
              Array.from({ length: 5 }).map((_, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Skeleton className="h-10 w-10 rounded-lg" />

                      <div className="space-y-2">
                        <Skeleton className="h-4 w-40" />

                        <Skeleton className="h-3 w-24" />
                      </div>
                    </div>
                  </TableCell>

                  <TableCell>
                    <Skeleton className="h-4 w-28" />
                  </TableCell>

                  <TableCell>
                    <Skeleton className="h-4 w-32" />
                  </TableCell>

                  <TableCell>
                    <Skeleton className="h-4 w-52" />
                  </TableCell>

                  <TableCell>
                    <Skeleton className="h-8 w-8 rounded-md" />
                  </TableCell>
                </TableRow>
              ))
            ) : !data || data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-64">
                  <div className="flex flex-col items-center justify-center gap-4">
                    <div className="rounded-full bg-primary/10 p-5">
                      <ClipboardList className="h-8 w-8 text-primary" />
                    </div>

                    <div className="text-center">
                      <h3 className="font-semibold">No Meeting Events</h3>

                      <p className="mt-2 text-sm text-muted-foreground max-w-sm">
                        No meetings have been scheduled yet. Create a meeting
                        event to organize discussions with Edir members.
                      </p>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              data.map((meeting) => (
                <TableRow
                  key={meeting.id}
                  className="cursor-pointer transition-colors hover:bg-muted/40"
                  onClick={() => onSelect(meeting.id)}
                >
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="rounded-lg bg-primary/10 p-2">
                        <Users className="h-5 w-5 text-primary" />
                      </div>

                      <div>
                        <Button
                          variant="link"
                          className="h-auto p-0 font-semibold"
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelect(meeting.id);
                          }}
                        >
                          {meeting.meetingName}
                        </Button>

                        <p className="text-xs text-muted-foreground">
                          Meeting Event
                        </p>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center gap-2">
                      <CalendarDays className="h-4 w-4 text-muted-foreground" />
                      {new Date(meeting.eventDate).toLocaleDateString()}
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      {meeting.location}
                    </div>
                  </TableCell>

                  <TableCell>
                    <Badge
                      variant="secondary"
                      className="max-w-65 truncate"
                    >
                      {meeting.agenda}
                    </Badge>
                  </TableCell>

                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelect(meeting.id);
                      }}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default MeetingEventTable;