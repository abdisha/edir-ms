import EmptyContribution from "@/features/contribution/components/EmptyContribution.tsx";
import {useNavigate} from "react-router";

const ContributionPage =()=>{
    const navigation = useNavigate()

    return <>
            <EmptyContribution
                onCreate={()=>navigation('/add-contribution')}
            />
            </>
}

export default ContributionPage;