import { Todo } from '@prisma/client'
import RemoveButton from './RemoveButton'

const TodoItem = ({ todo }: { todo: Todo }) => {
  return (
    <li>
      {todo.title}
      <RemoveButton id={todo.id} />
    </li>
  )
}

export default TodoItem
