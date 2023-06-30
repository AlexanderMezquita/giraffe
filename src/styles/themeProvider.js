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
      MuiCard: {
        styleOverrides: {
          root: {
            overflow: "visible",
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

      MuiDateCalendar: {
        styleOverrides: {
          root: {
            width: "100%",
            "& .Mui-selected, & .Mui-selected:focus, & .Mui-selected:hover": {
              // color: `${palette.common.white} !important`,
              // backgroundColor: `black !important`,
            },
          },
          viewTransitionContainer: {
            "& > div > div": {
              justifyContent: "space-between !important",
              paddingLeft: 1,
              paddingRight: 1,
            },
            "& div[role=row]": {
              paddingLeft: 1,
              paddingRight: 1,
              justifyContent: "space-between !important",
            },
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
