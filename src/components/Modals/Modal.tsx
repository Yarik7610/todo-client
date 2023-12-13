import React, { useEffect, useRef } from 'react'
import { RxCross2 } from 'react-icons/rx'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { resetStatusMsg } from '../../redux/slices/authSlice'

interface IModal {
  isOpened: boolean
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>
  children: React.ReactNode
}

const Modal: React.FC<IModal> = ({ setIsOpened, children }) => {
  const modalRef = useRef<HTMLDivElement>(null)
  const dispatch = useAppDispatch()
  const { statusMsg, error } = useAppSelector((state) => state.auth)

  useEffect(() => {
    document.body.classList.add('activeModal')
    const handleClickOutside = (e: globalThis.MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as HTMLElement)) {
        setIsOpened(false)
      }
    }
    document.body.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.body.classList.remove('activeModal')
      document.body.removeEventListener('mousedown', handleClickOutside)
      dispatch(resetStatusMsg())
      setIsOpened(false)
    }
  }, [])

  useEffect(() => {
    if (statusMsg && error) toast.error(statusMsg)
    else if (statusMsg && !error) toast.success(statusMsg)
  }, [statusMsg, error])

  return (
    <div className="modalWrap">
      <div ref={modalRef} className="modal">
        {children}
        <button
          className="closeModalBtn"
          onClick={() => {
            setIsOpened(false)
          }}>
          <RxCross2 size={'2em'} />
        </button>
      </div>
      <ToastContainer autoClose={2500} />
    </div>
  )
}

export default Modal
