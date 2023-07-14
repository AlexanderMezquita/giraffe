import "@/styles/globals.css";
import ThemeProvider from "@/styles/themeProvider";
import { StyledEngineProvider } from "@mui/material/styles";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider>
          <Component {...pageProps} />
        </ThemeProvider>
      </StyledEngineProvider>
    </QueryClientProvider>
  );
}
