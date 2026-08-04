import {useState} from "react";

import {Calendar, CalendarDays, HeartHandshake, Plus, Users,} from "lucide-react";

import {Button} from "@/shared/components/ui/button";
import {Card, CardContent,} from "@/shared/components/ui/card";
import {Badge} from "@/shared/components/ui/badge";
import {Separator} from "@/shared/components/ui/separator";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/shared/components/ui/dialog";
import {useNavigate} from "react-router";
import FuneralEventTable from "@/features/funeral/components/FuneralEventTable.tsx";
import {useGetFuneralEvent} from "@/features/funeral/hooks/useGetFuneralEvent.ts";
import {SpinnerPage} from "@/pages/SpinnerPage.tsx";
import {PageError} from "@/pages/PageError.tsx";

export default function EventPage() {
  const [open, setOpen] = useState(false);
  const {data,isLoading,isError,error}=useGetFuneralEvent();
  const navigate = useNavigate();

  if(isLoading){
    return <SpinnerPage message={'Loading events...'}/>
  }

  if(isError){
    return <PageError title={'Unable to load events'} description={error.message}/>
  }

  return (
    <div className="space-y-8">
      <Card className="overflow-hidden border-0 shadow-sm">
        <div className="bg-linear-to-r from-primary/10 via-primary/5 to-background">
          <CardContent className="py-10">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="space-y-4">
                <Badge variant="secondary" className="w-fit">
                  Edir Event Management
                </Badge>

                <div>
                  <h1 className="text-4xl font-bold tracking-tight">Events</h1>

                  <p className="mt-3 max-w-3xl leading-7 text-muted-foreground">
                    Manage funeral ceremonies, community meetings, and all Edir
                    events from one place. Create events, assign
                    responsibilities, track attendance, and manage inventory
                    usage.
                  </p>
                </div>
              </div>

              <Button size="lg" onClick={() => setOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Create Event
              </Button>
            </div>

            <Separator className="my-8" />

            <div className="grid gap-4 md:grid-cols-3">
              <StatCard
                icon={<CalendarDays className="h-5 w-5" />}
                title="Upcoming Events"
                value="6"
              />

              <StatCard
                icon={<HeartHandshake className="h-5 w-5" />}
                title="Funeral Events"
                value="15"
              />

              <StatCard
                icon={<Users className="h-5 w-5" />}
                title="Meetings"
                value="8"
              />
            </div>
          </CardContent>
        </div>
      </Card>
      <Card>
      <FuneralEventTable funeralEvents={data} onSelect={funeralId => navigate(`/${funeralId}/funeral-event-detail`)} />
      </Card>

      <EventTypeDialog open={open} onOpenChange={setOpen} />
    </div>
  );
}

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
}

function StatCard({ title, value, icon }: StatCardProps) {
  return (
    <Card>
      <CardContent className="flex items-center justify-between p-6">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>

          <h2 className="mt-1 text-3xl font-bold">{value}</h2>
        </div>

        <div className="rounded-xl bg-primary/10 p-3 text-primary">{icon}</div>
      </CardContent>
    </Card>
  );
}

interface Props {
  open: boolean;
  onOpenChange(open: boolean): void;
}

function EventTypeDialog({ open, onOpenChange }: Props) {
  const navigate =useNavigate();
  function select(type: "FUNERAL" | "MEETING") {
    navigate("/"+"new-funeral-event"+"/funeral-event");

    onOpenChange(false);
    console.log(type);
    // Open Funeral Drawer
    // or Meeting Drawer
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
  <DialogTrigger>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>Create New Event</DialogTitle>

          <DialogDescription>
            Select the type of event you would like to create.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 pt-4 md:grid-cols-2">
          <button
            onClick={() => select("FUNERAL")}
            className="rounded-xl border p-6 text-left transition-all hover:border-primary hover:bg-primary/5"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-red-100">
              <HeartHandshake className="h-6 w-6 text-red-600" />
            </div>

            <h3 className="font-semibold text-lg">Funeral Event</h3>

            <p className="mt-2 text-sm text-muted-foreground">
              Register a funeral event, assign family members, allocate
              inventory, and manage contributions.
            </p>
          </button>

          <button
            onClick={() => select("MEETING")}
            className="rounded-xl border p-6 text-left transition-all hover:border-primary hover:bg-primary/5"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
              <Calendar className="h-6 w-6 text-blue-600" />
            </div>

            <h3 className="font-semibold text-lg">Meeting</h3>

            <p className="mt-2 text-sm text-muted-foreground">
              Schedule committee meetings, annual assemblies, or emergency
              community meetings.
            </p>
          </button>
        </div>
      </DialogContent>
      </DialogTrigger>
    </Dialog>
  );
}