import {EdirForm} from "@/features/edir/components/EdirForm.tsx";
import {useState} from "react";
import {useNavigate} from "react-router";
import type {Edir} from "@/features/edir/types/edir.ts";

const EditEdirPage = () => {
    const [edir] = useState<Edir>(null)
     const navigate = useNavigate();

    return (
        <>
        <EdirForm
            submitText="Save Changes"
            defaultValues={{
                name: edir.name,
                description: edir.description,
                establishedYear: edir.establishedYear,
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