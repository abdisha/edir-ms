import {RegisterForm} from "@/features/auths/components/RegisterForm.tsx";
import type {RegisterFormValues} from "@/features/auths/schemas/register.schema.ts";
import {toast} from "sonner";
import {useNavigate} from "react-router";
import {useRegister} from "@/features/auths/hooks/useAuth.ts";

function RegisterPage() {
    const navigate = useNavigate();
    const mutation = useRegister();

    const submit = async (values: RegisterFormValues) => {
        try {
            await mutation.mutateAsync(values);
            toast.success("Account created successfully.");
            navigate("/login");
        } catch {
            toast.error("Registration failed.");
        }
    };

    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 bg-slate-50">
            <div className="w-full max-w-md">
                <RegisterForm
                    loading={mutation.isPending}
                    submit={submit}
                />
            </div>
        </div>
    );
}

export default RegisterPage;
