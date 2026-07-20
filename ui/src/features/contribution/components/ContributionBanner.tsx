import {Calendar, CircleDollarSign, Clock3, Pencil,} from "lucide-react";

import {Badge} from "@/shared/components/ui/badge";
import {Button} from "@/shared/components/ui/button";

import {Card, CardContent,} from "@/shared/components/ui/card";

import {Separator,} from "@/shared/components/ui/separator";

import {format} from "date-fns";
import type {ContributionResponse} from "@/features/contribution/types/contribution.ts";
import {StatCard} from "@/features/contribution/components/StatCard.tsx";

interface Props {
    contribution: ContributionResponse;
}

export function ContributionBanner({
                                       contribution,
                                   }: Props) {
    return (
        <Card className="overflow-hidden">
            <div className="bg-primary/5">
                <CardContent className="space-y-6 py-8">
                    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                        <div className="space-y-3">
                            <div className="flex items-center gap-3">
                                <h1 className="text-3xl font-bold">
                                    {contribution.name}
                                </h1>
                                <Badge
                                    variant={
                                        contribution.contributionStatus === "OPEN"
                                            ? "default"
                                            : "secondary"
                                    }
                                >
                                    {contribution.contributionStatus}
                                </Badge>

                            </div>

                            <p className="max-w-3xl text-muted-foreground">

                                {contribution.description}

                            </p>

                        </div>

                        <Button>

                            <Pencil className="mr-2 h-4 w-4"/>

                           Edit Contribution period

                        </Button>

                    </div>

                    <Separator />

                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

                        <StatCard
                            icon={<Calendar className="h-5 w-5" />}
                            title="Contribution Period"
                            value={`${format(new Date(contribution.startDate), "MMM d")} - ${format(new Date(contribution.endDate), "MMM d, yyyy")}`}
                        />
                        <StatCard
                            icon={<Clock3 className="h-5 w-5" />}
                            title="Due Date"
                            value={format(
                                new Date(contribution.dueDate),
                                "MMMM d, yyyy"
                            )}
                        />
                        <StatCard
                            icon={<CircleDollarSign className="h-5 w-5" />}
                            title="Contribution"
                            value={`${contribution.contributionAmount} ETB`}
                        />

                        <StatCard
                            icon={<CircleDollarSign className="h-5 w-5" />}
                            title="Penalty"
                            value={`${contribution.penaltyAmount} ETB (${contribution.penaltyType})`}
                        />

                    </div>

                </CardContent>

            </div>

        </Card>

    );

}