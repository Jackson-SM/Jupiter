import React from 'react';
import { Logo } from '../atoms/Logo';
import { ToggleTheme } from '../atoms/ToogleTheme';
import { NavLinks } from '../molecules/NavLinks';
import { Button } from '../ui/Button';

type HeaderProps = React.ComponentProps<'header'>;

export const Header = ({ children, ...props }: HeaderProps) => {
  return (
    <header
      className="bg-popover flex gap-2 justify-between items-center py-4 px-2"
      {...props}
    >
      <Logo />
      <NavLinks />
      <div className="flex gap-2">
        <Button
          variant="outline"
          className="outline-none border-border bg-transparent"
        >
          Login
        </Button>
        <ToggleTheme />
      </div>
      {children}
    </header>
  );
};
