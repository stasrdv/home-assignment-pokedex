import styled, { ThemeProvider } from "styled-components";
import { PokemonList } from "./pokedex";
import { AppHeader } from "./components/header";
import { GlobalStyles, Themes } from "./global-styles";
import { useThemeToggle } from "./hooks/useThemeToggle";

export const App = () => {
  const [theme, toggleTheme] = useThemeToggle();
  return (
    <ThemeProvider theme={theme === "dark" ? Themes["dark"] : Themes["light"]}>
      <GlobalStyles />
      <StyledWrapper>
        <AppHeader theme={theme} toggleTheme={toggleTheme} />
        <PokemonList />
      </StyledWrapper>
    </ThemeProvider>
  );
};

const StyledWrapper = styled.div`
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;
