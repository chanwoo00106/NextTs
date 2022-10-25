import api from '@lib/api'
import { Header, PokeList as PokeList } from '@components'
import type { Pokemon, Result } from '@types'
import type { GetStaticProps, NextPage } from 'next'
import wrapper from '@store'
import { addPokemon } from '@store/pokemon'

// export const getStaticProps: GetStaticProps = async () => {
//   try {
//     const { data } = await api.get<Pokemon>(`/api/v2/pokemon?limit=50`)
//     return { props: { ok: true, data: data.results }, revalidate: 600 }
//   } catch (e) {
//     return { props: { ok: false } }
//   }
// }

interface Props {
  data?: Result[]
  ok: boolean
}

export const getStaticProps = wrapper.getStaticProps<Props>(
  store => async () => {
    try {
      const { data } = await api.get<Pokemon>(`/api/v2/pokemon?limit=50`)

      store.dispatch(addPokemon(data.results))
      return { props: { data: data.results, ok: true } }
    } catch (e) {
      return { props: { ok: false } }
    }
  }
)

const Home: NextPage<Props> = ({ data, ok }) => {
  return (
    <>
      <Header />
      <PokeList data={data} />
    </>
  )
}

export default Home
