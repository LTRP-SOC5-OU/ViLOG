import type { ReactNode } from "react";
import { Provider } from "jotai";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import MuiThemeProvider from "@mui/styles/ThemeProvider";
import { StyledEngineProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Slide from "@mui/material/Slide";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import theme from "$theme";
import Placeholder from "$templates/Placeholder";
import AppBar from "$organisms/AppBar";
import Problem from "$organisms/Problem";
import EmbedProblem from "$templates/EmbedProblem";
import { NEXT_PUBLIC_NO_EMBED } from "$utils/env";
import inIframe from "$utils/inIframe";
import { useSessionInit } from "$utils/session";
import { pagesPath } from "$utils/$path";
// NOTE: For VideoJs components.
import "video.js/dist/video-js.css";
import "videojs-seek-buttons/dist/videojs-seek-buttons.css";

function Content({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { session, isInstructor, error } = useSessionInit();
  const trigger = useScrollTrigger();

  if (error) {
    return (
      <Problem title="セッション情報が得られませんでした">
        LTIリンクからアクセスしてください
      </Problem>
    );
  }
  if (!session) return <Placeholder />;
  if (NEXT_PUBLIC_NO_EMBED && inIframe()) return <EmbedProblem />;

  const handleBooksClick = () => router.push(pagesPath.books.$url());
  const handleTopicsClick = () => router.push(pagesPath.topics.$url());
  const handleBookClick = () => router.push(pagesPath.$url());

  return (
    <>
      {isInstructor && (
        <Slide appear={false} direction="down" in={!trigger}>
          <AppBar
            position="sticky"
            session={session}
            onBooksClick={handleBooksClick}
            onTopicsClick={handleTopicsClick}
            onBookClick={handleBookClick}
          />
        </Slide>
      )}
      {children}
    </>
  );
}

function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <>
      <Head>
        <title>CHiBi-CHiLO</title>
        <meta name="viewport" content="width=device-width" />
        <meta name="theme-color" content={theme.palette.primary.main} />
      </Head>
      <StyledEngineProvider injectFirst>
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          <Content>{children}</Content>
        </MuiThemeProvider>
      </StyledEngineProvider>
    </>
  );
}

function App({ Component, pageProps }: AppProps) {
  return (
    <Provider>
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
