import {MemberForm} from "@/features/edir/components/MembersForm.tsx";

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
    return (
        <MemberForm
            defaultValues={member}
            submitText="Update Member"
            onSubmit={(data)=>{

                console.log(data);
            }}

        />
    )
}

export default EditMembersPage;