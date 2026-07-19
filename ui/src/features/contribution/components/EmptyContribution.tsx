import { PlusCircle } from "lucide-react";

import { Button } from "@/shared/components/ui/button";

interface EmptyContributionProps {
    onCreate?: () => void;
}

export default function EmptyContribution({
                                              onCreate,
                                          }: EmptyContributionProps) {
    return (
        <div className="flex min-h-[65vh] items-center justify-center px-6">
            <div className="mx-auto flex max-w-lg flex-col items-center text-center">

                {/* Icon */}

                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                    <PlusCircle className="h-10 w-10 text-primary" />
                </div>

                {/* Title */}

                <h2 className="text-3xl font-bold tracking-tight">
                    No Contribution Periods
                </h2>

                {/* Description */}

                <p className="mt-3 max-w-md text-muted-foreground">
                    Contribution periods help you collect recurring payments
                    from members. Create your first contribution period to
                    begin tracking monthly contributions.
                </p>

                {/* Action */}

                <Button
                    className="mt-8"
                    size="lg"
                    onClick={onCreate}
                >
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Create Contribution Period
                </Button>

            </div>
        </div>
    );
}