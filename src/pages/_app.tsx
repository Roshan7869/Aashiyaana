import type { AppProps } from 'next/app';
import '../index.css'; // Assuming global styles are in src/index.css

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
