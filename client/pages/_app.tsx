import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import { wrapper } from './../store'
import {FC} from "react"
import {parseCookies} from "nookies"
import {setUserData, setUserToken} from "../store/actions-creators/user"
import jwtDecode from "jwt-decode"


const WrappedApp: FC<AppProps> = ({ Component, pageProps }: AppProps) => {
  return (
      <Component {...pageProps} />
   )
}

WrappedApp.getInitialProps = wrapper.getInitialAppProps(store => async ({ ctx, Component }) => {

        try {
            const userData = parseCookies(ctx)
            if (userData.access_token) {
                store.dispatch(setUserData(jwtDecode(userData.access_token)))
                store.dispatch(setUserToken(userData.access_token))
            }
        } catch (e) {
            console.log(e)
        }

    return {
        pageProps: (Component.getInitialProps ? await Component.getInitialProps({...ctx, store}) : { })
    }

})

export default wrapper.withRedux(WrappedApp)
