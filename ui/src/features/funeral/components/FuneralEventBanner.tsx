import {CalendarDays, CheckCircle2, CircleDollarSign, Clock3, Pencil, User, Users,} from "lucide-react";

import {Badge} from "@/shared/components/ui/badge";
import {Button} from "@/shared/components/ui/button";
import {Card, CardContent,} from "@/shared/components/ui/card";
import {Separator} from "@/shared/components/ui/separator";
import type {FuneralEvent} from "@/features/funeral/types/types.ts";
import type {Member} from "@/shared/types.ts";

interface FuneralEventBannerProps {
    funeral:FuneralEvent;
    members: Member[]
    onEdit?: () => void;
}

export function FuneralEventBanner({
                                  funeral,
                                       members,
                                  onEdit,
                              }: FuneralEventBannerProps) {
    return (
        <Card className="overflow-hidden border shadow-sm">
            <div className="bg-linear-to-r from-primary/10 via-primary/5 to-background">
                <CardContent className="space-y-8 py-8">
                    {/* Header */}
                    <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                        <div className="space-y-3">
                            <Badge
                                variant={funeral?.isClose ? "secondary" : "default"}
                                className="w-fit"
                            >
                                {funeral.isClose ? (
                                    <>
                                        <CheckCircle2 className="mr-1 h-3 w-3" />
                                        Closed
                                    </>
                                ) : (
                                    <>
                                        <Clock3 className="mr-1 h-3 w-3" />
                                        Active
                                    </>
                                )}
                            </Badge>

                            <div>
                                <h1 className="text-3xl font-bold tracking-tight">
                                    {funeral.funeralName}
                                </h1>

                                <p className="mt-2 text-muted-foreground">
                                    Funeral support for{" "}
                                    <span className="font-medium text-foreground">
                                 {funeral.deceasedPersonFullName}
                  </span>
                                </p>
                            </div>
                        </div>

                        <Button onClick={onEdit}>
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit Event
                        </Button>
                    </div>

                    <Separator />

                    {/* Information */}
                    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-5">

                        <InfoCard
                            icon={<CalendarDays className="h-5 w-5" />}
                            label="Funeral Date"
                            value={new Date(funeral.funeralDate).toLocaleDateString()}
                        />

                        <InfoCard
                            icon={<User className="h-5 w-5" />}
                            label="Relationship"
                            value={funeral.relationShip.replaceAll("_", " ")}
                        />

                        <InfoCard
                            icon={<CircleDollarSign className="h-5 w-5" />}
                            label="Payout"
                            value={`ETB ${funeral.payout.toLocaleString()}`}
                        />

                        <InfoCard
                            icon={<Users className="h-5 w-5" />}
                            label="Member ID"
                            value={members.find(m=>m.memberId=funeral.memberId)?.fullName || ""}
                        />

                        <InfoCard
                            icon={
                                funeral.isClose ? (
                                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                                ) : (
                                    <Clock3 className="h-5 w-5 text-amber-600" />
                                )
                            }
                            label="Status"
                            value={funeral.isClose ? "Closed" : "Active"}
                        />
                    </div>
                </CardContent>
            </div>
        </Card>
    );
}

interface InfoCardProps {
    icon: React.ReactNode;
    label: string;
    value: string;
}

function InfoCard({
                      icon,
                      label,
                      value,
                  }: InfoCardProps) {
    return (
        <div className="rounded-xl border bg-background p-4 transition-colors hover:bg-muted/30">
            <div className="mb-3 flex items-center gap-2 text-primary">
                {icon}
                <span className="text-sm font-medium text-muted-foreground">
          {label}
        </span>
            </div>

            <p className="wrap-break-word text-lg font-semibold">
                {value}
            </p>
        </div>
    );
}