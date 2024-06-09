import React, { useCallback } from 'react'
import { Profile, SideBar } from '../../components'
import "./dash.css"
import { useSelector } from 'react-redux'
import { RootState, User } from '../../types'
import { TrophySpin } from 'react-loading-indicators'
import useTokenValidation from '../../hooks/useTokenValidation'
const DashBoard: React.FC = () => {
  // useTokenValidation()
  const userData: User | null = useSelector((state: RootState) => state.auth.user);


  const changeUserData = useCallback(() => {
    alert("done")
  }, [])

  return (
    <div className="gogo__dash__container">
      <div style={{ position: "sticky", top: 0 }}>
        <SideBar />
      </div>
      {
        userData ? (
          <div className="gogo__profile">
            <Profile userData={userData} onClickButton={changeUserData} />
          </div>
        ) : (
          <div className="gogo__profile">
            <TrophySpin color="#db3c63" size="medium" text="" textColor="" />
          </div>
        )
      }
    </div>

  )
}

export default DashBoard