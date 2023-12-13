import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

interface IEditForm {
  todoTitle: string
}

interface IEditTodoForm {
  length: number
  body: string
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>
  onEditEnd: (body: string) => void
}

const EditTodoForm: React.FC<IEditTodoForm> = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<IEditForm>({
    mode: 'all',
    defaultValues: {
      todoTitle: props.body
    }
  })

  const onSubmit: SubmitHandler<IEditForm> = (data) => {
    props.setIsOpened(false)
    props.onEditEnd(data.todoTitle)
  }

  return (
    <form className="editForm" onSubmit={handleSubmit(onSubmit)}>
      <div className="title">Change todo body</div>
      <div className="container">
        <input
          className={`input ${errors.todoTitle ? 'error' : ''}`}
          placeholder=" "
          {...register('todoTitle', {
            required: 'Field is required',
            validate: (value) => value.trim() !== '' || 'No white spaces',
            maxLength: { value: props.length, message: 'Max length was achieved' }
          })}
        />
        <div className="cut"></div>
        <label className="placeholder">Title</label>
        {errors.todoTitle && <div className="error-message">{errors.todoTitle.message}</div>}
      </div>
      <button type="submit" className="submit">
        Edit
      </button>
    </form>
  )
}

export default EditTodoForm
