import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/shared/components/ui/card.tsx";
import {Button} from "@/shared/components/ui/button.tsx";
import {Plus, UserCheck, Users, UserX} from "lucide-react";
import {Separator} from "@/shared/components/ui/separator.tsx";
import {useNavigate} from "react-router";
import {MemberTable} from "@/features/edir/components/MembersTable.tsx";
import {useGetMembers} from "@/features/edir/hooks/useGetMembers.ts";
import {SpinnerPage} from "@/pages/SpinnerPage.tsx";
import {PageError} from "@/pages/PageError.tsx";
import {StatCard} from "@/features/contribution/components/StatCard.tsx";

const MembersPage = () => {
  const navigation = useNavigate();
  const { data, error, isPending } = useGetMembers(0, 10);

  if (isPending) {
    return <SpinnerPage />;
  }
  if (error) {
    return <PageError />;
  }

  // Calculate statistics
  const totalMembers = data.totalElements || 0;
  const activeMembers = data.content?.filter((m: { memberStatus: string; }) => m.memberStatus === 'ACTIVE').length || 0;
  const inactiveMembers = totalMembers - activeMembers;

  return (
    <div className="space-y-6">
      {/* Banner Section */}
      <Card className="overflow-hidden">
        <div className="bg-gradient-to-r from-primary/10 to-primary/5">
          <CardContent className="space-y-6 py-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div className="space-y-3">
                <h1 className="text-3xl font-bold">Members Directory</h1>
                <p className="max-w-3xl text-muted-foreground">
                  Manage and track all members of your Edir community. View member information, 
                  contribution history, and participation records.
                </p>
              </div>
              <Button size="lg" onClick={() => navigation('/add-members')} className="gap-2">
                <Plus className="h-4 w-4" />
                Add Member
              </Button>
            </div>

            <Separator />

            {/* Stats Grid */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <StatCard
                icon={<Users className="h-5 w-5" />}
                title="Total Members"
                value={totalMembers.toString()}
              />
              <StatCard
                icon={<UserCheck className="h-5 w-5" />}
                title="Active Members"
                value={activeMembers.toString()}
              />
              <StatCard
                icon={<UserX className="h-5 w-5" />}
                title="Inactive Members"
                value={inactiveMembers.toString()}
              />
            </div>
          </CardContent>
        </div>
      </Card>

      {/* Members Table Card */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>
              Members List
            </CardTitle>
            <CardDescription>
              View and manage all registered members
            </CardDescription>
          </div>
        </CardHeader>

        <Separator />
        <CardContent className="pt-6">
          {
            data.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="rounded-full bg-primary/10 p-5">
                  <Users className="h-12 w-12 text-primary" />
                </div>
                <h3 className="mt-6 text-xl font-semibold">
                  No members yet
                </h3>
                <p className="mt-2 max-w-md text-muted-foreground">
                  Start building your Edir community by adding members.
                  Registered members will appear here with their contribution
                  history and participation records.
                </p>
                <Button className="mt-6"
                  onClick={() => {
                    navigation("/add-members")
                  }}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add First Member
                </Button>
              </div>

            ) : (

              <MemberTable
                onPageChange={page => console.log(page)}
                loading={isPending}
                pagination={
                  {
                    currentPage: data.pageNumber,
                    pageSize: data.pageSize,
                    totalItems: data.totalElements,
                    totalPages: data.totalPages
                  }
                }
                data={data.content}
              />

            )
          }
        </CardContent>
      </Card>
    </div>
  );
};

export default MembersPage;