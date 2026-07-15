import {Controller, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {CalendarIcon, MapPin} from "lucide-react";
import {format} from "date-fns";

import {type CreateEdirFormValues, createEdirSchema,} from "@/features/edir/edir.schema.ts";

import {Button} from "@/shared/components/ui/button";
import {Input} from "@/shared/components/ui/input";
import {Textarea} from "@/shared/components/ui/textarea";
import {Label} from "@/shared/components/ui/label";
import {Popover, PopoverContent, PopoverTrigger,} from "@/shared/components/ui/popover";
import {Calendar} from "@/shared/components/ui/calendar";
import {SpinnerCard} from "@/shared/components/SpinnerCard.tsx";

interface EdirFormProps {
    defaultValues?: Partial<CreateEdirFormValues>,
    loading?: boolean,
    submitText?: string,

    onSubmit(values: CreateEdirFormValues): void | Promise<void>,

    onCancel(): void | Promise<void>
}

export function EdirForm({
                             defaultValues,
                             loading = false,
                             submitText = "Save",
                             onSubmit,
                             onCancel
                         }: EdirFormProps) {
    const {
        register,
        control,
        handleSubmit,
        formState: {errors},
    } = useForm<CreateEdirFormValues>({
        resolver: zodResolver(createEdirSchema),
        defaultValues: {
            edirName: "",
            establishedDate: new Date(),
            description: "",
            phoneNumber: "",
            address: {city: "", subcity: "", worda: ""},
            ...defaultValues,
        },
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 px-2">
            {/* Header Section */}
            <div className="border-b pb-6">
                <h2 className="text-xl font-semibold text-foreground">Edir Information</h2>
                <p className="text-sm text-muted-foreground">
                    Create or update the profile and configuration details for your organization.
                </p>
            </div>
            <div className={'max-w-full'}>
                <div className="grid gap-8">
                    {/* Basic Info Group */}
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-1">
                        <div className="space-y-2">
                            <Label htmlFor="edirName">Edir Name</Label>
                            <Input
                                aria-label={'edirName'}
                                id="edirName"
                                placeholder="Bole Medhanialem Edir"
                                className={'w-1/3'}
                                {...register("edirName")}
                            />
                            {errors.edirName && (
                                <p className="text-xs text-destructive">{errors.edirName.message}</p>
                            )}
                        </div>

                        {/* Description */}
                        <div className="space-y-2">
                            <Label htmlFor="description">Description

                            </Label>
                            <p className={'text-xs  text-muted-foreground'}>
                                Give more detail description about your edir.
                            </p>
                            <Textarea
                                aria-label={'description'}
                                id="description"
                                rows={4}
                                className="resize-none w-1/2"
                                placeholder="Provide a brief background or purpose of the Edir..."
                                {...register("description")}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="phoneNumber">Phone Number</Label>
                            <Input
                                aria-label={'phoneNumber'}
                                id="phoneNumber"
                                placeholder="+251 911 223344"
                                className={'md:w-1/7 sm:w-1/5'}
                                {...register("phoneNumber")}
                            />
                            {errors.phoneNumber && (
                                <p className="text-xs text-destructive">{errors.phoneNumber.message}</p>
                            )}
                        </div>
                    </div>

                    {/* Date Section */}
                    <div className="space-y-2">
                        <Label>Established Date</Label>
                        <Controller
                            defaultValue={new Date()}
                            rules={{required: true}}

                            name="establishedDate"
                            control={control}
                            render={({field}) => (
                                <Popover>
                                    <PopoverTrigger className={' md:w-1/7 sm:w-1/2'}>
                                        <Button
                                            variant="outline"
                                            className="w-full justify-start text-left   font-normal"
                                        >
                                            <CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground"/>
                                            {field.value ? format(field.value, "PPP") : "Select date"}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-full">
                                        <Calendar
                                            animate={true}
                                            mode="single"
                                            selected={field.value}
                                            onSelect={field.onChange}
                                            captionLayout={'dropdown'}
                                            disabled={(date) => date > new Date()}
                                        />
                                    </PopoverContent>
                                </Popover>
                            )}
                        />
                        {errors.establishedDate && (
                            <p className="text-xs text-destructive">{errors.establishedDate.message}</p>
                        )}
                    </div>

                    {/* Address Section */}
                    <div className="space-y-4 rounded-lg border bg-slate-50/50 p-6">
                        <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-primary"/>
                            <div><h3 className="font-medium">Location Details</h3>
                                <p className={'text-xs font-light'}>Current location can be used to notify members. </p>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                            <div className="space-y-2">
                                <Label htmlFor="city">City</Label>

                                <Input id="city" placeholder={'Addis Ababa'}
                                       aria-label={'city'} {...register("address.city")} />
                                {errors.address?.city && (
                                    <p className="text-xs text-destructive">{errors.address?.city?.message}</p>
                                )}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="subcity">Subcity</Label>
                                <Input placeholder={'Kolfe'} aria-label={'subcity'}
                                       id="subcity" {...register("address.subcity")} />
                                {errors.address?.subcity && (
                                    <p className="text-xs text-destructive">{errors.address?.subcity?.message}</p>
                                )}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="worda">Woreda</Label>
                                <Input placeholder={'01'} aria-label={'worda'}
                                       id="worda" {...register("address.worda")} />
                                {errors.address?.worda && (
                                    <p className="text-xs  text-destructive">{errors.address?.worda?.message}</p>
                                )}
                            </div>
                        </div>
                    </div>


                </div>

                {/* Footer Actions */}
                <div className="flex justify-start border-t pt-6 space-x-2">
                    <Button type="submit" variant={'default'} disabled={loading} size="lg">
                        {loading && <SpinnerCard size={15}/>}
                        {loading ? "Saving..." : submitText}
                    </Button>
                    {submitText != "Create Edir" &&
                        <Button variant={'secondary'} onClick={onCancel} disabled={loading} size="lg">
                            Cancel
                        </Button>
                    }
                </div>

            </div>
        </form>
    );
}