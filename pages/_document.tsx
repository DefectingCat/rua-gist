import { CHECK_THEME } from 'lib/constants';
import { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

export default function Document() {
  return (
    <Html>
      <Head />
      <body>
        <Main />
        <NextScript />
        <Script
          id="dark-mode"
          dangerouslySetInnerHTML={{
            __html: CHECK_THEME,
          }}
          strategy="beforeInteractive"
        ></Script>
      </body>
    </Html>
  );
}
