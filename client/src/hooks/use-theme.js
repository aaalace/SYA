import { useLayoutEffect, useState } from 'react'

const isDarkTheme = window?.matchMedia('(prefers-color-scheme: dark)').matches
const defaultTheme = isDarkTheme;

export const useTheme = () => {
    const [theme, setTheme] = useState(
        localStorage.getItem('app-theme') || defaultTheme
    )
    // false - light
    // true - dark

    useLayoutEffect(() => {
        document.documentElement.setAttribute('data-theme', theme ? 'dark': 'light')
        localStorage.setItem('app-theme', theme)
    }, [theme])

    return {theme, setTheme}
}