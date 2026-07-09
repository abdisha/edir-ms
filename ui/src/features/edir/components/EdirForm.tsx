import {CalendarDays, Users} from "lucide-react";
import {Controller, useForm} from "react-hook-form";

import {Button} from "@/shared/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/shared/components/ui/card";
import {Input} from "@/shared/components/ui/input";
import {Label} from "@/shared/components/ui/label";
import {Textarea} from "@/shared/components/ui/textarea";

export interface EdirFormValues {
    name: string;
    description: string;
    establishedYear: number;
}

interface EdirFormProps {
    defaultValues?: Partial<EdirFormValues>;
    loading?: boolean;
    submitText?: string;
    onSubmit: (values: EdirFormValues) => void | Promise<void>;
}

export function EdirForm({
                             defaultValues,
                             loading = false,
                             submitText = "Save",
                             onSubmit,
                         }: EdirFormProps) {
    const {
        control,
        handleSubmit,
        formState: {errors},
    } = useForm<EdirFormValues>({
        defaultValues: {
            name: "",
            description: "",
            establishedYear: new Date().getFullYear(),
            ...defaultValues,
        },
    });

    return (
        <Card className="mx-auto w-full max-w-3xl">
            <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                    <Users className="h-6 w-6 text-primary"/>
                </div>

                <CardTitle>Edir Information</CardTitle>

                <CardDescription>
                    Configure your Edir information.
                </CardDescription>
            </CardHeader>

            <CardContent>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-6"
                >
                    {/* Name */}
                    <div className="space-y-2">
                        <Label htmlFor="name">Edir Name</Label>

                        <Controller
                            name="name"
                            control={control}
                            rules={{
                                required: "Edir name is required",
                            }}
                            render={({field}) => (
                                <Input
                                    id="name"
                                    aria-label={'Edir Name'}
                                    placeholder="Bole Medhanialem Edir"
                                    {...field}
                                />
                            )}
                        />

                        {errors.name && (
                            <p className="text-sm font-light text-destructive">
                                {errors.name.message}
                            </p>
                        )}
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                        <Label htmlFor="description">
                            Description
                        </Label>

                        <Controller
                            name="description"
                            control={control}
                            render={({field}) => (
                                <Textarea
                                    id="description"
                                    aria-label={'Edir Description'}
                                    rows={5}
                                    placeholder="Describe your Edir..."
                                    {...field}
                                />
                            )}
                        />
                    </div>

                    {/* Established Year */}
                    <div className="space-y-2">
                        <Label htmlFor="establishedYear">
                            Established Year
                        </Label>

                        <div className="relative">
                            <CalendarDays
                                className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"/>

                            <Controller
                                name="establishedYear"
                                control={control}
                                rules={{
                                    required: "Established year is required",
                                    min: {
                                        value: 1900,
                                        message: "Invalid year",
                                    },
                                }}
                                render={({field}) => (
                                    <Input
                                        {...field}
                                        id="establishedYear"
                                        aria-label={'Edir Established Year'}
                                        type="number"
                                        className="pl-10"
                                        value={field.value ?? ""}
                                        onChange={(e) =>
                                            field.onChange(Number(e.target.value))
                                        }
                                    />
                                )}
                            />
                        </div>

                        {errors.establishedYear && (
                            <p className="text-sm font-light text-destructive">
                                {errors.establishedYear.message}
                            </p>
                        )}
                    </div>

                    <div className="flex justify-end">
                        <Button
                            type="submit"
                            disabled={loading}
                            onClick={() => {

                            }
                            }
                        >
                            {submitText}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}