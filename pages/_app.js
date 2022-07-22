import { RecoilRoot } from 'recoil';
import ThemeProvider from '../components/ThemeProvider';

import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <RecoilRoot>
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </RecoilRoot>
  );
}

export default MyApp;
