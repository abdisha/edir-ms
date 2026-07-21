import {MemberForm} from "@/features/edir/components/MembersForm.tsx";
import useCreateMember from "../hooks/useCreateMember";
import {useNavigate} from "react-router";
import {useEffect} from "react";
import { PageError } from "@/pages/PageError";
import { SpinnerPage } from "@/pages/SpinnerPage";

const AddMembersPage = () => {
    const context = useCreateMember();
    const navigate = useNavigate();
        useEffect(()=>{
            if(context.isSuccess){

                navigate("/members")
            }
        },[context.isSuccess])

    if (context.isError) {
        return <PageError/>
    }

    if (context.isPending) {
        return <SpinnerPage/>
    }
    return (
        <>
            <MemberForm
                onCancel={() => navigate(-1)}
                loading={context.isPending}
                submitText="Create Member"
                onSubmit={(data) => {
                    context.mutate(data)
                }}
            />
        </>
    )
}

export default AddMembersPage;