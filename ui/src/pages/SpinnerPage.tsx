import {Loader2} from "lucide-react";

interface PageSpinnerProps {
    message?: string;
}

export function SpinnerPage({
                                message = "Loading...",
                            }: PageSpinnerProps) {
    return (
        <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
            <div className="flex flex-col items-center gap-4">
                <Loader2 className="h-10 w-10 animate-spin text-primary" />

                <div className="text-center">
                    <p className="text-lg font-medium">{message}</p>
                    <p className="text-sm text-muted-foreground">
                        Please wait while we fetch your data.
                    </p>
                </div>
            </div>
        </div>
    );
}