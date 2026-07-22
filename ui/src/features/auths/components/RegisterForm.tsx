import {Eye, EyeOff, Handshake, Loader2, Lock, Mail, User} from "lucide-react";
import {useState} from "react";
import {Link} from "react-router";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

import {type RegisterFormValues, registerSchema} from "../schemas/register.schema";

import {Button} from "@/shared/components/ui/button";
import {Input} from "@/shared/components/ui/input";
import {Field, FieldError, FieldLabel} from "@/shared/components/ui/field";
import {Card} from "@/shared/components/ui/card";
import {Separator} from "@/shared/components/ui/separator";

interface RegisterFormProp {
    submit: (values: RegisterFormValues) => Promise<void>;
    loading: boolean;
}

export function RegisterForm({ submit, loading = false }: RegisterFormProp) {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const form = useForm<RegisterFormValues>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
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

            {/* Register Card */}
            <Card className="p-6 md:p-8 shadow-lg border bg-white">
                <form onSubmit={form.handleSubmit(submit)} className="space-y-5">
                    {/* Header */}
                    <div className="space-y-2">
                        <h2 className="text-2xl font-bold">Create an Account</h2>
                        <p className="text-sm text-muted-foreground">
                            Join our community support platform and manage members, contributions, and aid programs together.
                        </p>
                    </div>

                    <Separator />

                    {/* Name Fields (Grid layout for symmetry) */}
                    <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                        {/* First Name */}
                        <Field>
                            <FieldLabel>First Name</FieldLabel>
                            <div className="relative">
                                <User className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    className="pl-10 h-10 transition-all focus:ring-2 focus:ring-primary/20"
                                    placeholder="John"
                                    {...form.register("firstName")}
                                />
                            </div>
                            <FieldError errors={[form.formState.errors.firstName]} />
                        </Field>

                        {/* Last Name */}
                        <Field>
                            <FieldLabel>Last Name</FieldLabel>
                            <div className="relative">
                                <User className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    className="pl-10 h-10 transition-all focus:ring-2 focus:ring-primary/20"
                                    placeholder="Doe"
                                    {...form.register("lastName")}
                                />
                            </div>
                            <FieldError errors={[form.formState.errors.lastName]} />
                        </Field>
                    </div>

                    {/* Email Field */}
                    <Field>
                        <FieldLabel>Email Address</FieldLabel>
                        <div className="relative">
                            <Mail className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                type="email"
                                placeholder="john@example.com"
                                className="pl-10 h-10 transition-all focus:ring-2 focus:ring-primary/20"
                                {...form.register("email")}
                            />
                        </div>
                        <FieldError errors={[form.formState.errors.email]} />
                    </Field>

                    {/* Password Field */}
                    <Field>
                        <FieldLabel>Password</FieldLabel>
                        <div className="relative">
                            <Lock className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••"
                                className="pl-10 pr-10 h-10 transition-all focus:ring-2 focus:ring-primary/20"
                                {...form.register("password")}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-3.5 text-muted-foreground hover:text-foreground transition-colors"
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                        </div>
                        <FieldError errors={[form.formState.errors.password]} />
                    </Field>

                    {/* Confirm Password Field */}
                    <Field>
                        <FieldLabel>Confirm Password</FieldLabel>
                        <div className="relative">
                            <Lock className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="••••••••"
                                className="pl-10 pr-10 h-10 transition-all focus:ring-2 focus:ring-primary/20"
                                {...form.register("confirmPassword")}
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-3 top-3.5 text-muted-foreground hover:text-foreground transition-colors"
                                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                            >
                                {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                        </div>
                        <FieldError errors={[form.formState.errors.confirmPassword]} />
                    </Field>

                    {/* Submit Button */}
                    <Button
                        type="submit"
                        className="w-full h-10 font-semibold text-base mt-2"
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Creating Account...
                            </>
                        ) : (
                            "Create Account"
                        )}
                    </Button>

                    {/* Divider */}
                    <div className="relative my-4">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-white px-3 text-muted-foreground font-medium">
                                Already have an account?
                            </span>
                        </div>
                    </div>

                    {/* Back to Login Button */}
                    <Button variant="outline" className="w-full h-10 font-semibold">
                        <Link to="/login" className="w-full h-full flex items-center justify-center">Sign In</Link>
                    </Button>

                    {/* Footer Info */}
                    <p className="text-xs text-center text-muted-foreground mt-4">
                        By creating an account, you agree to our{" "}
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
