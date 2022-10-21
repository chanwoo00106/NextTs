import api from '@lib/api'
import { Header, PokeList as PokeList } from '@components'
import type { Pokemon } from '@types'
import type { GetStaticProps, NextPage } from 'next'

export const getStaticProps: GetStaticProps = async () => {
  try {
    const { data } = await api.get<Pokemon>(`/api/v2/pokemon?limit=56`)
    return { props: { ok: true, data }, revalidate: 600 }
  } catch (e) {
    return { props: { ok: false } }
  }
}

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