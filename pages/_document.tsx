import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from "next/document";
import { ServerStyleSheet } from "styled-components";
import { siteConfig } from "../shared/config";

export default class MainDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;
    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);

      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    const fontsUrl =
      "https://fonts.googleapis.com/css2?family=Readex+Pro:wght@200;300;400;500;600;700&display=swap";

    return (
      <Html style={{ scrollBehavior: "smooth" }}>
        <Head>
          {/*OpenGraph Metatags*/}
          <meta property="og:site_name" content="Quix" />
          <meta
            property="og:url"
            content={`https://${siteConfig.WEBSITE_URL}`}
          />
          <meta property="og:type" content="website" />

          {/*Twitter Meta Tags*/}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="@qx_app" />
          <meta name="twitter:creator" content="@qx_app" />

          <link href={fontsUrl} rel="stylesheet" />
          <link rel="shortcut icon" href={`/opt_favicon.png`} />
          {this.props.styles}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
