import {LoginForm} from "@/features/auths/components/LoginForm.tsx";
import {useNavigate} from "react-router";
import {useLogin} from "@/features/auths/hooks/useAuth.ts";
import type {LoginFormValues} from "@/features/auths/schemas/login.schema.ts";
import {toast} from "sonner";
import {useAuth} from "@/features/auths/useAuth.tsx";
import {saveAccessToken} from "@/lib/token-storage.ts";

function LoginPage() {
    const navigate = useNavigate();
    const mutation = useLogin();

    const auth=useAuth();

    async function submit(values: LoginFormValues) {
        try {
            const response= await mutation.mutateAsync(values);
            console.log(response)
            saveAccessToken(response.accessToken);
            auth.login({
                 id:response.id,
                email:response.email,
                firstName:"",
                lastName:""
            });

            toast.success("Welcome back! Edir MS");
            console.log("isAuthenticated: "+auth.isAuthenticated)
            navigate("/",{replace:true});
        } catch {
            toast.error("Invalid email or password.");
        }
    }


    return (
      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
          <div className="w-full max-w-sm">
              <LoginForm
                loading={mutation.isPending}
                submit={submit}
              />
         </div>
      </div>
  );
}

export default LoginPage;