import React
 from "react";
 import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
 import "./Header.css";
import ColorModeContext from "../../core/utils/ColorModeContext";

interface HeaderProps {
  onClick: () => void;
}

 function Header({ onClick } : HeaderProps) {
    const theme = useTheme();
    const colorMode = React.useContext(ColorModeContext);

    const bgStyle = {
      backgroundColor: theme.palette.background.default,
    };

   return (
    <div id="headerContainer"style={bgStyle}>
    <div id="header-left">
    <img src={theme.palette.mode === "light" ? "https://www.10xbanking.com/hubfs/Logos/10xbanking-logo-1.svg" : "https://assets-global.website-files.com/625d1ccded0c38f5f938a41e/625d1ccded0c38f53538a84d_10x-logo-white.svg"} alt="10x Logo" id="ten-x-logo" />
    </div>
    <div id="header-right">
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        color: 'text.primary',
        borderRadius: 1,
        p: 3,
      }}
    >
      {theme.palette.mode} mode
      <IconButton sx={{ ml: 1 }} onClick={onClick} color="inherit">
        {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
    </Box>
    </div>

</div>
   );
 }
    export default Header;