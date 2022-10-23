import { NextPage } from 'next'
import { useSelector } from 'react-redux'
import { ReducerState } from '@store'
import Card from './Card'
import * as S from './style'

const PokeList: NextPage = () => {
  const data = useSelector((state: ReducerState) => state.pokemon)
  return (
    <S.Wrapper>
      <S.CardList>
        {data?.map(i => (
          <Card key={i.name} name={i.name} url={i.url} />
        ))}
      </S.CardList>
    </S.Wrapper>
  )
}

export default PokeList
