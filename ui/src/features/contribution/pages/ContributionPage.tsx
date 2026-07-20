import EmptyContribution from "@/features/contribution/components/EmptyContribution.tsx";
import {useNavigate} from "react-router";
import {useGetContribution} from "@/features/contribution/hooks/useGetContribution.ts";
import {SpinnerPage} from "@/pages/SpinnerPage.tsx";
import {PageError} from "@/pages/PageError.tsx";
import {Button} from "@/shared/components/ui/button.tsx";
import {ContributionBanner} from "@/features/contribution/components/ContributionBanner.tsx";
import {MemberContributionTable} from "@/features/contribution/components/MemberContributionTable.tsx";
import {useGetMemberContribution} from "@/features/contribution/hooks/useGetMemberContribution.ts";
import {ReceivePaymentDrawer} from "@/features/contribution/components/ReceivePaymentDrawer.tsx";
import type {MemberContribution} from "@/features/contribution/types/contribution.ts";
import {useState} from "react";

const ContributionPage =()=>{
    const navigation = useNavigate()
    const {data,isError,isLoading} = useGetContribution()
    const contributionId = data?.id ?? '';
    const memberContribution= useGetMemberContribution(contributionId)

    const [selectedMember, setSelectedMember] =
        useState<MemberContribution | null>(null);

    const [drawerOpen, setDrawerOpen] =
        useState(false);

    const handleReceivePayment = (
        contribution: MemberContribution
    ) => {
        setSelectedMember(contribution);
        setDrawerOpen(true);
    };

    if(isLoading){
        return <SpinnerPage/>
    }
    if(isError && memberContribution.isError){
        return <PageError/>
    }
    if (data==null){
        return  <EmptyContribution
            onCreate={()=>navigation('/add-contribution')}
        />
    }

    return <div className="space-y-5">
        <ContributionBanner contribution={data}/>
        <div className="flex items-center justify-between">

            <div>

                <h2 className="text-xl font-semibold">

                    Member Contributions

                </h2>

                <p className="text-muted-foreground">

                    Track payment status for each member.

                </p>

            </div>

            <Button variant="outline">

                Export

            </Button>

        </div>

        { memberContribution.data && <MemberContributionTable
            onReceivePayment={handleReceivePayment}
            loading={memberContribution.isLoading}
            onPageChange={() => {
            }}
            pageNumber={1}
            pageSize={10}
            totalElements={memberContribution.data.totalElements}
            data={memberContribution.data.content}/>}

        <ReceivePaymentDrawer
            open={drawerOpen}
            onOpenChange={setDrawerOpen}
            memberId={selectedMember?.memberId ?? ""}
        />

    </div>
}

export default ContributionPage;