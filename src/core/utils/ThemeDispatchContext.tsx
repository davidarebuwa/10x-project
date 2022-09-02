import React from "react";
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
  Theme,
  useTheme,
} from "@mui/material/styles";

interface ThemeProviderProps {
  children: React.ReactNode;
  theme: Theme;
}

const ThemeDispatchContext = React.createContext<any>(null);

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children, theme }) => {
  const themeInitialOptions = {
    paletteMode: "light",
  };

  const [themeOptions, dispatch] = React.useReducer(
    (state: any, action: any) => {
      switch (action.type) {
        case "changeTheme":
          return {
            ...state,
            paletteMode: action.payload,
          };
        default:
          throw new Error();
      }
    },
    themeInitialOptions
  );

  const memoizedTheme = React.useMemo(() => {
    return createTheme({
      ...theme,
      palette: {
        mode: themeOptions.paletteMode,
      },
    });
  }, [theme, themeOptions.paletteMode]);

  return (
    <MuiThemeProvider theme={memoizedTheme}>
      <ThemeDispatchContext.Provider value={dispatch}>
        {children}
      </ThemeDispatchContext.Provider>
    </MuiThemeProvider>
  );
};

export default ThemeProvider;

export const useChangeTheme = () => {
  const dispatch = React.useContext(ThemeDispatchContext);
  const theme = useTheme();
  const changeTheme = React.useCallback(
    () =>
      dispatch({
        type: "changeTheme",
        payload: theme.palette.mode === "light" ? "dark" : "light",
      }),
    [theme.palette.mode, dispatch]
  );

  return changeTheme;
};