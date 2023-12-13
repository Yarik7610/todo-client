import { useState } from 'react'
import { BiPencil } from 'react-icons/bi'
import Modal from '../components/Modals/Modal'
import { ITask } from '../redux/slices/userSlice'
import { IEditForm } from './EditForms/EditTaskForm'
import ModalEdit from './Modals/ModalEdit'
import ModalShow from './Modals/ModalShow'

type TEditableSpan =
  | {
      type: 'todo'
      length: number
      body: string
      onEditEnd: (body: string) => void
    }
  | {
      type: 'task'
      length: number
      body: ITask
      onEditEnd: (body: IEditForm) => void
    }

const EditableSpan: React.FC<TEditableSpan> = (props) => {
  const [inEditMode, setInEditMode] = useState<boolean>(false)
  const [inShowMode, setInShowMode] = useState<boolean>(false)

  const activateEditMode = () => {
    setInEditMode(true)
  }
  const activateShowMode = () => {
    if (props.type !== 'todo') setInShowMode(true)
  }

  return (
    <>
      <div className="taskBody">
        <div className="taskBodyText">
          <div
            className={`taskBodyTextTitle ${props.type === 'todo' ? 'todo' : ''}`}
            onClick={activateShowMode}>
            {props.type === 'todo' ? props.body : props.body.title}
          </div>
          <BiPencil className="btnEditBodyText" size={'1.25em'} onClick={activateEditMode} />
        </div>
      </div>
      {inEditMode === true && inShowMode === false && (
        <Modal isOpened={inEditMode} setIsOpened={setInEditMode}>
          {props.type === 'task' ? ( //Пока не знаю как это оптимизировать
            <ModalEdit
              type={props.type}
              length={props.length}
              body={props.body}
              onEditEnd={props.onEditEnd}
              setIsOpened={setInEditMode}
            />
          ) : (
            <ModalEdit
              type={props.type}
              length={props.length}
              body={props.body}
              onEditEnd={props.onEditEnd}
              setIsOpened={setInEditMode}
            />
          )}
        </Modal>
      )}
      {props.type === 'task' && inShowMode === true && inEditMode === false && (
        <Modal isOpened={inShowMode} setIsOpened={setInShowMode}>
          <ModalShow body={props.body} />
        </Modal>
      )}
    </>
  )
}

export default EditableSpan
