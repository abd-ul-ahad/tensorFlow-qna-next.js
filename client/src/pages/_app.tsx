"use client";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { store } from "@/store";
import { Provider } from "react-redux";
import LoadingBar from "react-top-loading-bar";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [progress, setProgress] = useState(0);
  const { pathname } = router;

  useEffect(() => {
    router.events.on("routeChangeStart", () => {
      setProgress(40);
    });
    router.events.on("routeChangeComplete", () => {
      setProgress(100);
    });
    /* eslint-disable react-hooks/exhaustive-deps */
  }, []);

  return (
    <>
     <LoadingBar
          color="#10a37f"
          progress={progress}
          onLoaderFinished={() => setProgress(0)}
        />
      <Head>
        <title>MindQuery</title>
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      </Head>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </>
  );
}
