'use client'

import { useRef } from 'react'
import { createTodoAction } from './_actions'

const NewTodoForm = () => {
  const formRef = useRef<HTMLFormElement>(null)

  async function action(data: FormData) {
    const title = data.get('title')
    if (!title || typeof title !== 'string') return

    createTodoAction(title)

    formRef.current?.reset()
  }

  return (
    <form
      ref={formRef}
      action={action}
      className='border-b border-t py-10 border-black'
    >
      <h2 className='text-3xl font-bold'>Create new Todo</h2>
      <input
        className='bg-slate-100 text-base py-1 px-2 rounded mt-5 outline-none border border-gray-400'
        type='text'
        name='title'
        id=''
      />
      <button className='bg-gray-500 text-white p-1 rounded ml-5' type='submit'>
        Add Todo
      </button>
    </form>
  )
}

export default NewTodoForm
