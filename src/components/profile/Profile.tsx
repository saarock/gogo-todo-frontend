import React from 'react'
import "./profile.css"
import { User } from '../../types'
import { ProfileProps } from '../../types'
  
const Profile: React.FC<ProfileProps> = (userData) => {
    return (
        <div className='gogo___profile__container'>
            <div className="gogo__profile__container__child">
                <div className="gogo__profile__pic">
                    <h2>{userData.userData.fullName}</h2>
                </div>
                <div className="gogo__profile__name">
                    <h2>{userData.userData.fullName}</h2>
                </div>
                <div className="gogo__profile__email">
                    <h2>{userData.userData.email}</h2>
                </div>
                <div className="gogo__profile__change__save__btn">
                    <button className='gogo__submit__btn' onClick={userData.onClickButton}> Submit</button>
                </div>
        
            </div>
        </div>
    )
}

export default Profile