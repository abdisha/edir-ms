import {ContributionForm} from "@/features/contribution/components/ContributionForm.tsx";
import {useCreateContribution} from "@/features/contribution/hooks/useCreateContribution.ts";
import {useNavigate} from "react-router";
import type {ContributionFormValues} from "@/features/contribution/schemas/contribution.schema.ts";
import {useEffect} from "react";


const AddContributionPage =()=>{
 const context  = useCreateContribution();
    const navigate = useNavigate();
    useEffect(()=>{
        if(context.isSuccess){

            navigate("/contributions")
        }
    },[context.isSuccess])

    const handleSubmit =(values:ContributionFormValues)=>{
        context.mutate({...values,
            penaltyAmount: values.applyPenalty ? values.penaltyAmount : 0,
            penaltyType: values.applyPenalty ? values.penaltyType : "NONE",
        });
    }

    return <ContributionForm

        onSubmit={handleSubmit}
        isSubmitting={context.isPending}
    />
}

export default AddContributionPage;