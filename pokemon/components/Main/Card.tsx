import PokemonImg from '@lib/PokemonImg'
import { NextPage } from 'next'
import Image from 'next/image'
import { useState } from 'react'
import * as S from './style'

interface Props {
  name: string
  url: string
}

const Card: NextPage<Props> = ({ name, url }) => {
  const [idx, setIdx] = useState<string>(url.split('/')?.at(-2) as string)
  return (
    <S.CardWrapper>
      <Image src={PokemonImg(idx)} height={100} width={100} alt={name} />
      <S.PokemonName>{name}</S.PokemonName>
    </S.CardWrapper>
  )
}

export default Card
