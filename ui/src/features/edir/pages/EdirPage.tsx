import {CalendarDays, ClipboardList, Edit, Landmark, Users, Wallet,} from "lucide-react";
import {useNavigate} from "react-router";

import EmptyEdirState from "@/features/edir/components/EmptyEdirState";
import {Card, CardContent, CardDescription, CardHeader, CardTitle,} from "@/shared/components/ui/card";
import {Button} from "@/shared/components/ui/button";
import {Badge} from "@/shared/components/ui/badge";
import {useEdir} from "@/features/edir/hooks/useEdir.ts";
import {SpinnerPage} from "@/pages/SpinnerPage.tsx";
import {PageError} from "@/pages/PageError.tsx";
import {useDelayedLoading} from "@/shared/hooks/useDelayedLoading.tsx";

const EdirPage = () => {
    const navigate = useNavigate();
    const { data, isPending, isLoading, refetch, isError } = useEdir();
    const showSpinner = useDelayedLoading(isPending);

    if (showSpinner || isLoading) {
        return <SpinnerPage message={`Loading Edir information...`} />;
    }

    if (isError) {
        return (
            <PageError
                title="Couldn't connect to server"
                description="Please try again later."
                onRetry={refetch}
            />
        );
    }

    if (!data) {
        return <EmptyEdirState />;
    }

    return (
        <div className="space-y-8">
            {/* Hero Card */}
            <Card className="overflow-hidden">
                <div className="h-2 bg-linear-to-r from-blue-800 via-blue-500/70 to-blue-200/30" />
                <CardContent className="p-8">
                    <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
                        <div className="max-w-3xl space-y-5">
                            <Badge>Active Edir</Badge>
                            <div>
                                <h1 className="text-4xl font-bold tracking-tight">
                                    {data.edirName}
                                </h1>
                                <p className="mt-4 leading-7 text-muted-foreground">
                                    {data.description}
                                </p>
                            </div>
                            <div className="flex flex-wrap gap-6 text-sm">
                                <div className="flex items-center gap-2">
                                    <CalendarDays className="h-5 w-5 text-primary" />
                                    <span>Established  {new Date(data.establishedDate).toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    })}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Users className="h-5 w-5 text-primary" />
                                    <span>0 Registered Members</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Landmark className="h-5 w-5 text-primary" />
                                    <span>Community Organization</span>
                                </div>
                            </div>
                        </div>

                        <Button onClick={() => navigate("/edit")}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Edir
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Statistics */}
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                {[
                    { title: "Total Members", val: "0", desc: "Active community members", icon: Users },
                    { title: "Monthly Contribution", val: "0 ETB", desc: "Current contribution amount", icon: Wallet },
                    { title: "Total Meetings", val: "0", desc: "Meetings recorded", icon: ClipboardList },
                    { title: "Financial Status", val: "Good", desc: "Account overview", icon: Landmark },
                ].map((stat, i) => (
                    <Card key={i}>
                        <CardHeader>
                            <CardDescription>{stat.title}</CardDescription>
                            <CardTitle className="text-3xl">{stat.val}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center text-sm text-muted-foreground">
                                <stat.icon className="mr-2 h-4 w-4" />
                                {stat.desc}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Quick Actions */}
            <Card>
                <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                    <CardDescription>Common tasks for managing your Edir</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4 md:grid-cols-3">
                    {[
                        { icon: Users, title: "Add Member", desc: "Register a new Edir member",link:'/add-members' },
                        { icon: Wallet, title: "Record Contribution", desc: "Track member payments", link:'/add-members' },
                        { icon: ClipboardList, title: "Create Meeting", desc: "Manage Edir events", link:'/add-members' },
                    ].map((action, i) => (
                        <Button key={i} onClick={()=>navigate(action.link)} variant="outline" className="h-24 justify-start">
                            <action.icon className="mr-4 h-8 w-8 text-primary" />
                            <div className="text-left">
                                <div className="font-semibold">{action.title}</div>
                                <p className="text-sm text-muted-foreground">{action.desc}</p>
                            </div>
                        </Button>
                    ))}
                </CardContent>
            </Card>
        </div>
    );
};

export default EdirPage;