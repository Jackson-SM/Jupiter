import React from 'react';
import { LinkNav } from '../atoms/LinkNav';
import { Logo } from '../atoms/Logo';
import { NavLinks } from '../molecules/NavLinks';

type HeaderProps = React.ComponentProps<'header'>;

export const Header = ({ children, ...props }: HeaderProps) => {
  return (
    <header
      className="bg-popover flex gap-2 justify-between items-center py-4 px-2"
      {...props}
    >
      <Logo />
      <NavLinks />
      <div className="flex items-center gap-2">
        <LinkNav href="/login">Entrar</LinkNav>
        <LinkNav href="/register">Registre-se</LinkNav>
      </div>
      {children}
    </header>
  );
};
