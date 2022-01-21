import Document, { Html, Head, NextScript, Main } from "next/document";

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en-US">
        <Head>
          <link
            rel="shortcut icon"
            type="image/png"
            href="/public/static/doughnut.png"
          ></link>
          <link
            href="https://api.mapbox.com/mapbox-gl-js/v2.5.1/mapbox-gl.css"
            rel="stylesheet"
          ></link>
          <link
            rel="stylesheet"
            href="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v4.7.2/mapbox-gl-geocoder.css"
            type="text/css"
          ></link>
          <link
            href="https://rawgit.com/mapbox/mapbox-gl-markers/master/dist/mapbox-gl-markers.css"
            rel="stylesheet"
          ></link>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
