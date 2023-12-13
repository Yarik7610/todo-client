import React, { memo } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

type AddItemFormPropsType = {
  addItem: (text: string) => void
  name: string
}

interface IFormFields {
  text: string
}

const AddItemForm: React.FC<AddItemFormPropsType> = memo((props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<IFormFields>({
    mode: 'onChange'
  })

  const onSubmit: SubmitHandler<IFormFields> = (data) => {
    props.addItem(data.text)
    reset()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        {...register('text', {
          required: 'Field is required',
          validate: (value) => value.trim() !== '' || 'No white spaces',
          maxLength: { value: 32, message: 'Max length was achieved' }
        })}
        className={`addTask ${errors.text ? 'error' : ''}`}
        placeholder={`Add new ${props.name}`}
      />
      {errors.text && <div className="error-message">{errors.text.message}</div>}
    </form>
  )
})

export default AddItemForm
