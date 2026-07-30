import type {LucideIcon} from "lucide-react";
import {ArrowLeft, CircleDollarSign, CreditCard, HandCoins, Receipt, Wallet,} from "lucide-react";

import {Link, useParams} from "react-router";

import {Button} from "@/shared/components/ui/button";
import {Card, CardContent, CardDescription, CardHeader, CardTitle,} from "@/shared/components/ui/card";
import {Badge} from "@/shared/components/ui/badge";
import {Separator} from "@/shared/components/ui/separator";

import {Tabs, TabsContent, TabsList, TabsTrigger,} from "@/shared/components/ui/tabs";


import {SpinnerPage} from "@/pages/SpinnerPage";
import {PageError} from "@/pages/PageError";

import {useGetMemberContribution} from "@/features/contribution/hooks/useGetMemberContributions";
import {ReceivePaymentDrawer} from "@/features/contribution/components/ReceivePaymentDrawer.tsx";
import {useFormDrawer} from "@/shared/components/useFormDrawer.ts";
import {useGetPayments} from "@/features/contribution/hooks/useGetPayments.ts";
import PaymentTable from "@/features/contribution/components/PaymentTable.tsx";

const MemberContributionDetailPage = () => {
    const { id } = useParams<{ id: string }>();
    const { setOpen, open } = useFormDrawer();
    const{data:payments}=useGetPayments(id||"");

    const {
        data,
        isLoading,
        isPending,
        isError,
        refetch,
    } = useGetMemberContribution(id ?? "");

    if (isLoading || isPending) {
        return (
            <SpinnerPage
                message="Loading contribution details..."
            />
        );
    }

    if (isError || !data) {
        return (
            <PageError
                title="Unable to load contribution"
                description="Something went wrong while loading this contribution."
                onRetry={refetch}
            />
        );
    }

    const outstandingBalance = data.contributionAmount + data.rolledOverContribution + data.rolledOverPenalty;

    return (
        <div className="space-y-8">
             <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                <div>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="mb-4"
                    >
                        <Link to=".." className="shrink-0 flex items-center gap-1">
                            <ArrowLeft className="mr-2 h-4 w-4"/>
                            Back
                        </Link>
                    </Button>
                    <h1 className="text-3xl font-bold tracking-tight">
                        {data.fullName}
                    </h1>
                    <p className="mt-2 text-muted-foreground max-w-2xl">
                        Review the member&apos;s contribution balance,
                        penalties, rollover amounts and complete
                        payment history for this contribution period.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <Badge
                        variant={
                            data.status === "FULLY_PAID" ? "default"
                                : data.status === "PARTIALLY_PAID"
                                    ? "secondary"
                                    : "destructive"
                        }
                        className="px-4 py-2 text-sm">

                        {data.status.replaceAll("_", " ")}
                    </Badge>
                    {data.status !== "FULLY_PAID" && <Button onClick={() => setOpen(true)}>
                        <Receipt className="mr-2 h-4 w-4"/>
                        Receive Payment
                    </Button>}

                </div>

            </div>
            <Separator/>

            <section>
                <div className="mb-4">
                    <h2 className="text-xl font-semibold">
                        Financial Summary
                    </h2>
                    <p className="text-muted-foreground">
                        Overview of the member&apos;s financial status for
                        this contribution period.
                    </p>
                </div>
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                    <SummaryCard
                        title="Outstanding Balance"
                        value={outstandingBalance}
                        icon={Wallet}
                        highlight
                    />
                    <SummaryCard
                        title="Current Contribution"
                        value={data.contributionAmount}
                        icon={CircleDollarSign}
                    />
                    <SummaryCard
                        title="Rolled Over Contribution"
                        value={data.rolledOverContribution}
                        icon={CreditCard}
                    />
                    <SummaryCard
                        title="Penalty"
                        value={data.rolledOverPenalty}
                        icon={HandCoins}
                        destructive
                    />
                </div>
            </section>
            <Tabs
                defaultValue="history"
                className="space-y-6">
                <TabsList>
                    <TabsTrigger value="member">
                        Member Information
                    </TabsTrigger>
                    <TabsTrigger value="history">
                        Payment History
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="member">
                    <Card>
                        <CardHeader>
                            <CardTitle>
                                Member Information
                            </CardTitle>
                            <CardDescription>
                                Basic information about this member and the current contribution
                                record.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-8 md:grid-cols-2">
                                <InfoItem
                                    label="Full Name"
                                    value={data.fullName}
                                />
                                <InfoItem
                                    label="Contribution Status"
                                    value={
                                        <StatusBadge status={data.status}/>
                                    }
                                />
                                <InfoItem
                                    label="Current Contribution"
                                    value={`ETB ${data.contributionAmount.toLocaleString()}`}
                                />
                                <InfoItem
                                    label="Rolled Over Contribution"
                                    value={`ETB ${data.rolledOverContribution.toLocaleString()}`}
                                />
                                <InfoItem
                                    label="Rolled Over Penalty"
                                    value={`ETB ${data.rolledOverPenalty.toLocaleString()}`}
                                />
                                <InfoItem
                                    label="Outstanding Balance"
                                    value={<span className="font-semibold text-primary">ETB {outstandingBalance.toLocaleString()}</span>}
                                />

                            </div>

                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="history">
                    <Card>
                        <CardHeader>
                            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                                <div>
                                    <CardTitle>
                                        Payment History
                                    </CardTitle>
                                    <CardDescription>
                                        Every payment received from this member for the selected
                                        contribution period.
                                    </CardDescription>
                                </div>
                                {data.status !== "FULLY_PAID" && <Button onClick={() => setOpen(true)}>
                                    <Receipt className="mr-2 h-4 w-4"/>
                                    Receive Payment
                                </Button>}
                            </div>
                        </CardHeader>
                        <CardContent>
                            <PaymentTable payments={payments} setOpen={setOpen}/>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
            <ReceivePaymentDrawer
                memberId={data.memberId}
                loading={isLoading}
                open={open}
                onOpenChange={setOpen}
                contributionId={data.contributionId ?? ""}
            />
        </div>
    );
};

export default MemberContributionDetailPage;

interface SummaryCardProps {
    title: string;
    value: number;
    icon: LucideIcon;
    highlight?: boolean;
    destructive?: boolean;
}

function SummaryCard({
    title,
    value,
    icon: Icon,
    highlight = false,
    destructive = false,
                     }: SummaryCardProps) {
    return (
        <Card
            className={
                highlight
                    ? "border-primary shadow-sm"
                    : destructive
                        ? "border-destructive/30"
                        : ""
            }
        >
            <CardHeader className="flex flex-row items-center justify-between ">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                    {title}
                </CardTitle>

                <div
                    className={`rounded-lg  ${
                        destructive
                            ? "bg-destructive/10"
                            : highlight
                                ? "bg-primary/10"
                                : "bg-muted"
                    }`}
                >
                    <Icon
                        className={`h-5 w-5 ${
                            destructive
                                ? "text-destructive"
                                : highlight
                                    ? "text-primary"
                                    : "text-muted-foreground"
                        }`}
                    />
                </div>
            </CardHeader>

            <CardContent>
                <div
                    className={`text-xl font-bold ${
                        destructive
                            ? "text-destructive"
                            : highlight
                                ? "text-primary"
                                : ""
                    }`}
                >
                    ETB {value.toLocaleString()}
                </div>

                <p className="mt-1 text-xs text-muted-foreground">
                    Current contribution period
                </p>
            </CardContent>
        </Card>
    );
}

interface InfoItemProps {
    label: string;
    value: React.ReactNode;
}

function InfoItem({ label, value }: InfoItemProps) {
    return (
        <div className="space-y-1">

            <p className="text-sm text-muted-foreground">
                {label}
            </p>

            <div className="text-base font-semibold">
                {value}
            </div>

        </div>
    );
}

interface StatusBadgeProps {
    status: string;
}

function StatusBadge({ status }: StatusBadgeProps) {
    switch (status) {
        case "FULLY_PAID":
            return (
                <Badge className="bg-green-600 hover:bg-green-600">
                    Paid
                </Badge>
            );

        case "PARTIALLY_PAID":
            return (
                <Badge
                    variant="secondary"
                    className="bg-amber-100 text-amber-700 hover:bg-amber-100"
                >
                    Partially Paid
                </Badge>
            );

        case "UNPAID":
            return (
                <Badge variant="destructive">
                    Unpaid
                </Badge>
            );

        default:
            return (
                <Badge variant="outline">
                    {status.replaceAll("_", " ")}
                </Badge>
            );
    }
}