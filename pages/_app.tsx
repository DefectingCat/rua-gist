import { createStore } from 'app/store';
import useRouterLoading from 'lib/hooks/useRouterLoading';
import { ThemeProvider } from 'next-themes';
import Head from 'next/head';
import { Provider } from 'react-redux';
import 'styles/globals.css';
import { AppPropsWithLayout } from 'types';

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  const { initialState } = pageProps;
  const store = createStore(initialState);
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
        <Provider store={store}>
          {getLayout(<Component {...pageProps} />)}
        </Provider>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
