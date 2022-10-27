import Portal from '@portal'
import { NextPage } from 'next'
import Image from 'next/image'
import { PokemonDetail } from '@types'
import * as S from './style'

interface Props {
  pokemonData: PokemonDetail | null
  removeModal: () => void
}

const PokemonModal: NextPage<Props> = ({ removeModal, pokemonData }) => {
  return (
    <Portal>
      <S.Wrapper onClick={removeModal}>
        <S.Content onClick={e => e.stopPropagation()}>
          <Image
            src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${pokemonData?.id
              .toString()
              .padStart(3, '0')}.png`}
            alt="sdf"
            width={300}
            height={300}
          />
          <S.Info>
            <h1>{pokemonData?.name}</h1>
            <S.SubTitle>ability</S.SubTitle>
            <div>
              {pokemonData?.abilities.map((i, idx) => (
                <S.Abiltity key={idx}>
                  <div>{i.ability.name}</div>
                  <h5>{i.slot}</h5>
                </S.Abiltity>
              ))}
            </div>
          </S.Info>
        </S.Content>
      </S.Wrapper>
    </Portal>
  )
}

export default PokemonModal
