import { useState } from "react";

const useModal = (initial = false) => {
    const [open, setOpen] = useState(initial);

    const show = () => setOpen(true);
    const close = () => setOpen(false);

    return { open, show, close };
};

export default useModal;
