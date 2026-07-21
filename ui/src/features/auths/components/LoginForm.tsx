import {Eye, EyeOff, Loader2, Lock, Mail} from "lucide-react";
import {useState} from "react";
import {Link} from "react-router";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

import {type LoginFormValues, loginSchema,} from "../schemas/login.schema";

import {Button} from "@/shared/components/ui/button";
import {Input} from "@/shared/components/ui/input";
import {Field, FieldError, FieldLabel,} from "@/shared/components/ui/field";

interface LoginFormProp {
    submit:(loginFormValues:LoginFormValues)=>Promise<void>
    loading:boolean
}

export function LoginForm({submit,loading}:LoginFormProp) {
    const [showPassword, setShowPassword] =
        useState(false);

    const form = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),

        defaultValues: {
            email: "asresabdi@gmail.com ",
            password: "Hidden123!",
        },
    });


    return (
        <form
            onSubmit={form.handleSubmit(submit)}
            className="space-y-6"
        >
            <div className="mb-2">
                <h2 className="text-lg font-semibold">Sign in to your account</h2>
                <p className="text-sm text-muted-foreground">Enter your email and password to continue.</p>
            </div>

            {/* Email */}
            <Field>
                <FieldLabel>Email Address</FieldLabel>

                <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

                    <Input
                        className="pl-10"
                        type="email"
                        placeholder="john@example.com"
                        {...form.register("email")}
                    />
                </div>

                <FieldError
                    errors={[form.formState.errors.email]}
                />
            </Field>

            {/* Password */}
            <Field>
                <div className="flex items-center justify-between">
                    <FieldLabel>Password</FieldLabel>
                    <Link
                        to="/forgot-password"
                        className="text-sm text-primary hover:underline"
                    >
                        Forgot password?
                    </Link>
                </div>

                <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

                    <Input
                        className="pl-10 pr-10"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        {...form.register("password")}
                    />

                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-muted-foreground"
                        aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                        {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                        ) : (
                            <Eye className="h-4 w-4" />
                        )}
                    </button>
                </div>

                <FieldError
                    errors={[form.formState.errors.password]}
                />
            </Field>

            {/* Remember + Submit row */}
            <div className="flex items-center justify-between">
                <label className="inline-flex items-center text-sm">
                    <input type="checkbox" className="mr-2 h-4 w-4 rounded border" name="remember" />
                    Remember me
                </label>

                <Button type="submit" className="ml-4" disabled={loading}>
                    {loading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Signing In...
                        </>
                    ) : (
                        "Sign In"
                    )}
                </Button>
            </div>

            {/* Divider */}
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-3 text-muted-foreground">Or</span>
                </div>
            </div>

            {/* Registration Link */}
            <Button variant="outline" className="w-full">
                <Link to="/register">Create a New Account</Link>
            </Button>
        </form>
    );
}