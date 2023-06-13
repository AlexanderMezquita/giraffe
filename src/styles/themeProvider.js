import {
  ThemeProvider as MUIThemeProvider,
  createTheme,
  StyledEngineProvider,
} from "@mui/material/styles";
import palette from "./theme/palette";
// import customShadows from "../theme/customShadows";
// import shadows from "../theme/shadows";

export default function ThemeProvider({ children }) {
  const themeOptions = {
    palette,
    components: {
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderRadius: 10,
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            "&:hover": {
              boxShadow: "none",
            },
            borderRadius: 10,
          },
        },
      },
    },
    // shape: { borderRadius: 6 },
    // typography: typography,
    // shadows: shadows(),
  };
  const theme = createTheme(themeOptions);

  // theme.components = ComponentsOverrides({
  //   ...theme,

  //   // customShadows: customShadows(),
  // });

  return (
    <StyledEngineProvider injectFirst>
      <MUIThemeProvider theme={theme}>{children}</MUIThemeProvider>
    </StyledEngineProvider>
  );
}
