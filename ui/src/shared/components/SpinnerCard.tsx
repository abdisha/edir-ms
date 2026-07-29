import {Loader2} from "lucide-react";

interface SpinnerProps {
    size?: number;
    text?:string,
    color?:string
}

export function SpinnerCard({ size = 24,text,color="white" }: SpinnerProps) {
    return (
        <div className="flex flex-col items-center justify-center gap-2 p-4">
            <Loader2
                className="animate-spin text-primary"
                color={color}
                style={{
                    width: size,
                    height: size,
                }}
            />
            {text && (
                <p className="text-sm font-medium text-muted-foreground">{text}</p>
            )}
        </div>
    );
}