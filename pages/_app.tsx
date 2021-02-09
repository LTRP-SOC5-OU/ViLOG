import type { ReactNode } from "react";
import { Provider } from "jotai";
import type { AppProps } from "next/app";
import Head from "next/head";
import MuiThemeProvider from "@material-ui/styles/ThemeProvider";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ConfirmProvider } from "material-ui-confirm";
import theme from "$theme";
import Placeholder from "$templates/Placeholder";
import AppBar from "$organisms/AppBar";
import Problem from "$organisms/Problem";
import { useRouter } from "next/router";
import { useSessionInit } from "$utils/session";
import { pagesPath } from "$utils/$path";
// NOTE: For VideoJs components.
import "video.js/dist/video-js.css";
import "videojs-seek-buttons/dist/videojs-seek-buttons.css";
import "$styles/video-js.css";

function Content({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { session, isInstructor, error } = useSessionInit();

  // TODO: https://github.com/npocccties/ChibiCHiLO/issues/3
  if (!session) return <Placeholder />;
  if (error) return <Problem title="セッション情報が得られませんでした" />;

  const handleBooksClick = () => router.push(pagesPath.books.$url());
  const handleTopicsClick = () => router.push(pagesPath.topics.$url());
  const handleBookLinkClick = () => router.push(pagesPath.$url());

  return (
    <>
      {isInstructor && (
        <AppBar
          position="sticky"
          session={session}
          onBooksClick={handleBooksClick}
          onTopicsClick={handleTopicsClick}
          onBookLinkClick={handleBookLinkClick}
        />
      )}
      {children}
    </>
  );
}

function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <>
      <Head>
        <title>ChibiCHiLO</title>
        <meta name="viewport" content="width=device-width" />
        <meta name="theme-color" content={theme.palette.primary.main} />
      </Head>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Content>{children}</Content>
      </MuiThemeProvider>
    </>
  );
}

function App({ Component, pageProps }: AppProps) {
  return (
    <Provider>
      <ThemeProvider>
        <ConfirmProvider>
          <Component {...pageProps} />
        </ConfirmProvider>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
