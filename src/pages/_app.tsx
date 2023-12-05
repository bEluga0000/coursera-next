import AppBar from '@/components/AppBar'
import InitUser from '@/components/InitUser'
import type { AppProps } from 'next/app'
import { RecoilRoot } from 'recoil'

export default function App({ Component, pageProps }: AppProps) {

  return <RecoilRoot> 
    <AppBar/>
    <InitUser/>
    <Component {...pageProps} />
  </RecoilRoot>
}
