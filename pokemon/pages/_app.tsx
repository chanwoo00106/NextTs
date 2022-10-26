import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import '../styles/global.css'
import wrapper from '../store'
import useScrollObserver from '@lib/useScrollObserver'

function MyApp({ Component, ...rest }: AppProps) {
  useScrollObserver()
  const { props, store } = wrapper.useWrappedStore(rest)

  return (
    <Provider store={store}>
      <Component {...props.pageProps} />
    </Provider>
  )
}

export default MyApp
