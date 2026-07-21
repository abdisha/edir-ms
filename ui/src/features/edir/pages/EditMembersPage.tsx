import {MemberForm} from "@/features/edir/components/MembersForm.tsx";
import {useNavigate} from "react-router";

const member= {

    firstName: "Abebe",
    lastName: "Kebede",
    age: 35,
    phoneNumber: "0911223344",

    address: {
        city: "Addis Ababa",
        subcity: "Bole",
        woreda: "03",
        zone: "1"
    }
}


const EditMembersPage =()=>{
    const navigate = useNavigate();

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