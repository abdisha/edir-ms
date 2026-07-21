import {RegisterForm} from "@/features/auths/components/RegisterForm.tsx";
import type {RegisterFormValues} from "@/features/auths/schemas/register.schema.ts";
import {toast} from "sonner";
import {useNavigate} from "react-router";
import {useRegister} from "@/features/auths/hooks/useAuth.ts";
import {Button} from "@/shared/components/ui/button";

function RegisterPage() {

    const navigate = useNavigate();

    const mutation = useRegister();
    const submit = async (
        values: RegisterFormValues
    ) => {

        try {
            await mutation.mutateAsync(values);
            toast.success(
                "Account created successfully."
            );
            navigate("/login");
        } catch {
            toast.error(
                "Registration failed."
            );
        }

    };
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 bg-slate-50">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <header className="mb-6">
          <h1 className="text-2xl font-semibold leading-tight">Create your account</h1>
          <p className="text-sm text-muted-foreground mt-1">Join us — create an account to get started.</p>
        </header>

        <RegisterForm
          loading={mutation.isPending}
          submit={submit}
        />

        <div className="mt-6 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">Already have an account?</p>
          <Button
            variant="link"
            onClick={() => navigate('/login')}
          >
            Back to Login
          </Button>
        </div>
      </div>
    </div>
  );
}
export default RegisterPage