import React from 'react'
import "./profile.css"
import { User } from '../../types'
import { ProfileProps } from '../../types'
  
const Profile: React.FC<ProfileProps> = (userData) => {
    return (
        <div className='gogo___profile__container'>
            <div className="gogo__profile__container__child">
                <div className="gogo__profile__name">
                    <h2> Full Name: {userData.userData.fullName}</h2>
                </div>
                <div className="gogo__profile__email">
                    <h2> {userData.userData.email}</h2>
                </div>
            </div>
        </div>
    )
}

export default Profile