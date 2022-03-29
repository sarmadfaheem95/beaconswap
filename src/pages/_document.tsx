/* eslint-disable @next/next/no-document-import-in-page */
// pages/_document.js
import { Head, Html, Main, NextScript } from 'next/document'

const APP_NAME = 'Beaconswap'
const APP_DESCRIPTION = 'Swap, yield, lend, borrow, leverage, limit, launch all on one community driven ecosystem'

export default function Document() {
  return (
    <Html>
      <Head>
        <meta name="application-name" content={APP_NAME} />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content={APP_NAME} />
        <meta name="description" content={APP_DESCRIPTION} />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="theme-color" content="#0993ec" />

        <link rel="apple-touch-icon" sizes="48x48" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://use.typekit.net/avo8ruz.css" media="nope!" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
