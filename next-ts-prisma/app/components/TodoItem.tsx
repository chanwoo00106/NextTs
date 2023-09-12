import { Todo } from '@prisma/client'

const TodoItem = ({ todo }: { todo: Todo }) => {
  return <li>{todo.title}</li>
}

export default TodoItem
