import { useEffect, useState } from 'react'
import { BsArrowUpCircle } from 'react-icons/bs'

const Arrow = () => {
  const [showBtn, setShowBtn] = useState(false)
  useEffect(() => {
    const handleScrollBtnVisibility = () => {
      window.scrollY > 300 ? setShowBtn(true) : setShowBtn(false)
    }
    window.addEventListener('scroll', handleScrollBtnVisibility)
    return () => {
      window.removeEventListener('scroll', handleScrollBtnVisibility)
    }
  }, [])
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  return (
    <>
      {showBtn && (
        <div className="arrowToTop">
          <BsArrowUpCircle onClick={scrollToTop} size={'2em'} />
        </div>
      )}
    </>
  )
}

export default Arrow
