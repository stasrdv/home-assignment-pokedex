import { createGlobalStyle } from "styled-components";
export const GlobalStyles = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    transition: background 0.2s ease-in, color 0.2s ease-in;
    margin: 0;
  }
`;

export const Themes: Record<ThemeType, Theme> = {
  light: {
    body: "#f1f1f1",
    text: "#212121",
  },
  dark: {
    body: "#212121",
    text: "#f1f1f1",
  },
};

export type ThemeType = "light" | "dark";
type Theme = {
  body: string;
  text: string;
};
