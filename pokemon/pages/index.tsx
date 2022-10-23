import api from '@lib/api'
import { Header, PokeList as PokeList } from '@components'
import type { Pokemon } from '@types'
import type { NextPage } from 'next'
import wrapper from '@store'
import { addPokemon } from '@store/pokemon'
import { HYDRATE } from 'next-redux-wrapper'

// export const getStaticProps: GetStaticProps = async () => {
//   try {
//     const { data } = await api.get<Pokemon>(`/api/v2/pokemon?limit=50`)
//     return { props: { ok: true, data }, revalidate: 600 }
//   } catch (e) {
//     return { props: { ok: false } }
//   }
// }

export const getStaticProps = wrapper.getStaticProps(store => async () => {
  try {
    const { data } = await api.get<Pokemon>('/api/v2/pokemon?limit=50')
    store.dispatch(addPokemon(data.results))
    store.dispatch({ type: HYDRATE })
    return { props: { ok: true } }
  } catch (e) {
    return { props: { ok: false } }
  }
})

interface Props {
  ok: boolean
}

const Home: NextPage<Props> = ({ ok }) => {
  return (
    <>
      <Header />
      <PokeList />
    </>
  )
}

export default Home
