import React, { useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { ThemeProvider, createTheme, ThemeOptions } from "@mui/material/styles";
import theme from "./default";


export const ThemeContext = React.createContext({
  toggleColorMode: () => {},
});

type MyThemeProviderProps = {
  children?: React.ReactNode;
};

export default function MyThemeProvider(props: MyThemeProviderProps) {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const [mode, setMode] = React.useState<"light" | "dark">(
    prefersDarkMode ? "dark" : "light"
  );

  useEffect(() => {
    setMode(prefersDarkMode ? "dark" : "light");
  }, [prefersDarkMode]);

  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      }
    }),
    []
  );

  const _theme = React.useMemo(
    () => createTheme(theme[mode] as ThemeOptions),
    [mode]
  );

  return (
    // CssBaseline use: [https://stackoverflow.com/a/59145819/17449710](https://stackoverflow.com/a/59145819/17449710)
    // GlobalStyles use:  [https://stackoverflow.com/a/69905540/17449710](https://stackoverflow.com/a/69905540/17449710)

    // Sure we will use our theme to provide colours to buttons and various components but we can’t change our App’s background and font color dynamically (technically that can be done but this is the MUI way).
    // CssBaseline provides this functionality to manage background and text color of our app automatically based on what theme we provide it. (ex body html tag)

    // GlobalStyles just retains the page’s default css that gets reset/removed by CssBaseline. (ex body has a margin of 8px by default .. or something)

    <ThemeContext.Provider value={colorMode}>
      <ThemeProvider theme={_theme}>
        <GlobalStyles styles={{}} />
        <CssBaseline enableColorScheme />
        {props.children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}
