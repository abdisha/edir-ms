import type {LucideIcon} from "lucide-react";
import {ArrowLeft, CircleDollarSign, CreditCard, HandCoins, Receipt, Wallet,} from "lucide-react";

import {Link, useParams} from "react-router";


import {Button} from "@/shared/components/ui/button";
import {Card, CardContent, CardDescription, CardHeader, CardTitle,} from "@/shared/components/ui/card";
import {Badge} from "@/shared/components/ui/badge";
import {Separator} from "@/shared/components/ui/separator";

import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/shared/components/ui/tabs";

import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/shared/components/ui/table";

import {SpinnerPage} from "@/pages/SpinnerPage";
import {PageError} from "@/pages/PageError";

import {useGetMemberContribution} from "@/features/contribution/hooks/useGetMemberContributions";
import type {PaymentHistory} from "@/features/contribution/types/contribution.ts";
import {ReceivePaymentDrawer} from "@/features/contribution/components/ReceivePaymentDrawer.tsx";
import {useState} from "react";

const MemberContributionDetailPage = () => {
    const {id} = useParams<{ id: string }>();
    const payments:PaymentHistory[] =[];
    const [drawerOpen, setDrawerOpen] = useState(false);
    console.log(id)
    const {
        data,
        isLoading,
        isPending,
        isError,
        refetch,
    } = useGetMemberContribution(
        id ?? ""
    );

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

    const outstandingBalance =0;
        // data.contributionAmount +
        // data.rolledOverContribution +
        // data.rolledOverPenalty;

    return (
        <div className="space-y-8">
             <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                <div>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="mb-4"
                    >
                        <Link to=".." className="flex-shrink-0 flex items-center gap-1">
                            <ArrowLeft className="mr-2 h-4 w-4"/>
                            Back
                        </Link>
                    </Button>
                    <h1 className="text-3xl font-bold tracking-tight">
                        {data.fullName}
                    </h1>
                    <p className="mt-2 text-muted-foreground max-w-2xl">
                        Review the member's contribution balance,
                        penalties, rollover amounts and complete
                        payment history for this contribution period.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <Badge
                        variant={
                            data.status === "PAID"
                                ? "default"
                                : data.status === "PARTIALLY_PAID"
                                    ? "secondary"
                                    : "destructive"
                        }
                        className="px-4 py-2 text-sm"
                    >
                        {data.status.replaceAll("_", " ")}
                    </Badge>
                    <Button onClick={()=>setDrawerOpen(true)}>
                        <Receipt className="mr-2 h-4 w-4"/>
                        Receive Payment
                    </Button>

                </div>

            </div>

            <Separator/>

            {/* Summary */}

            <section>

                <div className="mb-4">

                    <h2 className="text-xl font-semibold">
                        Financial Summary
                    </h2>

                    <p className="text-muted-foreground">
                        Overview of the member's financial status for
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
                className="space-y-6"
            >

                <TabsList>

                    <TabsTrigger value="history">
                        Payment History
                    </TabsTrigger>

                    <TabsTrigger value="member">
                        Member Information
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
                                    value={
                                        <span className="font-semibold text-primary">
                            ETB {outstandingBalance.toLocaleString()}
                        </span>
                                    }
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
                                <Button onClick={() => setDrawerOpen(true)}>
                                    <Receipt className="mr-2 h-4 w-4"/>
                                    Receive Payment
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            {payments?.length ? (
                                <div className="rounded-lg border overflow-hidden">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>
                                                    Receipt #
                                                </TableHead>

                                                <TableHead>
                                                    Payment Date
                                                </TableHead>

                                                <TableHead>
                                                    Amount
                                                </TableHead>

                                                <TableHead>
                                                    Receiver
                                                </TableHead>

                                                <TableHead>
                                                    Remark
                                                </TableHead>

                                            </TableRow>

                                        </TableHeader>

                                        <TableBody>

                                            {payments.map(payment => (

                                                <TableRow key={payment.id}>

                                                    <TableCell className="font-medium">
                                                        {payment.receiptNumber}
                                                    </TableCell>

                                                    <TableCell>
                                                        {new Date(
                                                            payment.paidAt
                                                        ).toLocaleDateString()}
                                                    </TableCell>

                                                    <TableCell>

                                                        <Badge
                                                            variant="secondary"
                                                            className="font-semibold"
                                                        >
                                                            ETB {payment.amount.toLocaleString()}
                                                        </Badge>

                                                    </TableCell>

                                                    <TableCell>
                                                        {payment.receiptId}
                                                    </TableCell>

                                                    <TableCell>

                                                        {payment.note || "-"}

                                                    </TableCell>

                                                </TableRow>

                                            ))}

                                        </TableBody>

                                    </Table>

                                </div>

                            ) : (

                                <div className="flex flex-col items-center justify-center py-20 text-center">

                                    <Receipt className="mb-5 h-14 w-14 text-muted-foreground"/>

                                    <h3 className="text-lg font-semibold">

                                        No Payments Yet

                                    </h3>

                                    <p className="mt-2 max-w-md text-muted-foreground">
                                        This member hasn't made any payments for this
                                        contribution period. Once a payment is received,
                                        it will appear here.
                                    </p>

                                    <Button className="mt-6" onClick={()=>setDrawerOpen(true)}>

                                        <Receipt className="mr-2 h-4 w-4"/>

                                        Receive First Payment

                                    </Button>

                                </div>

                            )}

                        </CardContent>

                    </Card>

                </TabsContent>

                <TabsContent value="member">

                </TabsContent>

                <TabsContent value="history">

                </TabsContent>

            </Tabs>
            <ReceivePaymentDrawer
                open={drawerOpen}
                onOpenChange={setDrawerOpen}
                memberId={id ?? ""}
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

function InfoItem({
                      label,
                      value,
                  }: InfoItemProps) {
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

function StatusBadge({
                         status,
                     }: StatusBadgeProps) {
    switch (status) {
        case "PAID":
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