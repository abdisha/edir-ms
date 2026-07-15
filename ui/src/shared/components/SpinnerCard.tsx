import {Loader2} from "lucide-react";

interface SpinnerProps {
    size?: number;
}

export function SpinnerCard({ size = 24 }: SpinnerProps) {
    return (
        <Loader2
            className="animate-spin text-primary"
            style={{
                width: size,
                height: size,
            }}
        />
    );
}