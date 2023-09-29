'use server'

import { createTodo, removeTodo } from '@/lib/todos'
import { revalidatePath } from 'next/cache'

export async function createTodoAction(title: string) {
  await createTodo(title)
  revalidatePath('/')
}

export async function removeTodoAction(id: string) {
  await removeTodo(id)
  revalidatePath('/')
}
