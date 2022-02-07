import '../styles/globals.css';
import Footer from "../components/footer";
import {StoreProvider} from "../store/store-context";

function MyApp({ Component, pageProps }) {
  return (<div>
  <StoreProvider>
    <Component {...pageProps} />
    <Footer />
  </StoreProvider>
  </div>
  );
};

export default MyApp
