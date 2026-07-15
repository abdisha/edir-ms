import {EdirForm} from "@/features/edir/components/EdirForm.tsx";
import {useNavigate} from "react-router";
import {useEdir} from "@/features/edir/hooks/useEdir.ts";
import {SpinnerPage} from "@/pages/SpinnerPage.tsx";
import {PageError} from "@/pages/PageError.tsx";
import {useUpdateEdir} from "@/features/edir/hooks/useUpdateEdir.ts";
import {useEffect} from "react";

const EditEdirPage = () => {
     const navigate = useNavigate();
    const{data,isLoading,isError}=useEdir();
    const context=useUpdateEdir()

    useEffect(()=>{
        if(context.isSuccess){
            navigate("/home");
        }
    },[context.isSuccess])

    if(isLoading){
        return <SpinnerPage/>
    }
    if(isError){
        return <PageError/>
    }


    return (
        <>
        <EdirForm
            submitText="Save Changes"
            defaultValues={{
                edirName: data.edirName,
                description: data.description,
                establishedDate: data.establishedDate,
                phoneNumber: data.phoneNumber,
                address: {
                    city: data.city,
                    subcity: data.subcity,
                    worda: data.worda,
                },
            }}
            onCancel={()=>navigate('/home')}
            onSubmit={(values) => {
                 context.mutate({
                    id: data.uuid,
                    edirName: values.edirName,
                    description: values.description,
                    establishedDate: values.establishedDate,
                    phoneNumber:values.phoneNumber,
                    address:{
                        city:values.address.city,
                        subcity:values.address.subcity,
                        worda:values.address.worda,
                    }
                });
            }}
        />
        </>
    )
}
export default EditEdirPage;