import { useCallback } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { addTodo } from '../../redux/slices/userSlice'
import AddItemForm from '../AddItemForm'
import Arrow from '../Arrow/Arrow'
import { Todolist } from './Todolist/Todolist'

const Todolists: React.FC = () => {
  const dispatch = useAppDispatch()
  const { todolists, query } = useAppSelector((state) => state.user)
  const addTodoList = useCallback((title: string) => {
    dispatch(addTodo(title))
  }, [])

  let searchedTodos = todolists.filter((tl) => tl.title.toLowerCase().includes(query.toLowerCase()))

  return (
    <main className="todosWrap">
      <AddItemForm name="todo" addItem={addTodoList} />
      {searchedTodos.map((tl) => {
        let tasksForTodoList = tl.tasks //делаем копию и работаем с ней, присваивая фильтрованный массив

        if (tl.filter === 'Completed') {
          tasksForTodoList = tasksForTodoList.filter((task) => task.isDone === true)
        } else if (tl.filter === 'Active') {
          tasksForTodoList = tasksForTodoList.filter((task) => task.isDone === false)
        }
        return (
          <Todolist
            key={tl._id}
            _id={tl._id}
            title={tl.title}
            tasks={tasksForTodoList}
            filter={tl.filter}
          />
        )
      })}
      <Arrow />
    </main>
  )
}

export default Todolists
