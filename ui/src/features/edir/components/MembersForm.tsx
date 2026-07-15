import {MapPin, User} from "lucide-react";
import {Controller, useForm} from "react-hook-form";


import {Card, CardContent, CardDescription, CardHeader, CardTitle,} from "@/shared/components/ui/card.tsx";

import {Button} from "@/shared/components/ui/button.tsx";

import {Input} from "@/shared/components/ui/input.tsx";

import {Label} from "@/shared/components/ui/label.tsx";
import type {Member} from "@/features/edir/types/members.ts";


export type MemberFormValues = Omit<Member, "id">;

interface MemberFormProps {

    defaultValues?: Partial<MemberFormValues>;

    loading?: boolean;

    submitText?: string;

    onSubmit: (
        values: MemberFormValues
    ) => void | Promise<void>;

}




export function MemberForm({
                               defaultValues,
                               loading = false,
                               submitText = "Save Member",
                               onSubmit,
                           }: MemberFormProps) {


    const {
        control,
        handleSubmit,
        formState:{
            errors
        }
    } = useForm<MemberFormValues>({

        defaultValues:{
            firstName:"",
            lastName:"",
            age:0,
            phoneNumber:"",

            address:{
                city:"",
                woreda:"",
                zone:"",
                subcity:""
            },

            ...defaultValues

        }

    });



    return (

        <Card className="mx-auto w-full max-w-4xl shadow-lg">


            <CardHeader>


                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">

                    <User className="h-6 w-6 text-primary"/>

                </div>


                <CardTitle className="mt-4 text-2xl">
                    Member Information
                </CardTitle>


                <CardDescription>
                    Register a new Edir member or update existing member information.
                </CardDescription>


            </CardHeader>



            <CardContent>


                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-8"
                >



                    {/* Personal Information */}

                    <div>

                        <h3 className="mb-4 flex items-center gap-2 font-semibold">

                            <User className="h-5 w-5 text-primary"/>

                            Personal Information

                        </h3>


                        <div className="grid gap-5 md:grid-cols-2">



                            {/* First Name */}

                            <FormInput
                                label="First Name"
                                name="firstName"
                                control={control}
                                error={errors.firstName?.message}
                                placeholder="Abebe"
                            />



                            {/* Last Name */}

                            <FormInput
                                label="Last Name"
                                name="lastName"
                                control={control}
                                error={errors.lastName?.message}
                                placeholder="Kebede"
                            />





                            {/* Age */}

                            <FormInput
                                label="Age"
                                name="age"
                                type="number"
                                control={control}
                                error={errors.age?.message}
                                placeholder="30"
                            />





                            {/* Phone */}

                            <FormInput
                                label="Phone Number"
                                name="phoneNumber"
                                control={control}
                                error={errors.phoneNumber?.message}
                                placeholder="+251911223344"
                            />



                        </div>

                    </div>





                    {/* Address */}

                    <div>


                        <h3 className="mb-4 flex items-center gap-2 font-semibold">

                            <MapPin className="h-5 w-5 text-primary"/>

                            Address

                        </h3>



                        <div className="grid gap-5 md:grid-cols-2">



                            <FormInput

                                label="City"

                                name="address.city"

                                control={control}

                                placeholder="Addis Ababa"

                            />




                            <FormInput

                                label="Subcity"

                                name="address.subcity"

                                control={control}

                                placeholder="Bole"

                            />




                            <FormInput

                                label="Woreda"

                                name="address.woreda"

                                control={control}

                                placeholder="Woreda 03"

                            />





                            <FormInput

                                label="Zone"

                                name="address.zone"

                                control={control}

                                placeholder="Zone 1"

                            />



                        </div>


                    </div>





                    <div className="flex justify-end border-t pt-6">


                        <Button
                            disabled={loading}
                            type="submit"
                        >

                            {submitText}

                        </Button>


                    </div>



                </form>


            </CardContent>


        </Card>

    )

}






interface FormInputProps {

    label:string;

    name:any;

    control:any;

    placeholder?:string;

    type?:string;

    error?:string;

}



function FormInput({
                       label,
                       name,
                       control,
                       placeholder,
                       type="text",
                       error
                   }:FormInputProps){


    return (

        <div className="space-y-2">


            <Label>
                {label}
            </Label>


            <Controller

                name={name}

                control={control}

                render={({field})=>(

                    <Input

                        type={type}

                        placeholder={placeholder}

                        {...field}

                        value={
                            field.value ?? ""
                        }

                    />

                )}

            />


            {
                error && (

                    <p className="text-sm text-destructive">
                        {error}
                    </p>

                )

            }


        </div>


    )

}