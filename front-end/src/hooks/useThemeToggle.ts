import { useState, useEffect } from "react";
import { ThemeType } from "../global-styles";
import { StorageUtils } from "../utils";

export const useThemeToggle = (): [ThemeType, () => void] => {
  const [theme, setTheme] = useState<ThemeType>("light");

  useEffect(() => {
    const savedTheme = StorageUtils.getLocalStorage<ThemeType>(
      "theme",
      "light"
    );
    if (savedTheme && ["dark", "light"].includes(savedTheme)) {
      setTheme(savedTheme);
    }
  }, []);

  const toggleTheme = () => {
    const updatedTheme = theme === "dark" ? "light" : "dark";
    setTheme(updatedTheme);
    StorageUtils.setLocalStorage<ThemeType>("theme", updatedTheme);
  };

  return [theme, toggleTheme];
};
