import {LoginForm} from "@/features/auths/components/LoginForm.tsx";

function LoginPage() {
  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   console.log("Login form submitted");
  //   // Implement login logic here
  // };

  return (
      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
          <div className="w-full max-w-sm">
              <LoginForm />
         </div>
      </div>
  );
}

export default LoginPage;