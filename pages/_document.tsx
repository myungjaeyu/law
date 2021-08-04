import Document, { Head, Html, Main, NextScript } from 'next/document'
import React from 'react'

class MyDocument extends Document {
    render() {
        return (
            <Html>
                <Head />
                <body>
                    <head>
                        <meta name="robots" content="index,follow" />
                        <meta name="googlebot" content="index,follow" />

                        <title>law title</title>
                        <meta name="description" content="law description" />
                        <meta name="keywords" content="law, 디지털시민법정" />

                        <meta property="twitter:title" content="law title" />
                        <meta name="twitter:card" content="summary" />
                        <meta name="twitter:description" content="law description" />
                        {/* <meta property="twitter:image:src" content="" /> */}

                        <meta property="og:title" content="law title" />
                        <meta property="og:description" content="law description" />
                        {/* <meta property="og:image" content="" /> */}
                        <meta property="og:image:alt" content="image_logo" />
                        <meta property="og:image:width" content="800" />
                        <meta property="og:image:height" content="600" />

                        <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/gh/moonspam/NanumSquare@1.0/nanumsquare.css" />

                    </head>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument