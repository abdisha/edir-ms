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

interface EdirFormProps {
    defaultValues?: Partial<CreateEdirFormValues>;
    loading?: boolean;
    submitText?: string;
    onSubmit(values: CreateEdirFormValues): void | Promise<void>;
}

export function EdirForm({
                             defaultValues,
                             loading = false,
                             submitText = "Save",
                             onSubmit,
                         }: EdirFormProps) {
    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<CreateEdirFormValues>({
        resolver: zodResolver(createEdirSchema),
        defaultValues: {
            edirName: "",
            establishedDate: new Date(),
            description: "",
            phoneNumber: "",
            address: { city: "", subcity: "", worda: "" },
            ...defaultValues,
        },
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="mx-auto max-w-3xl space-y-8">
            {/* Header Section */}
            <div className="border-b pb-6">
                <h2 className="text-xl font-semibold text-foreground">Edir Information</h2>
                <p className="text-sm text-muted-foreground">
                    Update the profile and configuration details for your organization.
                </p>
            </div>

            <div className="grid gap-8">
                {/* Basic Info Group */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                        <Label htmlFor="edirName">Edir Name</Label>
                        <Input
                            aria-label={'edirName'}
                            id="edirName"
                            placeholder="Bole Medhanialem Edir"
                            {...register("edirName")}
                        />
                        {errors.edirName && (
                            <p className="text-xs text-destructive">{errors.edirName.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="phoneNumber">Phone Number</Label>
                        <Input
                            aria-label={'phoneNumber'}
                            id="phoneNumber"
                            placeholder="+251 911 223344"
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
                        name="establishedDate"
                        control={control}
                        render={({ field }) => (
                            <Popover>
                                <PopoverTrigger className={'w-1/2'}>
                                    <Button
                                        variant="outline"
                                        className="w-full justify-start text-left font-normal md:w-1/2"
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                                        {field.value ? format(field.value, "PPP") : "Select date"}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-full p-0">
                                    <Calendar
                                        mode="single"
                                        selected={field.value}
                                        onSelect={field.onChange}
                                        disabled={(date) => date > new Date()}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        )}
                    />
                </div>

                {/* Address Section */}
                <div className="space-y-4 rounded-lg border bg-slate-50/50 p-6">
                    <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-primary" />
                        <h3 className="font-medium">Location Details</h3>
                    </div>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                        <div className="space-y-2">
                            <Label htmlFor="city">City</Label>
                            <Input id="city" aria-label={'city'} {...register("address.city")} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="subcity">Subcity</Label>
                            <Input aria-label={'subcity'} id="subcity" {...register("address.subcity")} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="worda">Woreda</Label>
                            <Input aria-label={'worda'} id="worda" {...register("address.worda")} />
                        </div>
                    </div>
                </div>

                {/* Description */}
                <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                        aria-label={'description'}
                        id="description"
                        rows={4}
                        className="resize-none"
                        placeholder="Provide a brief background or purpose of the Edir..."
                        {...register("description")}
                    />
                </div>
            </div>

            {/* Footer Actions */}
            <div className="flex justify-end border-t pt-6">
                <Button type="submit" disabled={loading} size="lg">
                    {loading ? "Saving..." : submitText}
                </Button>
            </div>
        </form>
    );
}