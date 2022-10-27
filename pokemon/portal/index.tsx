import { ReactNode } from 'react'
import { createPortal } from 'react-dom'

interface Props {
  children: ReactNode
}

const Portal = ({ children }: Props) => {
  const el = document.querySelector('#portal')
  if (!el) throw new Error('Not Found Portal element')

  return createPortal(children, el)
}

export default Portal
