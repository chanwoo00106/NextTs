import { setScrollY } from '@store/window'
import { useCallback, useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useScrollObserver = () => {
  const dispatch = useDispatch()

  const handleScroll = useCallback(() => {
    dispatch(setScrollY(window.scrollY))
  }, [])

  useEffect(() => {
    document.addEventListener('scroll', handleScroll)
  }, [])
}

export default useScrollObserver
