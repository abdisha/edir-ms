import {CalendarDays, ClipboardList, Edit, Landmark, Users, Wallet,} from "lucide-react";

import EmptyEdirState from "@/features/edir/components/EmptyEdirState";

import {Card, CardContent, CardDescription, CardHeader, CardTitle,} from "@/shared/components/ui/card";

import {Button} from "@/shared/components/ui/button";

import {Badge} from "@/shared/components/ui/badge";


import type {Edir} from "@/features/edir/types/edir";


const EdirPage = () => {

    // Temporary mock data
    const edir: Edir | null = {
        id: "1",
        name: "Bole Medhanialem Edir",
        description:
            "Bole Medhanialem Edir is a community-based mutual support organization established to provide financial and social assistance to its members. The Edir helps members during difficult times by organizing contributions, managing community events, and supporting families when they need it most.",
        establishedYear: 2005,
        createdAt: "",
        updatedAt: "",
    };





    if (!edir) {
        return <EmptyEdirState />;
    }


    return (

        <div className=" space-y-8">


            {/* Hero Section */}
            <Card className="overflow-hidden">

                <div className="h-2 bg-linear-to-r from-blue-800 via-blue-500/70 to-blue-200/30"/>
                <CardContent className="p-8">
                    <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
                        <div className="space-y-5 max-w-3xl">
                            <Badge>
                                Active Edir
                            </Badge>
                            <div>
                                <h1 className="text-4xl font-bold tracking-tight">
                                    {edir.name}
                                </h1>
                                <p className="mt-4 leading-7 text-muted-foreground">
                                    {edir.description}
                                </p>
                            </div>
                            <div className="flex flex-wrap gap-6 text-sm">
                                <div className="flex items-center gap-2">
                                    <CalendarDays
                                        className="h-5 w-5 text-primary"
                                    />
                                    <span>
                    Established {edir.establishedYear}
                  </span>

                                </div>



                                <div className="flex items-center gap-2">

                                    <Users
                                        className="h-5 w-5 text-primary"
                                    />

                                    <span>
                    {0} Registered Members
                  </span>

                                </div>



                                <div className="flex items-center gap-2">

                                    <Landmark
                                        className="h-5 w-5 text-primary"
                                    />

                                    <span>
                    Community Organization
                  </span>

                                </div>


                            </div>


                        </div>



                        <Button>

                            <Edit className="mr-2 h-4 w-4"/>

                            Edit Edir

                        </Button>


                    </div>

                </CardContent>


            </Card>
            {/* Statistics */}
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                <Card>
                    <CardHeader>
                        <CardDescription>
                            Total Members
                        </CardDescription>
                        <CardTitle className="text-3xl">
                            {0}
                        </CardTitle>
                    </CardHeader>
                   <CardContent>
                        <div className="flex items-center text-sm text-muted-foreground">
                            <Users className="mr-2 h-4 w-4"/>
                            Active community members
                        </div>
                    </CardContent>
                </Card>
               <Card>
                    <CardHeader>
                        <CardDescription>
                            Monthly Contribution
                        </CardDescription>
                        <CardTitle className="text-3xl">
                            0 ETB
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center text-sm text-muted-foreground">
                            <Wallet className="mr-2 h-4 w-4"/>
                           Current contribution amount
                        </div>
                    </CardContent>
                </Card>
                   <Card>
                    <CardHeader>
                        <CardDescription>
                            Total Meetings
                        </CardDescription>
                        <CardTitle className="text-3xl">
                            0
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center text-sm text-muted-foreground">
                            <ClipboardList className="mr-2 h-4 w-4"/>
                            Meetings recorded
                        </div>
                    </CardContent>
                </Card>
                <Card>

                    <CardHeader>

                        <CardDescription>
                            Financial Status
                        </CardDescription>


                        <CardTitle className="text-3xl">
                            Good
                        </CardTitle>


                    </CardHeader>


                    <CardContent>

                        <div className="flex items-center text-sm text-muted-foreground">

                            <Landmark className="mr-2 h-4 w-4"/>

                            Account overview

                        </div>

                    </CardContent>


                </Card>



            </div>
            {/* Quick Actions */}
            <Card>
                <CardHeader>

                    <CardTitle>
                        Quick Actions
                    </CardTitle>

                    <CardDescription>
                        Common tasks for managing your Edir
                    </CardDescription>


                </CardHeader>


                <CardContent className="grid gap-4 md:grid-cols-3">


                    <Button
                        variant="outline"
                        className="h-24 justify-start"
                    >

                        <Users className="mr-4 h-8 w-8 text-primary"/>

                        <div className="text-left">

                            <div className="font-semibold">
                                Add Member
                            </div>

                            <p className="text-sm text-muted-foreground">
                                Register a new Edir member
                            </p>

                        </div>
                    </Button>

                    <Button
                        variant="outline"
                        className="h-24 justify-start"
                    >
                        <Wallet className="mr-4 h-8 w-8 text-primary"/>

                        <div className="text-left">

                            <div className="font-semibold">
                                Record Contribution
                            </div>
                            <p className="text-sm text-muted-foreground">
                                Track member payments
                            </p>

                        </div>
                    </Button>

                    <Button
                        variant="outline"
                        className="h-24 justify-start"
                    >
                        <ClipboardList className="mr-4 h-8 w-8 text-primary"/>
                        <div className="text-left">
                            <div className="font-semibold">
                                Create Meeting
                            </div>
                            <p className="text-sm text-muted-foreground">
                                Manage Edir events
                            </p>
                        </div>
                    </Button>
                </CardContent>
            </Card>

        </div>

    );
};


export default EdirPage;