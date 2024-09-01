import React from "react";
import { ToggleTheme } from "../atoms/ToogleTheme";

type HeaderProps = React.ComponentProps<"header">;

export const Header = ({ children, ...props }: HeaderProps) => {
  return (
    <header {...props}>
      <ToggleTheme />
      {children}
    </header>
  );
};
