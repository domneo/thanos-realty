import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import Script from "next/script";

import "styles/bootstrap.scss";
import "styles/lightbox.scss";
import "styles/nprogress.css";
import GoogleTagManager from "utils/googleTagManager";

const TopProgressBar = dynamic(
  () => import("components/layout/TopProgressBar"),
  { ssr: false }
);

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <GoogleTagManager>
      <>
        <TopProgressBar />
        <Component {...pageProps} />
        {/* Google Tag Manager - Global base code */}
        <Script
          strategy="lazyOnload"
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
        />
        <Script id="google-tag-manager" strategy="lazyOnload">
          {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
            `}
        </Script>
      </>
    </GoogleTagManager>
  );
};

export default MyApp;
