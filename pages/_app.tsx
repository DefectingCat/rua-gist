import useRouterLoading from 'lib/hooks/useRouterLoading';
import { ThemeProvider } from 'next-themes';
import Head from 'next/head';
import 'styles/globals.css';
import { AppPropsWithLayout } from 'types';
import 'assets/i18n/i18n';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  const { loading } = useRouterLoading();

  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/images/favicon.ico" />
        <meta name="keywords" content="Blog RUA" />
        <meta name="description" content="Personal blog." />
        <meta name="author" content="Arthur,i@rua.plus" />
        <title>RUA</title>
      </Head>

      <ThemeProvider
        attribute="data-theme"
        storageKey="rua-theme"
        themes={['light', 'dark']}
        enableSystem
        defaultTheme="system"
      >
        {getLayout(<Component {...pageProps} />)}
      </ThemeProvider>
    </>
  );
}

export default MyApp;
