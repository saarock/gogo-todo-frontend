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
                                                src="data:image/jpeg;base64,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"
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
                                                    <strong>
                                                        Total Project:{' '}
                                                    </strong>{' '}
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
                                                    onClick={
                                                        cancelPasswordUpdate
                                                    }
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
