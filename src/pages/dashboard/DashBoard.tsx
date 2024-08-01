import React, { useCallback, useState } from 'react'
import { Button, Input } from '../../components'
import './dash.css'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, User } from '../../types'
import { TrophySpin } from 'react-loading-indicators'
import DashContainer from '../../components/DashContainer'
import { FaEdit } from 'react-icons/fa'
import { localStore } from '../../utils'
import userService from '../../services/userService.ts'
import { userGitUserNameChange } from '../../features/authSlice.ts'
import toast from 'react-hot-toast'
import useTheme from '../../context/modeContext.ts'

const DashBoard: React.FC = () => {
    const userData: User | null = useSelector(
        (state: RootState) => state.auth.user
    )
    const [isEditingGitHub, setIsEditingGitHub] = useState(false)
    const [newGitHubLink, setNewGitHubLink] = useState(userData?.github || '')
    const [isUpdatingPassword, setIsUpdatingPassword] = useState(false)
    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const dispatch = useDispatch()
    const theme = useTheme()
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const changeUserData = useCallback(() => {
        setIsEditingGitHub(true)
    }, [])

    const saveGitHubLink = useCallback(async () => {
        setIsEditingGitHub(false)
        if (!userData) {
            toast.error('Something went wrong, please try again.')
            return
        }
        try {
            const newUser = await userService.changeUserGitHubUserName(
                userData.id,
                newGitHubLink
            )
            dispatch(userGitUserNameChange(newUser.gitUserName as string))
            toast.success('GitHub username updated successfully!')
        } catch (error) {
            toast.error('Failed to update GitHub username.')
        }
    }, [newGitHubLink, userData, dispatch])

    const cancelInput = useCallback(() => {
        setIsEditingGitHub(false)
    }, [])

    const startPasswordUpdate = useCallback(() => {
        setIsUpdatingPassword(true)
    }, [])

    const updatePassword = useCallback(async () => {
        if (!userData) {
            toast.error('Something went wrong, please try again.')
            return
        }
        if (newPassword !== confirmPassword) {
            toast.error('New passwords do not match.')
            return
        }
        try {
            setIsLoading(true)
            const isPasswordUpdate = await userService.updatePassword(
                currentPassword,
                newPassword,
                userData.email
            )
            if (isPasswordUpdate)
                toast.success('Password updated successfully!')
            else throw new Error('Sorry try again!')
        } catch (error) {
            toast.error(
                error instanceof Error
                    ? error.message
                    : ' Failed to update password!'
            )
        } finally {
            setIsLoading(false)
            setIsUpdatingPassword(false)
            setCurrentPassword('')
            setNewPassword('')
            setConfirmPassword('')
        }
    }, [currentPassword, newPassword, confirmPassword, userData])

    const cancelPasswordUpdate = useCallback(() => {
        setIsUpdatingPassword(false)
        setCurrentPassword('')
        setNewPassword('')
        setConfirmPassword('')
    }, [])

    return (
        <section> 
        <div className={`gogo__dash__container`}>
            <DashContainer>
                <div className={`gogo__profile__container`}>
                    {userData ? (
                        <div className="gogo__pofile__container mx-5 p-4">
                            <div
                                className={`bg-white p-8 rounded-lg shadow-lg gogo__little__dark__${theme.themeMode}`}
                            >
                                <div className="flex items-center mb-8">
                                    <div className="flex-shrink-0">
                                        <img
                                            className="h-16 w-16 rounded-full"
                                            src="https://via.placeholder.com/150"
                                            alt="User Avatar"
                                        />
                                    </div>
                                    <div className="ml-6">
                                        <h2 className="text-3xl font-bold">
                                            {userData.fullName}
                                        </h2>
                                        <p className="text-gray-500 text-lg">
                                            {userData.email}
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-8">
                                    <h3 className="text-2xl font-semibold mb-4">
                                        Personal Information
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <p className="text-lg">
                                            <strong>Userid:</strong>{' '}
                                            {userData.id}
                                        </p>
                                        <p className="text-lg">
                                            <strong>Role:</strong>{' '}
                                            <span
                                                className={`px-3 py-1 ${theme.themeMode === 'light' ? 'bg-gray-200' : 'bg-gray-500'} rounded`}
                                            >
                                                {userData.role || 'user'}
                                            </span>
                                        </p>
                                        <p className="text-lg">
                                            <strong>Email Verified:</strong>{' '}
                                            <span className="px-3 py-1 bg-gogo-primary text-white rounded">
                                                Verified
                                            </span>
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-8 flex flex-col md:flex-row md:space-x-8">
                                    <div className="mb-8 md:mb-0">
                                        <h3 className="text-2xl font-semibold mb-4">
                                            Project Details
                                        </h3>
                                        <div className="space-y-2">
                                            <p className="text-lg">
                                                <strong>Total Project: </strong>{' '}
                                                {localStore.getProjectNumber()}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-8">
                                    <h3 className="text-2xl font-semibold mb-4">
                                        Social Media
                                    </h3>
                                    <p className="text-lg flex items-center">
                                        <strong>GitHub:</strong>
                                        {isEditingGitHub ? (
                                            <div className="flex items-center ml-2">
                                                <Input
                                                    type="text"
                                                    className="border border-gray-300 p-2 rounded"
                                                    value={newGitHubLink}
                                                    onChange={(e) =>
                                                        setNewGitHubLink(
                                                            e.target.value
                                                        )
                                                    }
                                                    placeholder="Enter GitHub username"
                                                />
                                                <Button
                                                    text={`update`}
                                                    className="ml-2 px-4 py-2 bg-gogo-primary text-white rounded"
                                                    onClick={saveGitHubLink}
                                                >
                                                    Save
                                                </Button>
                                                <Button
                                                    text={`cancel`}
                                                    className="ml-2 px-4 py-2 bg-gogo-primary text-white rounded"
                                                    onClick={cancelInput}
                                                >
                                                    Cancel
                                                </Button>
                                            </div>
                                        ) : (
                                            <>
                                                <a
                                                    href={`https://github.com/${userData.userGithubUserName}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-blue-500 ml-2"
                                                >
                                                    {userData.userGithubUserName ? (
                                                        <strong>
                                                            {' '}
                                                            https://github.com/
                                                            {
                                                                userData.userGithubUserName
                                                            }
                                                        </strong>
                                                    ) : (
                                                        'Please provide the GitHub username'
                                                    )}
                                                </a>
                                                <FaEdit
                                                    className="ml-2 cursor-pointer text-gray-500 hover:text-gray-700"
                                                    onClick={changeUserData}
                                                />
                                            </>
                                        )}
                                    </p>
                                </div>

                                <div className="mt-8 w-64">
                                    <h3 className="text-2xl font-semibold mb-4">
                                        Update Password
                                    </h3>
                                    {isUpdatingPassword ? (
                                        <div className="flex flex-col">
                                            <Input
                                                type="password"
                                                className="border border-gray-300 p-2 rounded mb-2"
                                                value={currentPassword}
                                                onChange={(e) =>
                                                    setCurrentPassword(
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="Current Password"
                                            />
                                            <Input
                                                type="password"
                                                className="border border-gray-300 p-2 rounded mb-2"
                                                value={newPassword}
                                                onChange={(e) =>
                                                    setNewPassword(
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="New Password"
                                            />
                                            <Input
                                                type="password"
                                                className="border border-gray-300 p-2 rounded mb-4"
                                                value={confirmPassword}
                                                onChange={(e) =>
                                                    setConfirmPassword(
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="Confirm New Password"
                                            />
                                            <Button
                                                style={
                                                    isLoading
                                                        ? { cursor: 'wait' }
                                                        : {}
                                                }
                                                text={` ${isLoading ? 'wait a minute please...' : 'update'}`}
                                                className="mb-2 px-4 py-2 bg-gogo-primary text-white rounded"
                                                onClick={updatePassword}
                                            >
                                                Update Password
                                            </Button>
                                            <Button
                                                text={`cancel`}
                                                className="px-4 py-2 bg-gogo-primary text-white rounded"
                                                onClick={cancelPasswordUpdate}
                                            >
                                                Cancel
                                            </Button>
                                        </div>
                                    ) : (
                                        <Button
                                            text={`update password`}
                                            className="px-4 py-2 bg-gogo-primary text-white rounded"
                                            onClick={startPasswordUpdate}
                                        >
                                            Update Password
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="gogo__profile">
                            <TrophySpin
                                color="#db3c63"
                                size="medium"
                                text=""
                                textColor=""
                            />
                        </div>
                    )}
                </div>
            </DashContainer>
        </div>
</section>
    )
}

export default DashBoard
