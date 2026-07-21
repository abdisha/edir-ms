import {Loader2, Lock, Mail, User} from "lucide-react";

import {useForm} from "react-hook-form";

import {zodResolver} from "@hookform/resolvers/zod";

import {type RegisterFormValues, registerSchema,} from "../schemas/register.schema";


import {Button} from "@/shared/components/ui/button";
import {Input} from "@/shared/components/ui/input";

import {Field, FieldError, FieldLabel,} from "@/shared/components/ui/field";

interface RegisterFormProp {
    submit: (values: RegisterFormValues) => Promise<void>
    loading: boolean
}

export function RegisterForm({submit, loading = false}: RegisterFormProp) {


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

        <form
            onSubmit={form.handleSubmit(submit)}
            className="space-y-6"
        >
            <div className="grid gap-5 md:grid-cols-2">

                <Field>

                    <FieldLabel>

                        First Name

                    </FieldLabel>

                    <div className="relative">

                        <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground"/>

                        <Input

                            className="pl-10"

                            placeholder="John"

                            {...form.register("firstName")}

                        />

                    </div>

                    <FieldError
                        errors={[form.formState.errors.firstName]}
                    />

                </Field>

                <Field>

                    <FieldLabel>

                        Last Name

                    </FieldLabel>

                    <div className="relative">

                        <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground"/>

                        <Input

                            className="pl-10"

                            placeholder="Doe"

                            {...form.register("lastName")}

                        />

                    </div>

                    <FieldError
                        errors={[form.formState.errors.lastName]}
                    />

                </Field>

            </div>
            <Field>

                <FieldLabel>

                    Email Address

                </FieldLabel>

                <div className="relative">

                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground"/>

                    <Input

                        type="email"

                        placeholder="john@example.com"

                        className="pl-10"

                        {...form.register("email")}
                    />
                </div>
                <FieldError
                    errors={[form.formState.errors.email]}
                />
            </Field>
            <Field>

                <FieldLabel>

                    Password

                </FieldLabel>

                <div className="relative">

                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground"/>

                    <Input

                        type="password"

                        placeholder="••••••••"

                        className="pl-10"

                        {...form.register("password")}

                    />

                </div>

                <FieldError
                    errors={[form.formState.errors.password]}
                />

            </Field>

            <Field>

                <FieldLabel>

                    Confirm Password

                </FieldLabel>

                <div className="relative">

                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground"/>

                    <Input

                        type="password"

                        placeholder="••••••••"

                        className="pl-10"

                        {...form.register("confirmPassword")}

                    />

                </div>

                <FieldError
                    errors={[form.formState.errors.confirmPassword]}
                />

            </Field>

            <Button
                type="submit"
                className="w-full"

                disabled={loading}

            >

                {loading ? (

                    <>

                        <Loader2 className="mr-2 h-4 w-4 animate-spin"/>

                        Creating Account...

                    </>

                ) : (

                    "Create Account"

                )}

            </Button>

        </form>

    );
}