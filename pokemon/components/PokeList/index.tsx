import { NextPage } from 'next'
import { useSelector } from 'react-redux'
import Card from './Card'
import * as S from './style'
import { RootStates } from '@store'

const PokeList: NextPage = () => {
  const pokemon = useSelector((state: RootStates) => state.pokemon.pokemon)

  return (
    <S.Wrapper>
      <S.CardList>
        {pokemon?.map(i => (
          <Card key={i.name} name={i.name} url={i.url} />
        ))}
      </S.CardList>
    </S.Wrapper>
  )
}

export default PokeList
