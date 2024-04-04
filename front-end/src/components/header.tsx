import { FC } from "react";
import styled from "styled-components";
import { PokeballIcon } from "../assets/pokeball-svg";
import { Button, Typography } from "antd";
import { ThemeType } from "../global-styles";
import { MoonOutlined, SunOutlined } from "@ant-design/icons";
const { Text } = Typography;

export const AppHeader: FC<{
  theme: ThemeType;
  toggleTheme: () => void;
}> = ({ theme, toggleTheme }) => {
  return (
    <StyledHeader>
      <div className='logo'>
        <PokeballIcon />
        <Text strong>Stas Rudevitsky</Text>
      </div>
      <Button.Group>
        <Button
          type={theme === "dark" ? "default" : "primary"}
          onClick={toggleTheme}
          icon={<SunOutlined />}
        >
          Light
        </Button>
        <Button
          type={theme === "dark" ? "primary" : "default"}
          onClick={toggleTheme}
          icon={<MoonOutlined />}
        >
          Dark
        </Button>
      </Button.Group>
    </StyledHeader>
  );
};

const StyledHeader = styled.header`
  flex-shrink: 0;
  height: 64px;
  padding: 0 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #1e88e5;

  > .logo {
    display: flex;
    align-items: center;
    gap: 8px;
  }
`;
