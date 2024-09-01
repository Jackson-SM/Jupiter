"use client";

import { useTheme } from "next-themes";
import { Switch } from "../ui/Switch";

export const ToggleTheme = () => {
  const { theme, setTheme } = useTheme();

  return (
    <Switch
      checked={theme == "dark"}
      onClick={() => {
        setTheme(theme == "dark" ? "light" : "dark");
      }}
    />
  );
};
