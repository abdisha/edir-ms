import {useState} from "react";
import {Calendar, CheckCircle2, Clock, Plus, X} from "lucide-react";
import {Button} from "@/shared/components/ui/button";
import {Card, CardContent} from "@/shared/components/ui/card";
import {Badge} from "@/shared/components/ui/badge";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/shared/components/ui/table";
import {StatCard} from "@/features/contribution/components/StatCard";
import {Separator} from "@/shared/components/ui/separator";
import {useNavigate} from "react-router";

interface FuneralEvent {
  id: string;
  deceasedName: string;
  eventDate: string;
  location: string;
  status: "current" | "closed";
  attendees: number;
  description?: string;
  createdDate: string;
}

// Mock data - replace with API call
const mockEvents: FuneralEvent[] = [
  {
    id: "1",
    deceasedName: "Abebe Kebede",
    eventDate: "2024-07-25",
    location: "Addis Ababa, Ethiopia",
    status: "current",
    attendees: 150,
    description: "Memorial service for beloved community member",
    createdDate: "2024-07-20",
  },
  {
    id: "2",
    deceasedName: "Almaz Tadesse",
    eventDate: "2024-07-28",
    location: "Dire Dawa, Ethiopia",
    status: "current",
    attendees: 89,
    description: "Funeral ceremony",
    createdDate: "2024-07-21",
  },
  {
    id: "3",
    deceasedName: "Getnet Assefa",
    eventDate: "2024-07-15",
    location: "Adama, Ethiopia",
    status: "closed",
    attendees: 120,
    description: "Completed funeral service",
    createdDate: "2024-07-10",
  },
  {
    id: "4",
    deceasedName: "Fikre Solomon",
    eventDate: "2024-07-12",
    location: "Hawassa, Ethiopia",
    status: "closed",
    attendees: 95,
    description: "Memorial completed",
    createdDate: "2024-07-08",
  },
];

type TabType = "all" | "current" | "closed";

const FuneralEventPage = () => {
  const [events] = useState<FuneralEvent[]>(mockEvents);
  const [activeTab, setActiveTab] = useState<TabType>("all");
 const navigate = useNavigate();
  const totalEvents = events.length;
  const currentEvents = events.filter((e) => e.status === "current").length;
  const closedEvents = events.filter((e) => e.status === "closed").length;

  const filteredEvents =
    activeTab === "all"
      ? events
      : events.filter((e) => e.status === activeTab);

  const getStatusColor = (status: "current" | "closed") => {
    return status === "current"
      ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
      : "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400";
  };

  const getStatusIcon = (status: "current" | "closed") => {
    return status === "current" ? (
      <Clock className="h-4 w-4" />
    ) : (
      <CheckCircle2 className="h-4 w-4" />
    );
  };

  return (
    <div className="space-y-6">
      {/* Dashboard Banner */}
      <Card className="overflow-hidden">
        <div className="bg-gradient-to-r from-primary/10 to-primary/5">
          <CardContent className="space-y-6 py-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div className="space-y-3">
                <h1 className="text-3xl font-bold">Funeral Events</h1>
                <p className="max-w-3xl text-muted-foreground">
                  Manage and organize funeral ceremonies and memorial services
                </p>
              </div>
              <Button size="lg" className="gap-2">
                <Plus className="h-4 w-4" />
                Create Event
              </Button>
            </div>

            <Separator />

            {/* Stats Grid */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <StatCard
                icon={<Calendar className="h-5 w-5" />}
                title="Total Events"
                value={totalEvents.toString()}
              />
              <StatCard
                icon={<Clock className="h-5 w-5" />}
                title="Current Events"
                value={currentEvents.toString()}
              />
              <StatCard
                icon={<CheckCircle2 className="h-5 w-5" />}
                title="Closed Events"
                value={closedEvents.toString()}
              />
            </div>
          </CardContent>
        </div>
      </Card>

      {/* Events Table Card */}
      <Card>
        <CardContent className="p-6 space-y-4">
          {/* Tab Buttons */}
          <div className="flex gap-2 border-b pb-4">
            {[
              { key: "all" as TabType, label: "All Events" },
              { key: "current" as TabType, label: "Current" },
              { key: "closed" as TabType, label: "Closed" },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  activeTab === tab.key
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Events Table */}
          <div className="w-full overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-b hover:bg-transparent">
                  <TableHead className="h-12 px-6 font-semibold text-foreground">
                    Deceased Name
                  </TableHead>
                  <TableHead className="h-12 px-6 font-semibold text-foreground">
                    Location
                  </TableHead>
                  <TableHead className="h-12 px-6 font-semibold text-foreground">
                    Event Date
                  </TableHead>
                  <TableHead className="h-12 px-6 font-semibold text-foreground">
                    Status
                  </TableHead>
                  <TableHead className="h-12 px-6 font-semibold text-foreground">
                    Attendees
                  </TableHead>
                  <TableHead className="h-12 px-6 font-semibold text-foreground">
                    Description
                  </TableHead>
                  <TableHead className="h-12 px-6 font-semibold text-foreground text-right">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEvents.length > 0 ? (
                  filteredEvents.map((event) => (
                    <TableRow
                      key={event.id}
                      className="border-b hover:bg-muted/30 transition-colors duration-150"
                    >
                      <TableCell className="px-6 py-4 font-medium">
                        {event.deceasedName}
                      </TableCell>
                      <TableCell className="px-6 py-4 text-sm">
                        {event.location}
                      </TableCell>
                      <TableCell className="px-6 py-4 text-sm">
                        {new Date(event.eventDate).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </TableCell>
                      <TableCell className="px-6 py-4">
                        <Badge
                          className={`gap-2 px-3 py-1 font-medium ${getStatusColor(
                            event.status
                          )}`}
                          variant="secondary"
                        >
                          {getStatusIcon(event.status)}
                          {event.status === "current" ? "Current" : "Closed"}
                        </Badge>
                      </TableCell>
                      <TableCell className="px-6 py-4">
                        <span className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-primary/10 text-primary font-medium text-sm">
                          {event.attendees}
                        </span>
                      </TableCell>
                      <TableCell className="px-6 py-4 text-sm text-muted-foreground max-w-xs truncate">
                        {event.description || "-"}
                      </TableCell>
                      <TableCell className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-primary hover:text-primary hover:bg-primary/10"
                            onClick={()=>navigate('/funeral-event-detail')}
                          >
                            View
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-destructive hover:text-destructive hover:bg-destructive/10"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={7}
                      className="h-32 text-center text-muted-foreground"
                    >
                      <div className="flex flex-col items-center justify-center gap-2">
                        <Calendar className="h-8 w-8 text-muted-foreground/50" />
                        <p className="text-base font-medium">No events found</p>
                        <p className="text-sm">
                          {activeTab !== "all"
                            ? `No ${activeTab} events yet`
                            : "Create your first funeral event"}
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

export default FuneralEventPage;