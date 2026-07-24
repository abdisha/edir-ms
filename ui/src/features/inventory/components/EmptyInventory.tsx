import {ArrowRight, PackagePlus} from "lucide-react";

import {Button} from "@/shared/components/ui/button";

const EmptyInventory = () => {
    return (
        <div className="flex min-h-[500px] items-center justify-center rounded-xl border border-dashed bg-muted/20 px-6">

            <div className="mx-auto max-w-md text-center">

                <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-2xl bg-primary/10 ring-8 ring-primary/5">

                    <PackagePlus className="h-12 w-12 text-primary" />

                </div>

                <h2 className="mt-8 text-2xl font-bold tracking-tight">
                    Your inventory is empty
                </h2>

                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    No inventory items have been registered yet.
                    Add your first item to start tracking stock,
                    monitor quantities, and manage inventory movements.
                </p>

                <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">

                    <Button size="lg">

                        <PackagePlus className="mr-2 h-5 w-5" />

                        Add First Item

                    </Button>

                    <Button
                        size="lg"
                        variant="outline"
                    >

                        Learn More

                        <ArrowRight className="ml-2 h-4 w-4" />

                    </Button>

                </div>

                <div className="mt-10 grid grid-cols-3 gap-4 text-center">

                    <div>

                        <p className="text-lg font-semibold">
                            📦
                        </p>

                        <p className="mt-2 text-xs text-muted-foreground">
                            Track Stock
                        </p>

                    </div>

                    <div>

                        <p className="text-lg font-semibold">
                            📈
                        </p>

                        <p className="mt-2 text-xs text-muted-foreground">
                            Monitor Levels
                        </p>

                    </div>

                    <div>

                        <p className="text-lg font-semibold">
                            🔄
                        </p>

                        <p className="mt-2 text-xs text-muted-foreground">
                            Record Movement
                        </p>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default EmptyInventory;