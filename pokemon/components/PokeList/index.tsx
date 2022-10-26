import { NextPage } from 'next'
import { useSelector } from 'react-redux'
import Card from './Card'
import * as S from './style'
import { RootStates } from '@store'
import { useEffect } from 'react'
import { Pokemon } from '@types'
import api from '@lib/api'
import { useDispatch } from 'react-redux'
import { addPokemon, setIsLoading } from '@store/pokemon'

const PokeList: NextPage = () => {
  const dispatch = useDispatch()
  const { pokemon, offset, isLoading, scrollY } = useSelector(
    (state: RootStates) => ({
      pokemon: state.pokemon.pokemon,
      offset: state.pokemon.offset,
      isLoading: state.pokemon.isLoading,
      scrollY: state.window.scrollY
    })
  )

  useEffect(() => {
    const screenH = window.innerHeight // 윈도우 높이
    const totalH = document.querySelector('#__next')?.scrollHeight

    if (!totalH) return

    if (totalH - screenH <= scrollY && offset && !isLoading) {
      ;(async () => {
        dispatch(setIsLoading())
        const { data } = await api.get<Pokemon>(
          `/api/v2/pokemon?limit=50&offset=${50 * offset}`
        )

        dispatch(addPokemon(data.results))
        dispatch(setIsLoading())
      })()
    }
  }, [scrollY])

  return (
    <S.Wrapper>
      <S.CardList>
        {pokemon?.map((i, idx) => (
          <Card key={idx} name={i.name} url={i.url} />
        ))}
      </S.CardList>
    </S.Wrapper>
  )
}

export default PokeList
