import { useState, useEffect } from "react";
import { ThemeType } from "../global-styles";
import { getLocalStorage, setLocalStorage } from "../utils";

export const useThemeToggle = (): [ThemeType, () => void] => {
  const [theme, setTheme] = useState<ThemeType>("light");

  useEffect(() => {
    const savedTheme = getLocalStorage<ThemeType>("theme", "light");
    if (savedTheme && ["dark", "light"].includes(savedTheme)) {
      setTheme(savedTheme);
    }
  }, []);

  const toggleTheme = () => {
    const updatedTheme = theme === "dark" ? "light" : "dark";
    setTheme(updatedTheme);
    setLocalStorage<ThemeType>("theme", updatedTheme);
  };

  return [theme, toggleTheme];
};
