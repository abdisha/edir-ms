import {Loader2} from "lucide-react";

interface SpinnerProps {
    size?: number;
    text?:string,
    color?:string
}

export function SpinnerCard({ size = 24,text,color="white" }: SpinnerProps) {
    return (
        <div>
            <Loader2
                className="animate-spin text-primary"
                color={color}
                style={{
                    width: size,
                    height: size,
                }}
                string={text}
            />
            {
                text?
                    <p>{text} </p>:null
            }
        </div>

    );
}