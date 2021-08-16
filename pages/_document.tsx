import Document, { Head, Html, Main, NextScript } from 'next/document'
import React from 'react'

class MyDocument extends Document {
    render() {
        return (
            <Html>
                <Head>
                    <meta name="robots" content="index,follow" />
                    <meta name="googlebot" content="index,follow" />

                    <title>"디지털 시민법정"</title>
                    <meta name="description" content="디지털 시민법정의 판사가 되어 사이버폭력 사건을 직접 판결해보세요!" />
                    <meta name="keywords" content="law, 디지털시민법정" />

                    <meta property="twitter:title" content='"디지털 시민법정"' />
                    <meta name="twitter:card" content="summary" />
                    <meta name="twitter:description" content="디지털 시민법정의 판사가 되어 사이버폭력 사건을 직접 판결해보세요!" />
                    {/* <meta property="twitter:image:src" content="" /> */}

                    <meta property="og:title" content='"디지털 시민법정"' />
                    <meta property="og:description" content="디지털 시민법정의 판사가 되어 사이버폭력 사건을 직접 판결해보세요!" />
                    {/* <meta property="og:image" content="" /> */}
                    <meta property="og:image:alt" content="image_logo" />
                    <meta property="og:image:width" content="800" />
                    <meta property="og:image:height" content="600" />

                    <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/gh/moonspam/NanumSquare@1.0/nanumsquare.css" />

                    <script src="https://developers.kakao.com/sdk/js/kakao.min.js"></script>
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument