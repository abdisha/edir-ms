import { ArrowRight, Plus, Users, Wallet, CalendarDays } from "lucide-react";

import {
    Card,
    CardContent,
} from "@/shared/components/ui/card";
import {
    Badge,
} from "@/shared/components/ui/badge";
import {
    Button,
} from "@/shared/components/ui/button";
import {Link} from "react-router";

export default function EmptyEdirState() {
    return (
        <div className="flex flex-1  items-center justify-center bg-linear-to-b from-background via-muted/30 to-background px-6">
            <Card className="w-full max-w-5xl overflow-hidden border bg-background shadow-2xl">
                <CardContent className="grid gap-0 p-0 lg:grid-cols-2">
                    {/* Left Content */}
                    <div className="flex flex-col justify-center p-10 lg:p-14">
                        <Badge variant="secondary" className="mb-6 w-fit">
                            Welcome to Edir Management
                        </Badge>

                        <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
                            Create your first Edir
                        </h1>

                        <p className="mt-5 max-w-lg text-base leading-7 text-muted-foreground">
                            Your workspace is ready, but you haven't created an Edir yet.
                            Start by creating one to organize members, collect contributions,
                            manage meetings, and keep your community records in one secure
                            place.
                        </p>

                        {/* Features */}
                        <div className="mt-10 space-y-5">
                            <div className="flex items-start gap-4">
                                <div className="rounded-lg bg-primary/10 p-2">
                                    <Users className="h-5 w-5 text-primary" />
                                </div>

                                <div>
                                    <h3 className="font-medium">
                                        Member Management
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                        Register members, manage households, and keep member
                                        information organized.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="rounded-lg bg-primary/10 p-2">
                                    <Wallet className="h-5 w-5 text-primary" />
                                </div>

                                <div>
                                    <h3 className="font-medium">
                                        Contributions
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                        Track monthly payments, outstanding balances, and financial
                                        reports effortlessly.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="rounded-lg bg-primary/10 p-2">
                                    <CalendarDays className="h-5 w-5 text-primary" />
                                </div>

                                <div>
                                    <h3 className="font-medium">
                                        Meetings & Events
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                        Schedule meetings, manage events, and keep your members
                                        informed.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="mt-10 flex flex-wrap gap-4">
                            <Button size="lg" >
                                <Link to="/setup-edir" className="flex items-center gap-1">
                                <Plus className="mr-1 h-5 w-5" />
                                Create Your Edir
                                </Link>
                            </Button>

                            <Button variant="outline" size="lg">
                                Learn More
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </div>
                    </div>

                    {/* Right Side */}
                    <div className="relative flex items-center justify-center overflow-hidden bg-muted/40 p-10">
                        {/* Decorative circles */}
                        <div className="absolute h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
                        <div className="absolute h-72 w-72 rounded-full border border-primary/10" />
                        <div className="absolute h-52 w-52 rounded-full border border-primary/20" />

                        {/* Main Icon */}
                        <div className="relative z-10 flex h-64 w-64 items-center justify-center rounded-full border bg-background shadow-2xl">
                            <div className="flex h-44 w-44 items-center justify-center rounded-full bg-primary/10">
                                <Users className="h-24 w-24 text-primary" />
                            </div>
                        </div>

                        {/* Floating Cards */}
                        <Card className="absolute left-8 top-10 hidden w-44 shadow-lg md:block">
                            <CardContent className="p-4">
                                <p className="text-sm font-medium">Members</p>
                                <p className="mt-1 text-2xl font-bold">0</p>
                            </CardContent>
                        </Card>

                        <Card className="absolute bottom-10 right-8 hidden w-44 shadow-lg md:block">
                            <CardContent className="p-4">
                                <p className="text-sm font-medium">Contributions</p>
                                <p className="mt-1 text-2xl font-bold">0 ETB</p>
                            </CardContent>
                        </Card>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}