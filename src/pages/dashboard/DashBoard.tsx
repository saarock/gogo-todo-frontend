import React, { useCallback } from "react";
import { Profile, SideBar } from "../../components";
import "./dash.css";
import { useSelector } from "react-redux";
import { RootState, User } from "../../types";
import { TrophySpin } from "react-loading-indicators";
import useTokenValidation from "../../hooks/useTokenValidation";
import DashContainer from "../../components/DashContainer";
import GoGoDashContainerBox from "../../components/gogoDashContainerBox/GoGoDashContainerBox";
const DashBoard: React.FC = () => {
  // useTokenValidation()
  const userData: User | null = useSelector(
    (state: RootState) => state.auth.user
  );

  const changeUserData = useCallback(() => {
    alert("done");
  }, []);

  return (
    <div className="gogo__dash__container">
      <DashContainer>
        <div className="gogo__profile__container">

     
          {userData ? (
            <div className="gogo__profile__details__dash">
                    <div className="gogo__profile__right">
              <Profile userData={userData} onClickButton={changeUserData} />
              </div>
              <div className="gogo__profile__details">
              <GoGoDashContainerBox/>
              </div>
              <div className="gogo__profile__details">
              <GoGoDashContainerBox/>
              </div>
              <div className="gogo__profile__details">
              <GoGoDashContainerBox/>
              </div>
      
            </div>
          ) : (
            <div className="gogo__profile">
              <TrophySpin color="#db3c63" size="medium" text="" textColor="" />
            </div>
          )}


        </div>
      </DashContainer>
    </div>
  );
};

export default DashBoard;
