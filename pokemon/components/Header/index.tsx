import { NextPage } from 'next'
import Image from 'next/image'
import * as S from './style'

const Header: NextPage = () => {
  return (
    <>
      <S.HeaderGap />
      <S.Wrapper>
        <Image src="/logo.png" width={100} height={43} alt="logo" />
        <S.Search placeholder="Search to Pokemon name" />
      </S.Wrapper>
    </>
  )
}

export default Header
