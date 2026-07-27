import {useState} from "react";

export function useFormDrawer() {

    const [open, setOpen] = useState(false);

    return {

        open,

        openDrawer: () => setOpen(true),

        closeDrawer: () => setOpen(false),

        setOpen,

    };

}