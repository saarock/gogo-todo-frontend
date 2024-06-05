import { IoLogOut } from "react-icons/io5";
import { authClient } from '../../services';
const LogoutBtn = () => {
  return (
    <button onClick={() => authClient.logout()} className='gogo__logout__btn'><IoLogOut />Logout</button>
  )
}

export default LogoutBtn