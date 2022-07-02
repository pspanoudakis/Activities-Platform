import { useEffect } from "react";

export function useToggleBodyScroll(canScroll) {
    useEffect(() => {
        if (canScroll) {
            document.body.style.overflow = 'unset'
        }
        else {
            document.body.style.overflow = 'hidden'
        }
    }, [canScroll])
}