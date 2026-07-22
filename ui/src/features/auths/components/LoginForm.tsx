import {Eye, EyeOff, Handshake, Loader2, Lock, Mail} from "lucide-react";
import {useState} from "react";
import {Link} from "react-router";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

import {type LoginFormValues, loginSchema} from "../schemas/login.schema";

import {Button} from "@/shared/components/ui/button";
import {Input} from "@/shared/components/ui/input";
import {Field, FieldError, FieldLabel} from "@/shared/components/ui/field";
import {Card} from "@/shared/components/ui/card";
import {Separator} from "@/shared/components/ui/separator";

interface LoginFormProp {
  submit: (loginFormValues: LoginFormValues) => Promise<void>;
  loading: boolean;
}

export function LoginForm({ submit, loading }: LoginFormProp) {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),

    defaultValues: {
      email: "asresabdi@gmail.com ",
      password: "Hidden123!",
    },
  });

  return (
    <div className="space-y-6">
      {/* Logo Section */}
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="rounded-full bg-gradient-to-br from-primary/20 to-primary/5 p-6 shadow-lg">
          <Handshake className="h-12 w-12 text-primary" />
        </div>
        <div className="text-center">
          <h1 className="text-2xl font-bold">Edir Management System</h1>
          <p className="text-sm text-muted-foreground mt-2">
            Community Support & Mutual Aid Platform
          </p>
        </div>
      </div>

      {/* Login Card */}
      <Card className="p-6 md:p-8 shadow-lg border">
        <form onSubmit={form.handleSubmit(submit)} className="space-y-6">
          {/* Header */}
          <div className="space-y-2">
            <h2 className="text-2xl font-bold">Welcome Back</h2>
            <p className="text-sm text-muted-foreground">
              Sign in to your account to access the Edir management portal. Manage members,
              contributions, and community events efficiently.
            </p>
          </div>

          <Separator />

          {/* Email Field */}
          <Field>
            <FieldLabel>Email Address</FieldLabel>

            <div className="relative">
              <Mail className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />

              <Input
                className="pl-10 h-10 transition-all focus:ring-2 focus:ring-primary/20"
                type="email"
                placeholder="john@example.com"
                {...form.register("email")}
              />
            </div>

            <FieldError errors={[form.formState.errors.email]} />
          </Field>

          {/* Password Field */}
          <Field>
            <div className="flex items-center justify-between gap-2">
              <FieldLabel>Password</FieldLabel>
              <Link
                to="/forgot-password"
                className="text-xs text-primary hover:underline font-medium transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />

              <Input
                className="pl-10 pr-10 h-10 transition-all focus:ring-2 focus:ring-primary/20"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                {...form.register("password")}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3.5 text-muted-foreground hover:text-foreground transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>

            <FieldError errors={[form.formState.errors.password]} />
          </Field>

          {/* Remember Me */}
          <div className="flex items-center">
            <label className="inline-flex items-center text-sm cursor-pointer group">
              <input
                type="checkbox"
                className="mr-2.5 h-4 w-4 rounded border border-input bg-background transition-colors checked:bg-primary checked:border-primary cursor-pointer"
                name="remember"
              />
              <span className="text-foreground group-hover:text-primary transition-colors">
                Keep me signed in
              </span>
            </label>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full h-10 font-semibold text-base"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing in...
              </>
            ) : (
              "Sign In"
            )}
          </Button>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-3 text-muted-foreground font-medium">
                New to Edir MS?
              </span>
            </div>
          </div>

          {/* Registration Link */}
          <Button variant="outline" className="w-full h-10 font-semibold">
            <Link to="/register">Create New Account</Link>
          </Button>

          {/* Footer Info */}
          <p className="text-xs text-center text-muted-foreground">
            By signing in, you agree to our{" "}
            <a href="#" className="text-primary hover:underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-primary hover:underline">
              Privacy Policy
            </a>
          </p>
        </form>
      </Card>
    </div>
  );
}