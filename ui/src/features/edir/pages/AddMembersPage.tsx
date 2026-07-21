import {MemberForm} from "@/features/edir/components/MembersForm.tsx";
import useCreateMember from "../hooks/useCreateMember";
import {useNavigate} from "react-router";
import {useEffect} from "react";

const AddMembersPage = () => {
    const context = useCreateMember();
    const navigate = useNavigate();
        useEffect(()=>{
            if(context.isSuccess){

                navigate("/members")
            }
        },[context.isSuccess])
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