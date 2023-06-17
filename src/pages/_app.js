import "@/styles/globals.css";
import ThemeProvider from "@/styles/themeProvider";
import { StyledEngineProvider } from "@mui/material/styles";

export default function App({ Component, pageProps }) {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </StyledEngineProvider>
  );
}
