import type { AppProps } from 'next/app'
import '../styles/global.css'
import wrapper from '@store'
import { Provider } from 'react-redux'

function MyApp({ Component }: AppProps, ...rest: any[]) {
  const { store, props } = wrapper.useWrappedStore(rest)
  const { pageProps } = props
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
