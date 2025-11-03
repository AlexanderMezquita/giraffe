import "@/styles/globals.css";
import ThemeProvider from "@/styles/themeProvider";
import { StyledEngineProvider } from "@mui/material/styles";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Slide } from "react-toastify";
import { DefaultSeo } from "next-seo";
import SEO from "../../next-seo.config";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }) {
  return (
    <>
      <DefaultSeo {...SEO} />
      <QueryClientProvider client={queryClient}>
        <StyledEngineProvider injectFirst>
          <ThemeProvider>
            <Component {...pageProps} />
          </ThemeProvider>
        </StyledEngineProvider>
        <ToastContainer
          transition={Slide}
          position="top-center"
          autoClose={4000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover
          theme="light"
        />
      </QueryClientProvider>
    </>
  );
}
