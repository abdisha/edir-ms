import {AlertTriangle} from "lucide-react";
import {Button} from "@/shared/components/ui/button";

interface PageErrorProps {
    title?: string;
    description?: string;
    onRetry?: () => void;
}

export function PageError({
                              title = "Something went wrong",
                              description = "We couldn't load this page.",
                              onRetry,
                          }: PageErrorProps) {
    return (
        <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
            <div className="max-w-md text-center space-y-4">

                <AlertTriangle className="mx-auto h-14 w-14 text-destructive" />

                <h2 className="text-2xl font-semibold">
                    {title}
                </h2>

                <p className="text-muted-foreground">
                    {description}
                </p>

                {onRetry && (
                    <Button onClick={onRetry}>
                        Try Again
                    </Button>
                )}

            </div>
        </div>
    );
}