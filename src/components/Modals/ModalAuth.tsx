import React, { useState } from 'react'
import LoginForm from '../AuthForms/LoginForm'
import SignupForm from '../AuthForms/SignupForm'

const ModalAuth: React.FC = () => {
  const [activeBtn, setActiveBtn] = useState(0)

  return (
    <div className="authWrap">
      <div className="authModalBtns">
        <div
          className={activeBtn === 0 ? 'authModalBtnActive' : ''}
          onClick={() => setActiveBtn(0)}>
          Sign up
        </div>
        <div
          className={activeBtn === 1 ? 'authModalBtnActive' : ''}
          onClick={() => setActiveBtn(1)}>
          Log in
        </div>
      </div>
      {activeBtn === 0 ? <SignupForm /> : <LoginForm />}
    </div>
  )
}

export default ModalAuth
