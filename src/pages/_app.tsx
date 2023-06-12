import { ClerkProvider } from "@clerk/nextjs";
import { api } from "~/utils/api";
import Head from "next/head";

import { type AppType } from "next/app";

import "~/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ClerkProvider {...pageProps}>
      <Head>
        <title>Mix Notes</title>
        <meta name="description" content="Share and comment on audio files" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </ClerkProvider>
  );
};

export default api.withTRPC(MyApp);
