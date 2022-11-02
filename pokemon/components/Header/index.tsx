import { RootStates } from '@store'
import { NextPage } from 'next'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import * as S from './style'

const Header: NextPage = () => {
  const scrollY = useSelector((state: RootStates) => state.window.scrollY)
  const [scrollTemp, setScrollTemp] = useState<number>(0)
  const headerRef = useRef<HTMLDivElement>(null)
  const [state, setState] = useState<'DOWN' | 'UP'>('UP')

  useEffect(() => {
    if (!headerRef.current) return
    // 내릴때
    if (scrollY > scrollTemp && state !== 'DOWN') {
      headerRef.current.style.top = '-10vh'
      setState('DOWN')
    }
    // 올릴때
    else if (scrollY < scrollTemp && state !== 'UP') {
      headerRef.current.style.top = '0'
      setState('UP')
    }

    setScrollTemp(scrollY)
  }, [scrollY])

  return (
    <>
      <S.HeaderGap />
      <S.Wrapper ref={headerRef}>
        <Image src="/logo.png" width={100} height={43} alt="logo" />
      </S.Wrapper>
    </>
  )
}

export default Header
