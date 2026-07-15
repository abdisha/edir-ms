import {MemberForm} from "@/features/edir/components/MembersForm.tsx";

const AddMembersPage =()=>{
    return (
        <>
            <MemberForm
                submitText="Create Member"
                onSubmit={(data)=>{
                    console.log(data);
                }}
                />
            </>
    )
}

export default AddMembersPage;