import {useEffect, useState} from "react";


export function useDelayedLoading(isLoading: boolean, delay = 100) {
    const [showLoading, setShowLoading] = useState(false);

    useEffect(() => {
        // If not loading, reset immediately
        if (!isLoading) {
            setShowLoading(false);
            return;
        }

        // If loading, start the timer
        const timer = setTimeout(() => {
            setShowLoading(true);
        }, delay);

        // Cleanup: clears timer if isLoading becomes false or component unmounts
        return () => clearTimeout(timer);
    }, [isLoading, delay]);

    return showLoading;
}