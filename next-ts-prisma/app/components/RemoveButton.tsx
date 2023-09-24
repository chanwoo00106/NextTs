'use client'

import axios from 'axios'
import { useMutation } from 'react-query'

interface Props {
  id: string
}

const RemoveButton = ({ id }: Props) => {
  const mutation = useMutation({
    mutationFn: () => {
      return axios.delete('/api/todo/remove', { params: { id } })
    },
  })

  return (
    <button
      onClick={() => mutation.mutate()}
      className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
    >
      Remove
    </button>
  )
}

export default RemoveButton
