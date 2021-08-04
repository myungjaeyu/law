import App from 'next/app'
import { AppProps, AppContext } from 'next/app'
import Layout from '../components/Layout'
import ControlManager from '../components/ControlManager'

import wrapper from '../services/store'

import '../index.css'

function MyApp({ Component, pageProps }: AppProps) {

    return (
        <Layout>
            <ControlManager />
            <Component {...pageProps} />
        </Layout>
    )
}

MyApp.getInitialProps = async (appContext: AppContext) => {

    const appProps = await App.getInitialProps(appContext)

    return { ...appProps }
}

export default wrapper.withRedux(MyApp)