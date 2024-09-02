'use client';

import { ThemeProvider } from 'next-themes';
import React from 'react';

type NextThemesProviderProps = React.ComponentProps<typeof ThemeProvider>;

export const NextThemesProvider = ({
  children,
  ...props
}: NextThemesProviderProps) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" {...props}>
      {children}
    </ThemeProvider>
  );
};
