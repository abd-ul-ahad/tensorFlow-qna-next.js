"use client";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { store } from "@/store";
import { Provider } from "react-redux";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
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
