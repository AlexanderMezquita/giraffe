import "@/styles/globals.css";
import ThemeProvider from "@/styles/themeProvider";

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
