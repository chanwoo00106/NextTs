import { NextPage } from 'next'
import { useSelector } from 'react-redux'
import Card from './Card'
import * as S from './style'
import { RootStates } from '@store'
import { useEffect } from 'react'

const PokeList: NextPage = () => {
  const { pokemon, scrollY } = useSelector((state: RootStates) => ({
    pokemon: state.pokemon.pokemon,
    scrollY: state.window.scrollY
  }))

  useEffect(() => {
    const screenH = window.innerHeight // 윈도우 높이
    const totalH = document.querySelector('#__next')?.scrollHeight

    if (!totalH) return

    console.log(screenH, totalH, totalH - screenH, scrollY)

    if (totalH - screenH <= scrollY) {
    }
  }, [scrollY])

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
