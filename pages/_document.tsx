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
            __html: `if (
  localStorage['rua-theme'] === 'dark' ||
  (!('theme' in localStorage) &&
    window.matchMedia('(prefers-color-scheme: dark)').matches)
) {
  document.documentElement.classList.add('dark');
} else {
  document.documentElement.classList.remove('dark');
}
`,
          }}
          strategy="beforeInteractive"
        ></Script>
      </body>
    </Html>
  );
}
