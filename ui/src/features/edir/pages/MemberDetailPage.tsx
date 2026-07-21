import {
    AlertCircle,
    ArrowLeft,
    CalendarDays,
    Clock,
    Cross,
    Edit,
    MapPin,
    MoreVertical,
    Phone,
    Shield,
    Trash2,
    User,
    Users,
    Wallet
} from "lucide-react";
import {useNavigate, useParams} from "react-router";

import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/shared/components/ui/card.tsx";
import {Button} from "@/shared/components/ui/button.tsx";
import {Badge} from "@/shared/components/ui/badge.tsx";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu.tsx";
import {useGetMember} from "@/features/edir/hooks/useGetMembers.ts";
import {SpinnerPage} from "@/pages/SpinnerPage.tsx";
import {PageError} from "@/pages/PageError.tsx";

export default function MemberDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: member, isPending, isError, refetch } = useGetMember(id || "");

  if (isPending) {
    return <SpinnerPage message="Loading member details..." />;
  }

  if (isError || !member) {
    return (
      <PageError
        title="Member not found"
        description="The member you're looking for doesn't exist or could not be loaded."
        onRetry={() => refetch()}
      />
    );
  }

  const fullName = `${member.firstName} ${member.lastName}`;
  const initials = `${member.firstName.charAt(0)}${member.lastName.charAt(0)}`;
  const joinYear = new Date().getFullYear();

  return (
    <div className="space-y-8">
      {/* Back Button */}
      <Button variant="ghost" size="sm" className="gap-2" onClick={() => navigate("/members")}>
        <ArrowLeft className="h-4 w-4" />
        Back to Members
      </Button>

      {/* Profile Header Card */}
      <Card className="overflow-hidden border-0 shadow-md">
        <div className="h-1 bg-linear-to-r from-primary via-primary/70 to-primary/30" />
        <CardContent className="p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div className="flex items-start gap-6">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-2xl font-bold text-primary shrink-0">
                {initials}
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-3 flex-wrap">
                  <h1 className="text-3xl font-bold tracking-tight">{fullName}</h1>
                  <Badge variant={member.memberStatus === "ACTIVE" ? "default" : "secondary"}>
                    {member.memberStatus || "ACTIVE"}
                  </Badge>
                </div>

                <p className="mt-2 text-sm text-muted-foreground">
                  Member ID: {member.id}
                </p>

                <div className="mt-4 flex flex-wrap gap-6 text-sm text-muted-foreground">
                  <span className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    {member.phoneNumber}
                  </span>
                  <span className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Age {member.age}
                  </span>
                  <span className="flex items-center gap-2">
                    <CalendarDays className="h-4 w-4" />
                    Member since {joinYear}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-2 flex-wrap md:flex-nowrap">
              <Button onClick={() => navigate(`/members/${member.id}/edit`)} className="gap-2">
                <Edit className="h-4 w-4" />
                Edit
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Button variant="outline" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem onClick={() => console.log("Appoint:", member.id)} className="cursor-pointer">
                    <Shield className="mr-2 h-4 w-4 text-blue-600" />
                    <span>Appoint as Leader</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => console.log("Suspend:", member.id)} className="cursor-pointer">
                    <AlertCircle className="mr-2 h-4 w-4 text-amber-600" />
                    <span>Suspend Member</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => console.log("Deceased:", member.id)} className="cursor-pointer text-orange-600">
                    <Cross className="mr-2 h-4 w-4" />
                    <span>Mark as Deceased</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => console.log("Delete:", member.id)} className="cursor-pointer text-destructive">
                    <Trash2 className="mr-2 h-4 w-4" />
                    <span>Delete Member</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <CardDescription className="text-xs font-medium">Total Contribution</CardDescription>
              <Wallet className="h-4 w-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <CardTitle className="text-2xl font-bold">0 ETB</CardTitle>
              <p className="text-xs text-muted-foreground">No payment recorded yet</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <CardDescription className="text-xs font-medium">Member Since</CardDescription>
              <CalendarDays className="h-4 w-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <CardTitle className="text-2xl font-bold">{joinYear}</CardTitle>
              <p className="text-xs text-muted-foreground">Registration year</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <CardDescription className="text-xs font-medium">Participation</CardDescription>
              <Users className="h-4 w-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <CardTitle className="text-2xl font-bold">Active</CardTitle>
              <p className="text-xs text-muted-foreground">Community member</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Details Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Personal Information */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Basic member details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <InfoRow icon={<User className="h-4 w-4" />} label="Full Name" value={fullName} />
            <InfoRow icon={<User className="h-4 w-4" />} label="Age" value={`${member.age} years old`} />
            <InfoRow icon={<Phone className="h-4 w-4" />} label="Phone Number" value={member.phoneNumber} />
          </CardContent>
        </Card>

        {/* Address Information */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle>Address</CardTitle>
            <CardDescription>Member residential information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <InfoRow icon={<MapPin className="h-4 w-4" />} label="City" value={member?.city || "—"} />
            <InfoRow icon={<MapPin className="h-4 w-4" />} label="Subcity" value={member?.subcity || "—"} />
            <InfoRow icon={<MapPin className="h-4 w-4" />} label="Woreda" value={member?.worda || "—"} />
          </CardContent>
        </Card>
      </div>

      {/* Activity Section */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Member contribution and event history</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="rounded-full bg-primary/10 p-5">
              <Clock className="h-10 w-10 text-primary" />
            </div>
            <h3 className="mt-5 font-semibold">No activity yet</h3>
            <p className="mt-2 max-w-sm text-sm text-muted-foreground">
              Contribution records, meetings, and member activities will appear here.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-4">
      <div className="rounded-lg bg-primary/10 p-2 text-primary shrink-0">{icon}</div>
      <div className="min-w-0">
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="font-medium truncate">{value}</p>
      </div>
    </div>
  );
}