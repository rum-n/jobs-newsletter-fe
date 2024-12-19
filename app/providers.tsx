'use client'

import { ThemeProvider } from 'styled-components'
import { theme } from './theme'
import { GlobalStyles } from './globalStyles'

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider theme={theme}>
            <GlobalStyles theme={theme} />
            {children}
        </ThemeProvider>
    )
}