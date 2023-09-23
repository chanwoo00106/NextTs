'use client'

import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { ReactNode, useState } from 'react'

interface Props {
  children: ReactNode
}

const ReactQueryProvider = ({ children }: Props) => {
  const [queryClient] = useState(() => new QueryClient())
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default ReactQueryProvider
