import {ContributionForm} from "@/features/contribution/components/ContributionForm.tsx";
import {useCreateContribution} from "@/features/contribution/hooks/useCreateContribution.ts";


const AddContributionPage =()=>{
 const context  = useCreateContribution();

    return <ContributionForm

        onSubmit={(values)=>{
            context.mutate({...values,
                penaltyAmount: values.applyPenalty ? values.penaltyAmount : 0,
                penaltyType: values.applyPenalty ? values.penaltyType : "NONE",
            })
        }}
        isSubmitting={context.isPending}
    />
}

export default AddContributionPage;