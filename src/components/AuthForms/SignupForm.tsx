import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { useAppDispatch } from '../../redux/hooks'
import { IAuthForm, registerUser } from '../../redux/slices/authSlice'

const SignupForm: React.FC = () => {
  const dispatch = useAppDispatch()

  const [isVisible, setIsVisible] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<IAuthForm>({
    mode: 'all'
  })
  const onSubmit: SubmitHandler<IAuthForm> = async (data) => {
    await dispatch(registerUser(data))
    reset()
  }

  return (
    <form className="authForm" onSubmit={handleSubmit(onSubmit)}>
      <div className="title">Welcome</div>
      <div className="subtitle">Let's create your account!</div>
      <div className="container">
        <input
          className={`input ${errors.nickname ? 'error' : ''}`}
          placeholder=" "
          {...register('nickname', {
            required: 'This field is required',
            validate: (value) => value.trim() !== '' || 'No white spaces',
            maxLength: { value: 50, message: 'Max length was achieved' }
          })}
        />
        <div className="cut"></div>
        <label className="placeholder">Nickname</label>
        {errors.nickname && <div className="error-message">{errors.nickname.message}</div>}
      </div>
      <div className="container">
        <input
          type={isVisible ? 'text' : 'password'}
          className={`input ${errors.password ? 'error' : ''}`}
          placeholder=" "
          {...register('password', {
            required: 'This field is required',
            validate: (value) => value.trim() !== '' || 'No white spaces',
            maxLength: { value: 50, message: 'Max length was achieved' },
            minLength: { value: 5, message: 'Too short password' }
          })}
        />
        <div className="cut"></div>
        <label className="placeholder">Password</label>
        {errors.password && <div className="error-message">{errors.password.message}</div>}
        <div className="formEye">
          {!isVisible ? (
            <AiFillEye size={'1.4em'} onClick={() => setIsVisible(true)} />
          ) : (
            <AiFillEyeInvisible size={'1.4em'} onClick={() => setIsVisible(false)} />
          )}
        </div>
      </div>
      <button type="submit" className="submit">
        Register
      </button>
    </form>
  )
}

export default SignupForm
