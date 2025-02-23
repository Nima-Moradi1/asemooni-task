"use client";
//i made this because we keep getting hydration errros since we're rendering a client component in server layout.tsx


import React from 'react'
import { ThemeProvider } from './ThemeProvider'

const ThemeProviderWrapper = ({children}:{children:React.ReactNode}) => {
  return (
    <ThemeProvider
        attribute="class"
        defaultTheme="light"
        disableTransitionOnChange
        enableSystem
        >
            {children}
        </ThemeProvider>
  )
}

export default ThemeProviderWrapper