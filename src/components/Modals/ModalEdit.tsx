import React from 'react'
import { ITask } from '../../redux/slices/userSlice'
import EditTaskForm, { IEditForm } from '../EditForms/EditTaskForm'
import EditTodoForm from '../EditForms/EditTodoForm'

type TModalEditTask =
  | {
      type: 'todo'
      length: number
      body: string
      onEditEnd: (body: string) => void
      setIsOpened: React.Dispatch<React.SetStateAction<boolean>>
    }
  | {
      type: 'task'
      length: number
      body: ITask
      // ИСПРАВИТЬ ТИП ФОРМДАТА В БАДИ
      onEditEnd: (body: IEditForm) => void
      setIsOpened: React.Dispatch<React.SetStateAction<boolean>>
    }

//тут пока any потом ИСПРАВИТЬ
const ModalEditTodo: React.FC<TModalEditTask> = (props) => {
  return (
    <div className="editWrap">
      {props.type === 'todo' ? (
        <EditTodoForm
          length={props.length}
          body={props.body}
          setIsOpened={props.setIsOpened}
          onEditEnd={props.onEditEnd}
        />
      ) : (
        <EditTaskForm
          length={props.length}
          body={props.body}
          setIsOpened={props.setIsOpened}
          onEditEnd={props.onEditEnd}
        />
      )}
    </div>
  )
}

export default ModalEditTodo
