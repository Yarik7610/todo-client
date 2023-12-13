import { useCallback, useState } from 'react'
import { BiExit } from 'react-icons/bi'
import { BsMoonStars, BsSun } from 'react-icons/bs'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { logout } from '../redux/slices/authSlice'
import { TypeThemeColor, changeTheme, setTodoQuery } from '../redux/slices/userSlice'
import Modal from './Modals/Modal'
import ModalAuth from './Modals/ModalAuth'
import SearchBar from './SearchBar'

const Header: React.FC = () => {
  const [isOpened, setIsOpened] = useState(false)
  const { token, nickname, error } = useAppSelector((state) => state.auth)
  const { theme, query } = useAppSelector((state) => state.user)
  const dispatch = useAppDispatch()

  const setQuery = useCallback((query: string) => {
    dispatch(setTodoQuery(query))
  }, [])

  const loginOut = () => {
    dispatch(logout())
  }
  const changeThemeColor = (color: TypeThemeColor) => {
    dispatch(changeTheme(color))
  }
  return (
    <header className="headerWrap">
      <div className="headerLogo">
        <span>To</span>
        <span>Do</span>
      </div>
      {token && error === null ? (
        <SearchBar query={query} type="todo" setQuery={setQuery} />
      ) : (
        <></>
      )}

      <nav className="headerBtnAuthWrap">
        <div className="themeColorWrap">
          {theme === 'dark' ? (
            <BsSun size={'1.25em'} onClick={() => changeThemeColor('white')} />
          ) : (
            <BsMoonStars size={'1.25em'} onClick={() => changeThemeColor('dark')} />
          )}
        </div>
        {!token ? (
          <div className="headerBtnAuth" onClick={() => setIsOpened(true)}>
            Get started
          </div>
        ) : (
          <>
            <div className="headerBtnAuth logout">
              <div>{nickname}</div>
              <BiExit size={'1.50em'} onClick={loginOut} />
            </div>
          </>
        )}
      </nav>
      {isOpened && !token && (
        <Modal isOpened={isOpened} setIsOpened={setIsOpened}>
          <ModalAuth />
        </Modal>
      )}
    </header>
  )
}

export default Header
