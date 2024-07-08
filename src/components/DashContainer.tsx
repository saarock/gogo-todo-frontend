import React, { useCallback, useReducer, useState } from "react";
import { ChildrenProps } from "../types";
import SideBar from "./sidebar/SideBar";
import { UserActionType, userInitialState, userReducer } from "../reducer/user.reducer";

const DashContainer: React.FC<ChildrenProps> = ({ children }) => {

  const [userState,userDispatch] = useReducer(userReducer, userInitialState);

  const onClickEditButton= useCallback(() => {
    userDispatch({
      type: UserActionType.IS_USER_WANT_TO_CHANGE_FULL_NAME,
      payload: userState.isUserWantToUpdateTheFullName? false: true
      
    })
  }, [userState.isUserWantToUpdateTheFullName]);

  const onChangeUserFullName = useCallback((e:React.ChangeEvent<HTMLInputElement>) =>  {
    userDispatch({
      type: UserActionType.SET_USER_FULL_NAME,
      payload: e.target.value
      
    })
  }, [userState.userNewFullName]);

  const changeSave = useCallback(() => {
    alert(userState.userNewFullName)
  },[userState.userNewFullName])
  return (
    <div className="gogo__dash__container">
        <div className="gogo__side__bar">
          <SideBar onClickEditButton={onClickEditButton} onChangeUserFullName={onChangeUserFullName} 
          isUserWantToChangeFullName={userState.isUserWantToUpdateTheFullName}
          changeSave={changeSave}
          userNewFullName={userState.userNewFullName}
          />
      </div>

      <div className="gogo__dash__child">{children}</div>
    </div>
  );
};

export default React.memo(DashContainer);
