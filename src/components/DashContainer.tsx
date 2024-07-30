import React, { useCallback, useReducer, useState } from "react";
import { ChildrenProps, RootState, User, UserNewNameAndId } from "../types";
import SideBar from "./sidebar/SideBar";
import { UserActionType, userInitialState, userReducer } from "../reducer/user.reducer";
import { useSelector } from "react-redux";
import { authClient } from "../services";
import { localStore } from "../utils";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { updateFullName } from "../features/authSlice";
import Loader from "./loader/Loader";

const DashContainer: React.FC<ChildrenProps> = ({ children }) => {

  const [loading, setLoading] = useState<boolean>(false);
  const [userState,userDispatch] = useReducer(userReducer, userInitialState);
  const user = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();


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

  const changeSave = useCallback(async() => {
    if (!user.isAuthenticated) authClient.logout();
    if (!user.user?.id) {
      authClient.logout();
      return;
    }

    const userFullNameChangeDetails: UserNewNameAndId = {
      fullName: userState.userNewFullName,
      id: user.user.id
    }
    setLoading(true)

    try {

    await dispatch<any>(updateFullName(userFullNameChangeDetails))
    toast.success("fullName update SuccessFully")
    } catch(error) {
      toast.error(error instanceof Error
        ? error.message
        : "Error while updating the boardName")
    } finally {
    setLoading(false)
    userDispatch({
      type: UserActionType.SET_USER_FULL_NAME,
      payload : ""
    });
    userDispatch({
      type: UserActionType.IS_USER_WANT_TO_CHANGE_FULL_NAME,
      payload : false
    })

    }


  },[userState.userNewFullName, userState.isUserWantToUpdateTheFullName])
  if (loading) return <Loader/>
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
