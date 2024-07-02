import { IoIosArrowDropupCircle } from "react-icons/io";
import "./gototop.css"
const GoToTop = () => {
  const goToTop = () => {
    window.scroll({
      left:0,
      top: 0,
      behavior: "smooth"
    })
  }
  return (
    <div className='gogo__go__to__top__button' onClick={goToTop}>
       <span>    
        
       <IoIosArrowDropupCircle />
      </span>
    </div>
  )
}

export default GoToTop