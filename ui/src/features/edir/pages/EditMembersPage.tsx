import {MemberForm} from "@/features/edir/components/MembersForm.tsx";
import {useNavigate, useParams} from "react-router";
import {useGetMember} from "@/features/edir/hooks/useGetMembers.ts";
import {SpinnerPage} from "@/pages/SpinnerPage.tsx";
import {PageError} from "@/pages/PageError.tsx";


const EditMembersPage =()=>{
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { data: member, isPending, isError, refetch } = useGetMember(id || "");


    if (isPending) {
        return <SpinnerPage message="Loading member details..." />;
    }

    if (isError || !member) {
        return (
            <PageError
                title="Member not found"
                description="The member you're looking for doesn't exist or could not be loaded."
                onRetry={() => refetch()}
            />
        );
    }

    return (
        <MemberForm
            defaultValues={member}
            submitText="Update Member"
            onSubmit={(data)=>{

                console.log(data);
            }}
            onCancel={() => navigate(-1)}
            onSuccess={() => navigate("/members")}
        />
    )
}

export default EditMembersPage;