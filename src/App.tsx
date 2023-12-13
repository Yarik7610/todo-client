import { useEffect } from 'react'
import './App.scss'
import Header from './components/Header'
import WithAuth from './components/Hoc/WithAuth'
import Todolists from './components/Todolists/Todolists'
import { useAppDispatch, useAppSelector } from './redux/hooks'
import { me } from './redux/slices/authSlice'
import { getTodos } from './redux/slices/userSlice'

const App = () => {
  const dispatch = useAppDispatch()
  const { token, error } = useAppSelector((state) => state.auth)
  const { theme } = useAppSelector((state) => state.user)

  useEffect(() => {
    const fetchData = async () => {
      if (!error && token) {
        await dispatch(me())
        dispatch(getTodos())
      }
    }
    fetchData()
  }, [])

  return (
    <div className={`App ${theme === 'dark' && 'dark'}`}>
      <Header />
      <WithAuth>
        <Todolists />
      </WithAuth>
    </div>
  )
}

export default App
