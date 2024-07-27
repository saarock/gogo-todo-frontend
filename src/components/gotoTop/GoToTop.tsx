import { IoIosArrowDropupCircle } from "react-icons/io";
import "./gototop.css"
import React, {useEffect, useRef} from "react";
const GoToTop = () => {

    const ref = useRef<HTMLDivElement  | null>(null);
    useEffect(() => {

        function calculateScroll(e) {
            if (window.scrollY <= 10) {
                ref.current.style.display = "none";
            } else {
                ref.current.style.display = "block";
            }
        }
        window.addEventListener("scroll", calculateScroll);


        return () => {
            window.removeEventListener("scroll", calculateScroll);
        }
    }, []);
  const goToTop = (e: React.MouseEvent<HTMLButtonElement>) => {
    window.scroll({
      left:0,
      top: 0,
      behavior: "smooth"
    })
  }
  return (
    <div className='gogo__go__to__top__button' onClick={goToTop} ref={ref}>
       <span>    
        
       <IoIosArrowDropupCircle />
      </span>
    </div>
  )
}

export default GoToTop