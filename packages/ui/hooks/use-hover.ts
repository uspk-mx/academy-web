import { useState, useCallback, useEffect, useRef } from "react";

type UseHoverReturn<T> = [boolean, React.RefObject<T | null>, { onMouseEnter: () => void; onMouseLeave: () => void }];

/**
 * The `useHover` function in TypeScript returns a boolean value indicating whether an element is being
 * hovered over, a React ref object for that element, and mouse event handlers.
 * @returns [boolean, React.RefObject<T | null>, { onMouseEnter: () => void; onMouseLeave: () => void }];
 */
export function useHover<T extends HTMLElement>(): UseHoverReturn<T> {
    const [isHovering, setIsHovering] = useState(false);
    const ref = useRef<T>(null);

    const onMouseEnter = useCallback(() => {
        setIsHovering(true);
    }, []);

    const onMouseLeave = useCallback(() => {
        setIsHovering(false);
    }, []);

    useEffect(() => {
        const node = ref.current;
        if (node) {
            node.addEventListener("mouseenter", onMouseEnter);
            node.addEventListener("mouseleave", onMouseLeave);

            return () => {
                node.removeEventListener("mouseenter", onMouseEnter);
                node.removeEventListener("mouseleave", onMouseLeave);
            };
        }
    }, [onMouseEnter, onMouseLeave]);

    return [isHovering, ref, { onMouseEnter, onMouseLeave }];
}
