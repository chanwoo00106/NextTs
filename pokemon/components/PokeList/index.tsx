import { Pokemon } from '@types'
import { NextPage } from 'next'
import Card from './Card'
import * as S from './style'

interface Props {
  data: Pokemon
}

const PokeList: NextPage<Props> = ({ data }) => {
  return (
    <S.Wrapper>
      <S.CardList>
        {data?.results.map(i => (
          <Card key={i.name} name={i.name} url={i.url} />
        ))}
      </S.CardList>
    </S.Wrapper>
  )
}

export default PokeList
