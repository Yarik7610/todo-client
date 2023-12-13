import { ChangeEvent, useEffect } from 'react'
import { BiTrash } from 'react-icons/bi'
import { useAppDispatch } from '../../../../redux/hooks'
import { deleteTask, ITask, patchTask } from '../../../../redux/slices/userSlice'
import EditableSpan from '../../../EditableSpan'
import { IEditForm } from '../../../EditForms/EditTaskForm'

type PropsTaskType = ITask & {
  todoId: string
}

const Task: React.FC<PropsTaskType> = ({
  todoId,
  _id,
  isDone,
  title,
  description,
  date,
  images
}) => {
  const dispatch = useAppDispatch()
  // ИСПРАВИТЬ ТИП ФОРМДАТА В БАДИ (был ITask)
  const updateTask = (todoId: string, taskId: string, formData: FormData) => {
    dispatch(patchTask({ todoId, taskId, formData }))
  }
  const removeTask = (taskId: string, todoId: string) => {
    dispatch(deleteTask({ taskId, todoId }))
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (date !== '' && Date.now() > Date.parse(date) && isDone === false) {
        const formData = new FormData()
        formData.append(
          'data',
          JSON.stringify({
            _id,
            title,
            isDone: true,
            description,
            date
          })
        )
        updateTask(todoId, _id, formData)
        clearInterval(interval)
      }
    }, 300000)
    return () => clearInterval(interval)
  }, [date])

  const onCheckBoxChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    // исправить тип
    const formData = new FormData()
    formData.append(
      'data',
      JSON.stringify({
        _id,
        title,
        isDone: e.currentTarget.checked,
        description,
        date
      })
    )
    updateTask(todoId, _id, formData)
  }
  const onUpdateTaskHandler = (body: IEditForm) => {
    const formData = new FormData()
    formData.append(
      'data',
      JSON.stringify({
        _id,
        title: body.title,
        isDone: body.date ? (Date.now() < Date.parse(body.date) ? false : true) : isDone,
        description: body.description,
        date: body.date
      })
    )
    for (let i = 0; i < body.images.length; i++) {
      formData.append('images', body.images[i])
    }
    updateTask(todoId, _id, formData)
  }
  return (
    <li className={`taskLine ${isDone ? 'done' : ''}`}>
      <label className="taskLineCheckBox">
        <input type="checkbox" onChange={onCheckBoxChangeHandler} checked={isDone} />
        <div className="checkmark"></div>
      </label>
      <EditableSpan
        type="task"
        body={{ _id, isDone, title, description, date, images }}
        length={24}
        onEditEnd={onUpdateTaskHandler}
      />
      <button
        className="btnDelTask"
        onClick={() => {
          removeTask(_id, todoId)
        }}>
        <BiTrash size={'1.25em'} />
      </button>
    </li>
  )
}

export default Task
