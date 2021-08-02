import App from 'next/app'
import { AppProps, AppContext } from 'next/app'
import Layout from '../components/Layout'

import '../index.css'

function MyApp({ Component, pageProps }: AppProps) {

    return (
        <Layout>
            <Component {...pageProps} />
        </Layout>
    )
}

MyApp.getInitialProps = async (appContext: AppContext) => {

    const appProps = await App.getInitialProps(appContext)

    return { ...appProps }
}

export default MyApp