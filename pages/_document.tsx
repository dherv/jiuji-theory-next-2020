import Document from "next/document";
import { ServerStyleSheet, createGlobalStyle } from "styled-components";
import { Normalize } from "styled-normalize";
import { Fragment } from "react";

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;
    const GlobalStyles = createGlobalStyle`
    :root {
      --title-font: "Bungee Shade", cursive;
      --main-font: "Poiret One", cursive;
      --main-background: #fff;
      --main-color-text: #212121
    }

    html {
        box-sizing: border-box;
        font-size: 16px;
        background-color: var(--main-background)
      }
      
      *,
      *:before,
      *:after {
        box-sizing: inherit;
      }
      
      body,
      h1,
      h2,
      h3,
      h4,
      h5,
      h6,
      p,
      ol,
      ul {
        margin: 0;
        padding: 0;
        font-weight: normal;
        color: var(--main-color-text);
        font-family: var(--main-font);
        line-height: 1.5;
      }
      
      ol,
      ul {
        list-style: none;
      }
      
      img {
        display: block;
        max-width: 100%;
        height: auto;
      }
      a {
        text-decoration: none;
        color: inherit;
      } 
    `;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props =>
            sheet.collectStyles(
              <Fragment>
                <Normalize />
                <GlobalStyles />
                <App {...props} />
              </Fragment>
            )
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        )
      };
    } finally {
      sheet.seal();
    }
  }
}
