import { ReactNode } from 'react'
import { useAppSelector } from '../../redux/hooks'

interface IWithAuth {
  children: ReactNode
}
const WithAuth: React.FC<IWithAuth> = ({ children }) => {
  const { token, error } = useAppSelector((state) => state.auth)

  return (
    <>
      {token && error === null ? (
        children
      ) : (
        <div className="authMsg">To continue, please sign up or log in into your account</div>
      )}
    </>
  )
}

export default WithAuth
