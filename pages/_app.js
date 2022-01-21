import NProgress from "nprogress";
import Router from "next/router";
import PropTypes from "prop-types";

import { Toaster } from "react-hot-toast";
import Layout from "../components/Layout";
import "@/components/styles/nprogress.css";

// Importing the Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

/* _app.js is generally used from global styling in NextJS. In our 
   case, we are importing global styles from the Layout component. */
export default function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
      <Toaster />
    </Layout>
  );
}

/* MyApp.getInitialProps = async function ({ Component, ctx }) {
  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }
  pageProps.query = ctx.query;
  return { pageProps };
}; */

MyApp.propTypes = {
  Component: PropTypes.elementType,
  pageProps: PropTypes.any,
};

// export default withData(MyApp);
