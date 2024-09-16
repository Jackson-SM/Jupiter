'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Switch } from '../ui/Switch';

export function ToggleTheme() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Switch
      checked={theme === 'dark'}
      onCheckedChange={() => {
        setTheme(
          resolvedTheme == 'dark' ? 'light' : 'dark',
        );
      }}
    />
  );
}
