import api from '@lib/api'
import { Header, PokeList } from '@components'
import type { Pokemon } from '@types'
import type { NextPage } from 'next'
import wrapper from '@store'
import { addPokemon } from '@store/pokemon'

interface Props {
  ok: boolean
}

export const getStaticProps = wrapper.getStaticProps<Props>(
  store => async () => {
    try {
      const { data } = await api.get<Pokemon>(`/api/v2/pokemon?limit=50`)

      store.dispatch(addPokemon(data.results))
      return { props: { ok: true } }
    } catch (e) {
      return { props: { ok: false } }
    }
  }
)

const Home: NextPage<Props> = ({ ok }) => {
  return (
    <>
      <Header />
      <PokeList />
    </>
  )
}

export default Home
