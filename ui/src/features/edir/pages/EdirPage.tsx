import {ArrowRight, CalendarDays, ClipboardList, Edit, Landmark, Users, Wallet} from "lucide-react";
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
            <Card className="overflow-hidden border-0 shadow-md">
                <div className="h-1 bg-linear-to-r from-primary via-primary/70 to-primary/30" />
                <CardContent className="p-8">
                    <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                        <div className="flex-1 space-y-6">
                            <div>
                                <Badge className="mb-3">Active Edir</Badge>
                                <h1 className="text-4xl font-bold tracking-tight">
                                    {data.edirName}
                                </h1>
                                <p className="mt-3 text-base leading-relaxed text-muted-foreground max-w-2xl">
                                    {data.description}
                                </p>
                            </div>
                            <div className="flex flex-wrap gap-8 pt-2">
                                <div className="flex items-center gap-3">
                                    <div className="rounded-lg bg-primary/10 p-2">
                                        <CalendarDays className="h-5 w-5 text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-muted-foreground">Established</p>
                                        <p className="font-medium">{new Date(data.establishedDate).toLocaleDateString("en-US", {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                        })}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="rounded-lg bg-primary/10 p-2">
                                        <Users className="h-5 w-5 text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-muted-foreground">Members</p>
                                        <p className="font-medium">0 Registered</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="rounded-lg bg-primary/10 p-2">
                                        <Landmark className="h-5 w-5 text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-muted-foreground">Type</p>
                                        <p className="font-medium">Community Org</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <Button size="lg" onClick={() => navigate("/edit")} className="lg:self-start">
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Edir
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Statistics Grid */}
            <div>
                <h2 className="mb-4 text-lg font-semibold">Overview</h2>
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                    {[
                        { title: "Total Members", val: "0", desc: "Active community members", icon: Users },
                        { title: "Monthly Contribution", val: "0 ETB", desc: "Current contribution amount", icon: Wallet },
                        { title: "Total Meetings", val: "0", desc: "Meetings recorded", icon: ClipboardList },
                        { title: "Financial Status", val: "Good", desc: "Account overview", icon: Landmark },
                    ].map((stat, i) => (
                        <Card key={i} className="border-0 shadow-sm">
                            <CardHeader className="pb-3">
                                <div className="flex items-start justify-between">
                                    <CardDescription className="text-xs font-medium">{stat.title}</CardDescription>
                                    <stat.icon className="h-4 w-4 text-primary" />
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2">
                                    <CardTitle className="text-2xl font-bold">{stat.val}</CardTitle>
                                    <p className="text-xs text-muted-foreground">{stat.desc}</p>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>

            {/* Quick Actions */}
            <div>
                <h2 className="mb-4 text-lg font-semibold">Quick Actions</h2>
                <Card className="border-0 shadow-md">
                    <CardContent className="p-6">
                        <div className="grid gap-3 md:grid-cols-3">
                            {[
                                { icon: Users, title: "Add Member", desc: "Register a new Edir member", link: '/add-members' },
                                { icon: Wallet, title: "Record Contribution", desc: "Track member payments", link: '/add-members' },
                                { icon: ClipboardList, title: "Create Meeting", desc: "Manage Edir events", link: '/add-members' },
                            ].map((action, i) => (
                                <button
                                    key={i}
                                    onClick={() => navigate(action.link)}
                                    className="group flex items-center gap-4 rounded-lg border border-border p-4 transition-all hover:bg-muted/50 hover:border-primary/50"
                                >
                                    <div className="rounded-lg bg-primary/10 p-3 transition-colors group-hover:bg-primary/20">
                                        <action.icon className="h-5 w-5 text-primary" />
                                    </div>
                                    <div className="flex-1 text-left">
                                        <div className="font-semibold text-sm">{action.title}</div>
                                        <p className="text-xs text-muted-foreground mt-1">{action.desc}</p>
                                    </div>
                                    <ArrowRight className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-primary" />
                                </button>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default EdirPage;