'use client'

import { removeTodoAction } from './_actions'

interface Props {
  id: string
}

const RemoveButton = ({ id }: Props) => {
  async function action(data: FormData) {
    const id = data.get('id')

    if (!id || typeof id !== 'string') return

    await removeTodoAction(id)
  }

  return (
    <form action={action}>
      <input name='id' value={id} hidden />
      <button
        type='submit'
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
      >
        Remove
      </button>
    </form>
  )
}

export default RemoveButton
