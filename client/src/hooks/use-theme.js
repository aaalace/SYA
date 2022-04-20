import {useLayoutEffect, useState} from "react";

export const useTheme = () => {
    const [theme, setTheme] = useState(false)
    // false - light
    // true - dark

    useLayoutEffect(() => {
        document.documentElement.setAttribute('data-theme', theme ? 'dark': 'light')
    }, [theme])

    return { theme, setTheme }
}