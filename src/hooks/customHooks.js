import { useEffect, useRef } from "react";

const usePrevious = (value) => {
    const ref = useRef(); // initial value is undefined
    useEffect(() => { // remember useEffect will be triggered after render function of parent Component
        ref.current = value;
    }, [value]);

    return ref.current;
}

export default usePrevious;