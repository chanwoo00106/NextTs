import api from '@lib/api'
import { Header, PokeList as PokeList } from '@components'
import type { Pokemon } from '@types'
import type { GetStaticProps, NextPage } from 'next'
import wrapper from '@store'
import { addPokemon } from '@store/pokemon'

// export const getStaticProps: GetStaticProps = async () => {
//   try {
//     const { data } = await api.get<Pokemon>(`/api/v2/pokemon?limit=50`)
//     return { props: { ok: true, data }, revalidate: 600 }
//   } catch (e) {
//     return { props: { ok: false } }
//   }
// }

export const getStaticProps: GetStaticProps = wrapper.getStaticProps<{
  data?: Pokemon
  ok: boolean
}>(store => async () => {
  try {
    const { data } = await api.get<Pokemon>('/api/v2/pokemon?limit=50')
    store.dispatch(addPokemon(data.results))

    return { props: { data, ok: true } }
  } catch (e) {
    return { props: { ok: false } }
  }
})

interface Props {
  data: Pokemon
  ok: boolean
}

const Home: NextPage<Props> = ({ data, ok }) => {
  return (
    <>
      <Header />
      <PokeList data={data} />
    </>
  )
}

export default Home
