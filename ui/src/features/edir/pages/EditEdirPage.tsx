import {EdirForm} from "@/features/edir/components/EdirForm.tsx";
import {useState} from "react";
import {useNavigate} from "react-router";
import type {CreateEdirRequest} from "@/features/edir/types/edir.ts";

const EditEdirPage = () => {
    const [edir] = useState<CreateEdirRequest>(null)
     const navigate = useNavigate();

    return (
        <>
        <EdirForm
            submitText="Save Changes"
            defaultValues={{
                edirName: edir.edirName,
                description: edir.description,
                establishedDate: edir.establishedDate,
                phoneNumber: edir.phoneNumber,
                address: edir.address,
            }}
            onSubmit={(values) => {
                console.log(values);
                navigate('/edirpage');
            }}
        />
        </>
    )
}
export default EditEdirPage;