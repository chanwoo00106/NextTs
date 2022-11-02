import api from '@lib/api'
import PokemonImg from '@lib/PokemonImg'
import PokemonModal from '@portal/PokemonModal'
import { PokemonDetail } from '@types'
import { NextPage } from 'next'
import Image from 'next/image'
import React, { useState } from 'react'
import * as S from './style'

interface Props {
  name: string
  url: string
}

const Card: NextPage<Props> = ({ name, url }) => {
  const [idx, _] = useState<string>(url.split('/')?.at(-2) as string)
  const [isShow, setIsShow] = useState<boolean>(false)
  const [pokemonData, setPokemonData] = useState<PokemonDetail | null>(null)

  const onClick = async () => {
    const { data } = await api.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
    setPokemonData(data)
    setIsShow(!isShow)
  }

  return (
    <>
      <S.CardWrapper onClick={onClick}>
        <Image src={PokemonImg(idx)} height={100} width={100} alt={name} />
        <S.PokemonName>{name}</S.PokemonName>
      </S.CardWrapper>

      {isShow && (
        <PokemonModal
          removeModal={() => setIsShow(false)}
          pokemonData={pokemonData}
        />
      )}
    </>
  )
}

export default React.memo(Card)
