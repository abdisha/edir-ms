import {
  AlertCircle,
  ArrowLeft,
  Calendar,
  CheckCircle2,
  Clock,
  Download,
  Edit,
  Mail,
  MapPin,
  MoreVertical,
  Package,
  Phone,
  Share2,
  Users,
} from "lucide-react";
import {useState} from "react";
import {Button} from "@/shared/components/ui/button";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/shared/components/ui/card";
import {Badge} from "@/shared/components/ui/badge";
import {Separator} from "@/shared/components/ui/separator";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/shared/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";

interface IssuedItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  issuedDate: string;
  issuedBy: string;
  status: "returned" | "pending";
}

interface FuneralEventDetail {
  id: string;
  deceasedName: string;
  deceasedAge?: number;
  eventDate: string;
  eventTime: string;
  location: string;
  coordinates?: { lat: number; lng: number };
  status: "current" | "closed";
  totalAttendees: number;
  organizer: {
    name: string;
    phone: string;
    email: string;
    role: string;
  };
  description: string;
  notes?: string;
  createdDate: string;
  closedDate?: string;
  issuedItems: IssuedItem[];
}

// Mock data - replace with API call
const mockEventDetail: FuneralEventDetail = {
  id: "1",
  deceasedName: "Abebe Kebede",
  deceasedAge: 78,
  eventDate: "2024-07-25",
  eventTime: "09:00 AM",
  location: "Addis Ababa Community Center, Piazza",
  coordinates: { lat: 9.0320, lng: 38.7469 },
  status: "current",
  totalAttendees: 150,
  organizer: {
    name: "Tesfaye Hailu",
    phone: "+251912345678",
    email: "tesfaye@example.com",
    role: "Event Coordinator",
  },
  description:
    "A ceremonial gathering to honor the life and memory of Abebe Kebede, a respected member of our community. The event includes traditional prayers, eulogies, and a reception.",
  notes:
    "Special dietary requirements: vegetarian meals for 20 guests. Please ensure adequate seating and shade.",
  createdDate: "2024-07-20",
  issuedItems: [
    {
      id: "i1",
      name: "Burial Cloth",
      category: "Funeral Supplies",
      quantity: 2,
      issuedDate: "2024-07-24",
      issuedBy: "Abay Tekle",
      status: "pending",
    },
    {
      id: "i2",
      name: "Ceremonial Candles",
      category: "Funeral Supplies",
      quantity: 24,
      issuedDate: "2024-07-24",
      issuedBy: "Abay Tekle",
      status: "pending",
    },
    {
      id: "i3",
      name: "Incense Sticks",
      category: "Funeral Supplies",
      quantity: 12,
      issuedDate: "2024-07-23",
      issuedBy: "Abay Tekle",
      status: "returned",
    },
    {
      id: "i4",
      name: "Flowers Arrangement",
      category: "Decorations",
      quantity: 5,
      issuedDate: "2024-07-24",
      issuedBy: "Abay Tekle",
      status: "pending",
    },
    {
      id: "i5",
      name: "Sound System",
      category: "Equipment",
      quantity: 1,
      issuedDate: "2024-07-23",
      issuedBy: "Abay Tekle",
      status: "returned",
    },
  ],
};

export default function FuneralEventDetailPage() {
  const [event] = useState<FuneralEventDetail>(mockEventDetail);

  const pendingItems = event.issuedItems.filter((item) => item.status === "pending").length;
  const returnedItems = event.issuedItems.filter((item) => item.status === "returned").length;

  return (
    <div className="space-y-6">
      {/* Header with Back Button */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold">{event.deceasedName}</h1>
            <p className="text-muted-foreground">
              Funeral Event #{event.id} • Created {new Date(event.createdDate).toLocaleDateString()}
            </p>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="outline" size="icon">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem className="gap-2">
              <Edit className="h-4 w-4" />
              Edit Event
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-2">
              <Download className="h-4 w-4" />
              Export Report
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-2">
              <Share2 className="h-4 w-4" />
              Share
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 text-destructive">
              <AlertCircle className="h-4 w-4" />
              Cancel Event
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Main Status Card */}
      <Card className="overflow-hidden border-2">
        <div className={`h-1 ${event.status === "current" ? "bg-green-500" : "bg-gray-500"}`} />
        <CardContent className="p-6">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Badge
                  className={`gap-2 px-4 py-2 font-semibold text-base ${
                    event.status === "current"
                      ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                      : "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400"
                  }`}
                >
                  {event.status === "current" ? (
                    <Clock className="h-4 w-4" />
                  ) : (
                    <CheckCircle2 className="h-4 w-4" />
                  )}
                  {event.status === "current" ? "Currently Active" : "Closed"}
                </Badge>
              </div>
              <p className="text-muted-foreground max-w-2xl">
                {event.description}
              </p>
            </div>
            <Button size="lg" className="gap-2">
              <Edit className="h-4 w-4" />
              Update Details
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Event Information Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Event Date & Time */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Calendar className="h-4 w-4 text-primary" />
              Event Schedule
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <p className="text-sm text-muted-foreground">Date</p>
              <p className="font-semibold">
                {new Date(event.eventDate).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Time</p>
              <p className="font-semibold">{event.eventTime}</p>
            </div>
          </CardContent>
        </Card>

        {/* Location */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <MapPin className="h-4 w-4 text-primary" />
              Venue Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-semibold">{event.location}</p>
            {event.coordinates && (
              <p className="text-sm text-muted-foreground mt-2">
                Coordinates: {event.coordinates.lat}, {event.coordinates.lng}
              </p>
            )}
          </CardContent>
        </Card>

        {/* Attendees */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Users className="h-4 w-4 text-primary" />
              Attendance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-3xl font-bold text-primary">{event.totalAttendees}</p>
              <p className="text-sm text-muted-foreground">Expected attendees</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Deceased Information */}
      <Card>
        <CardHeader>
          <CardTitle>Deceased Information</CardTitle>
          <CardDescription>Personal details of the departed</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <p className="text-sm text-muted-foreground">Full Name</p>
              <p className="font-semibold text-lg">{event.deceasedName}</p>
            </div>
            {event.deceasedAge && (
              <div>
                <p className="text-sm text-muted-foreground">Age</p>
                <p className="font-semibold text-lg">{event.deceasedAge} years</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Organizer Information */}
      <Card>
        <CardHeader>
          <CardTitle>Event Organizer</CardTitle>
          <CardDescription>Point of contact for this event</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div>
              <p className="text-sm text-muted-foreground">Name</p>
              <p className="font-semibold">{event.organizer.name}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Role</p>
              <Badge variant="secondary">{event.organizer.role}</Badge>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Contact</p>
              <div className="space-y-1 mt-1">
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <a href={`tel:${event.organizer.phone}`} className="text-primary hover:underline">
                    {event.organizer.phone}
                  </a>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <a href={`mailto:${event.organizer.email}`} className="text-primary hover:underline">
                    {event.organizer.email}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notes Section */}
      {event.notes && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-amber-500" />
              Important Notes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-relaxed">{event.notes}</p>
          </CardContent>
        </Card>
      )}

      {/* Issued Items Summary */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Package className="h-4 w-4 text-primary" />
              Items Issued
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-muted-foreground">Total Items</p>
                <p className="text-3xl font-bold">{event.issuedItems.length}</p>
              </div>
              <Separator />
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Pending Return</span>
                  <Badge variant="destructive">{pendingItems}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Returned</span>
                  <Badge variant="secondary">{returnedItems}</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Calendar className="h-4 w-4 text-primary" />
              Timeline
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-sm text-muted-foreground">Event Created</p>
              <p className="font-semibold">
                {new Date(event.createdDate).toLocaleDateString()}
              </p>
            </div>
            {event.closedDate && (
              <div>
                <p className="text-sm text-muted-foreground">Event Closed</p>
                <p className="font-semibold">
                  {new Date(event.closedDate).toLocaleDateString()}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Issued Items Table */}
      <Card>
        <CardHeader>
          <CardTitle>Issued Items</CardTitle>
          <CardDescription>All items issued for this funeral event</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="w-full overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-b hover:bg-transparent">
                  <TableHead className="h-12 px-4 font-semibold text-foreground">Item Name</TableHead>
                  <TableHead className="h-12 px-4 font-semibold text-foreground">Category</TableHead>
                  <TableHead className="h-12 px-4 font-semibold text-foreground text-center">Qty</TableHead>
                  <TableHead className="h-12 px-4 font-semibold text-foreground">Issued By</TableHead>
                  <TableHead className="h-12 px-4 font-semibold text-foreground">Issue Date</TableHead>
                  <TableHead className="h-12 px-4 font-semibold text-foreground">Status</TableHead>
                  <TableHead className="h-12 px-4 font-semibold text-foreground text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {event.issuedItems.map((item) => (
                  <TableRow key={item.id} className="border-b hover:bg-muted/30 transition-colors">
                    <TableCell className="px-4 py-3 font-medium">{item.name}</TableCell>
                    <TableCell className="px-4 py-3">
                      <Badge variant="outline">{item.category}</Badge>
                    </TableCell>
                    <TableCell className="px-4 py-3 text-center font-semibold">
                      {item.quantity}
                    </TableCell>
                    <TableCell className="px-4 py-3">{item.issuedBy}</TableCell>
                    <TableCell className="px-4 py-3 text-sm">
                      {new Date(item.issuedDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="px-4 py-3">
                      <Badge
                        className={`gap-2 ${
                          item.status === "returned"
                            ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                            : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                        }`}
                      >
                        {item.status === "returned" ? (
                          <CheckCircle2 className="h-3 w-3" />
                        ) : (
                          <AlertCircle className="h-3 w-3" />
                        )}
                        {item.status === "returned" ? "Returned" : "Pending"}
                      </Badge>
                    </TableCell>
                    <TableCell className="px-4 py-3 text-right">
                      {item.status === "pending" && (
                        <Button variant="default" size="sm" className="text-xs">
                          Mark Returned
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}