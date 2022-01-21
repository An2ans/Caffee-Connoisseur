import '../styles/globals.css';
import Footer from "./footer"

function MyApp({ Component, pageProps }) {
  return (<div>
  <Component {...pageProps} />
  <Footer />
  </div>
  );
};

export default MyApp
