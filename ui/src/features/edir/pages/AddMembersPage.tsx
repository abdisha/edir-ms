import {MemberForm} from "@/features/edir/components/MembersForm.tsx";
import useCreateMember from "../hooks/useCreateMember";
import {useNavigate} from "react-router";

const AddMembersPage = () => {
    const context = useCreateMember();
    const navigate = useNavigate();

    return (
        <>
            <MemberForm
                onCancel={() => navigate(-1)}
                loading={context.isPending}
                submitText="Create Member"
                onSubmit={(data) => {
                    context.mutate(data);
                }}
                onSuccess={() => navigate("/members")}
            />
        </>
    )
}

export default AddMembersPage;