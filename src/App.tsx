import React, { useState } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes, //replaces "Switch" used till v5
  Route,
} from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ItemDetail from "./pages/ItemDetail";
import ColorModeContext from "./core/utils/ColorModeContext";

function App() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [darkMode, setDarkMode] = useState(true);
  const [mode, setMode] = React.useState<"light" | "dark">("light");

  const bgStyle = {
    backgroundColor: darkMode ? "#121212" : "#fff",
    height: "100%",
  };

  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        console.log("toggleColorMode", mode);
        setMode(darkMode ? "light" : "dark");
      },
    }),
    [mode, darkMode]
  );

  const myTheme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? "dark" : "light",
        },
      }),
    [darkMode]
  );

  const onClick = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className="App" style={bgStyle}>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={myTheme}>
          <Router>
            <Header onClick={onClick} />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/user/:id" element={<ItemDetail />} />
            </Routes>
          </Router>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </div>
  );
}

export default App;
