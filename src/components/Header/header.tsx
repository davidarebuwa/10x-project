import { useTheme } from "@mui/material/styles";
import { PaletteMode } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import "./header.css";

interface HeaderProps {
  onToggleDarkMode: () => void;
}

const Header = ({ onToggleDarkMode }: HeaderProps) => {
  const theme = useTheme();

  const themedImage = (mode: PaletteMode) => {
    return mode === "light"
      ? "https://www.10xbanking.com/hubfs/Logos/10xbanking-logo-1.svg"
      : "https://assets-global.website-files.com/625d1ccded0c38f5f938a41e/625d1ccded0c38f53538a84d_10x-logo-white.svg";
  };

  return (
    <div
      id="headerContainer"
      style={{
        backgroundColor: theme.palette.background.default,
      }}
    >
      <div id="header-left">
        <img
          src={themedImage(theme.palette.mode)}
          alt="10x Logo"
          id="ten-x-logo"
        />
      </div>
      <div id="header-right">
        <IconButton
          sx={{ height: "40px", width: "40px", mr: 2 }}
          onClick={onToggleDarkMode}
          color={"primary"}
        >
          {theme.palette.mode === "dark" ? (
            <Brightness4Icon />
          ) : (
            <Brightness7Icon />
          )}
        </IconButton>
      </div>
    </div>
  );
};

export default Header;
