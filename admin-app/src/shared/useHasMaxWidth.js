import { useEffect, useState } from "react";

/* function useMedia(query) {
    const [match, setMatch] = useState(false)

    useEffect(() => {
        const mediaQueryList = window.matchMedia(query)
        mediaQueryList.addEventListener('change', () => {
            console.log('width changed')
            setMatch(Boolean(mediaQueryList.matches))
        })
    }, [query])

    return match
} */

export function useHasMaxWidth(limit) {
    const [match, setMatch] = useState(window.matchMedia(`(max-width: ${limit}px)`).matches)

    useEffect(() => {
        const mediaQuery = window.matchMedia(`(max-width: ${limit}px)`)
        const changeHandler = () => {
            setMatch(mediaQuery.matches)
            //console.log(mediaQuery.matches);
        }
        mediaQuery.addEventListener('change', changeHandler)

        return () => mediaQuery.removeEventListener('change', changeHandler)

    }, [limit])

    return match
}
