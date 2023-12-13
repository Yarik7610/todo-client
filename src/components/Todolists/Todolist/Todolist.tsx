import { useState } from 'react'
import { RxCross2 } from 'react-icons/rx'
import { useAppDispatch } from '../../../redux/hooks'
import { addTask, deleteTodo, ITodolist, updateTodo } from '../../../redux/slices/userSlice'
import AddItemForm from '../../AddItemForm'
import EditableSpan from '../../EditableSpan'
import Filters from '../../Filters'
import SearchBar from '../../SearchBar'
import Task from './Task/Task'

export const Todolist: React.FC<ITodolist> = (props) => {
  const dispatch = useAppDispatch()

  const [query, setQuery] = useState('')

  const changeTodolistName = (_id: string, title: string) => {
    dispatch(updateTodo({ _id, title }))
  }
  const deleteTodoList = (id: string) => {
    dispatch(deleteTodo(id))
  }
  const addNewTask = (title: string) => {
    dispatch(addTask({ todoId: props._id, title, isDone: false }))
  }

  let searchedTasks = props.tasks.filter((t) => t.title.toLowerCase().includes(query.toLowerCase()))

  return (
    <div className="todolist">
      <div className="todoHlBlock">
        <EditableSpan
          type="todo"
          length={18}
          body={props.title}
          onEditEnd={(title: string) => changeTodolistName(props._id, title)}
        />
        <RxCross2
          className="btnRemoveTodo"
          size={'1.25em'}
          onClick={() => deleteTodoList(props._id)}
        />
      </div>
      <SearchBar query={query} type="task" setQuery={setQuery} />
      <AddItemForm name="task" addItem={addNewTask} />
      <Filters filter={props.filter} todolistId={props._id} />
      <ul className="taskLinesUl">
        {searchedTasks.map((t) => (
          <Task
            key={t._id}
            _id={t._id}
            isDone={t.isDone}
            title={t.title}
            description={t.description}
            date={t.date}
            images={t.images}
            todoId={props._id}
          />
        ))}
      </ul>
    </div>
  )
}
