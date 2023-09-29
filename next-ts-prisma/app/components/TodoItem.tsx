import { Todo } from '@prisma/client'
import RemoveForm from './RemoveForm'

const TodoItem = ({ todo }: { todo: Todo }) => {
  return (
    <li>
      {todo.title}
      <RemoveForm id={todo.id} />
    </li>
  )
}

export default TodoItem
