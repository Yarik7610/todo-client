import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { ITask } from '../../redux/slices/userSlice'

export interface IEditForm {
  title: string
  description: string
  date: string
  images: Array<File>
}

export interface IEditTaskFormBody {
  title: string
  description: string
  date: string
}

interface IEditTaskForm {
  length: number
  body: ITask
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>
  // ИСПРАВИТЬ ТИП ФОРМДАТА В БАДИ
  onEditEnd: (body: IEditForm) => void
}

const EditTaskForm: React.FC<IEditTaskForm> = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<IEditForm>({
    mode: 'all',
    defaultValues: {
      title: props.body.title,
      description: props.body.description,
      date: props.body.date
      // ИСПРАВИТЬ...
      // images: props.body.images
    }
  })

  //ивент, его тип
  const uploadImagesHandler = (e: any) => {
    if (Array.from(e.target.files).length > 3) {
      e.preventDefault()
      toast.error("Can't upload more than 3 files")
      e.target.value = ''
    }
  }

  const onSubmit: SubmitHandler<IEditForm> = (data) => {
    const newData = {
      title: data.title,
      description: data.description,
      date: data.date,
      images: data.images
    }
    props.onEditEnd(newData)
    props.setIsOpened(false)
  }

  return (
    <form className="editForm" onSubmit={handleSubmit(onSubmit)}>
      <div className="title">Update task</div>
      <div className="container">
        <input
          className={`input ${errors.title ? 'error' : ''}`}
          placeholder=" "
          {...register('title', {
            required: 'Field is required',
            validate: (value) => value.trim() !== '' || 'No white spaces',
            maxLength: { value: props.length, message: 'Max length was achieved' }
          })}
        />
        <div className="cut"></div>
        <label className="placeholder">Title</label>
        {errors.title && <div className="error-message">{errors.title.message}</div>}
      </div>
      <div className="container">
        <input
          className={`input ${errors.description ? 'error' : ''}`}
          placeholder=" "
          {...register('description', {
            // maxLength: { value: props.length, message: 'Max length was achieved' }
          })}
        />
        <div className="cut"></div>
        <label className="placeholder">Description</label>
        {errors.description && <div className="error-message">{errors.description.message}</div>}
      </div>
      <div className="container">
        <input
          type="date"
          min={new Date().toISOString().split('T')[0]}
          className="input date"
          placeholder=" "
          {...register('date')}
        />
        <div className="cut"></div>
        <label className="placeholder">Date</label>
      </div>
      <div className="container">
        <input
          type="file"
          className="fileInput"
          {...register('images')}
          accept="image/png, image/jpeg, image/webp"
          multiple
          onChange={uploadImagesHandler}
        />
      </div>
      <button type="submit" className="submit">
        Edit
      </button>
    </form>
  )
}

export default EditTaskForm
