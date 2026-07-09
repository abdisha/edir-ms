import {EdirForm} from "@/features/edir/components/EdirForm.tsx";

import {useNavigate} from "react-router";

const SetupEdirPage = () => {
     const navigation = useNavigate();
    return (
        // SetupEdirPage.tsx

        <EdirForm
            submitText="Create Edir"
            onSubmit={(values) => {
                console.log(values);
                navigation('/edirpage');
            }}
        />
    );
};

export default SetupEdirPage;