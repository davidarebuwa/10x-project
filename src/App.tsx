import { useState, useMemo } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "./components/Header/header";
import Dashboard from "./pages/Dashboard/dashboard";
import ItemDetail from "./pages/ItemDetail";
import CssBaseline from "@mui/material/CssBaseline";
import "./App.css";

const App = () => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [darkMode, setDarkMode] = useState(prefersDarkMode);

  const myTheme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? "dark" : "light",
        },
      }),
    [darkMode]
  );

  const onToggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div
      className="App"
      style={{
        backgroundColor: darkMode ? "#121212" : "#fff",
        height: "100%",
      }}
    >
      <CssBaseline />
      <ThemeProvider theme={myTheme}>
        <BrowserRouter basename="/ten-x-demo">
          <Header onToggleDarkMode={onToggleDarkMode} />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/user/:id" element={<ItemDetail />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
};

export default App;
