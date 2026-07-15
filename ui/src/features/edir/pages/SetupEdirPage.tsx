import {EdirForm} from "@/features/edir/components/EdirForm.tsx";

import {useNavigate} from "react-router";
import {useCreateEdir} from "@/features/edir/hooks/useCreateEdir.ts";
import {useEffect} from "react";

const SetupEdirPage = () => {
     const navigation = useNavigate();
    const createMutation = useCreateEdir();
    useEffect(()=>{
        if(createMutation.isSuccess) {
            navigation('/edirpage');
        }
    },[createMutation.isSuccess])
    return (
        // SetupEdirPage.tsx

        <EdirForm
            loading={createMutation.isPending}
            submitText="Create Edir"
            onSubmit={(values) => {
                createMutation.mutate(values);

            }}
        />
    );
};

export default SetupEdirPage;