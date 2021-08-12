import App from 'next/app'
import { AppProps, AppContext } from 'next/app'
import Layout from '../components/Layout'
import ControlManager from '../components/ControlManager'

import wrapper from '../services/store'

import '../index.css'
import { useEffect } from 'react'

function MyApp({ Component, pageProps }: AppProps) {

    useEffect(() => {

        (window as any).Kakao.init('67b62f0b4973e69f308c9374eeec7d23')

    }, [])

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