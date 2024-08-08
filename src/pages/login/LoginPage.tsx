import React, { useState } from 'react'
import { Button, Input, LoginAndRegisterSideDiv } from '../../components'
import { useForm } from 'react-hook-form'
import './login.css'
import serverAuth from '../../services/authServer'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import { jwtUtil, localStore } from '../../utils'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
    ACCESS_TOKEN_NAME,
    REFRESH_TOKEN__NAME,
    USER_LOCALSTORAGE_DATA_NAME,
} from '../../constant'
import { login as Login } from '../../features/authSlice'
import { motion } from 'framer-motion'
import { ImCross } from 'react-icons/im'
import authServer from '../../services/authServer'

const LoginPage = () => {
    const [loginButtonText, setLoginButtonText] = useState<string>('login')
    const [isloginButtonDisable, setLoginButtonDisable] =
        useState<boolean>(false)
    const [showResetPassword, setShowResetPassword] = useState<boolean>(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm()

    async function login(formData: any) {
        try {
            setLoginButtonText('Processing...')
            setLoginButtonDisable(true)
            const { email, password } = formData
            const userResponseData = await serverAuth.login(email, password)
            if (!userResponseData) {
                throw new Error('Something went wrong, try again')
            }

            console.log('userResponseData:', userResponseData) // Debugging: Log the response

            if (userResponseData.type === 'error') {
                throw new Error(userResponseData.message)
            } else if (userResponseData.type === 'success') {
                if (!userResponseData.user || !userResponseData.tokens) {
                    throw new Error('Invalid response structure')
                }

                const isAccessTokenSaved = jwtUtil.storeToken(
                    ACCESS_TOKEN_NAME,
                    userResponseData.tokens.accessToken
                )
                const isRefreshTokenSaved = jwtUtil.storeToken(
                    REFRESH_TOKEN__NAME,
                    userResponseData.tokens.refreshToken
                )

                if (isAccessTokenSaved && isRefreshTokenSaved) {
                    dispatch(
                        Login({
                            user: userResponseData.user,
                            refreshToken: userResponseData.tokens.refreshToken,
                            accessToken: userResponseData.tokens.accessToken,
                        })
                    )
                    localStore.setData(
                        USER_LOCALSTORAGE_DATA_NAME,
                        userResponseData.user
                    )
                }
            }
            // redirect to the projects page after login
            navigate('/dash/projects')
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message)
            } else {
                toast.error('Unknown error')
            }
            reset()
            setLoginButtonText('login')
            setLoginButtonDisable(false)
        }
    }

    const handleResetPasswordClick = () => {
        setShowResetPassword(true)
    }

    const hideResetPage = () => {
        setShowResetPassword(false)
    }

    return (
        <div className="login__page">
            <LoginAndRegisterSideDiv />
            <motion.form
                className="gogo__form"
                onSubmit={handleSubmit(login)}
                whileHover={{ scale: 1.1 }}
            >
                <div className="gogo__form__inputs">
                    <label htmlFor="email">Email</label>
                    <br />
                    {errors.email && (
                        <p className="gogo__error__message">
                            {errors.email.message + '***'}
                        </p>
                    )}
                    <Input
                        className="gogo__form__inputs__input"
                        type="email"
                        placeholder="email..."
                        {...register('email', {
                            required: 'Email is required!',
                        })}
                    />
                </div>
                <div className="gogo__form__inputs">
                    <label htmlFor="password">Password</label>
                    <br />
                    {errors.password && (
                        <p className="gogo__error__message">
                            {errors.password.message + '***'}
                        </p>
                    )}
                    <Input
                        className="gogo__form__inputs__input"
                        type="password"
                        placeholder="password..."
                        {...register('password', {
                            required: 'Password is required!',
                        })}
                    />
                </div>
                <div className="gogo__form__button">
                    <Button
                        text={loginButtonText}
                        className="gogo__form__button__login__and__register__button"
                        type="submit"
                        disabled={isloginButtonDisable}
                    />
                </div>
                <p>
                    Forget Password?{' '}
                    <i>
                        <strong>
                            <a
                                onClick={handleResetPasswordClick}
                                className={`cursor-pointer`}
                            >
                                Reset password
                            </a>
                        </strong>
                    </i>
                </p>
                <p>
                    Don't have an Account?{' '}
                    <i>
                        <strong>
                            <Link to="/register">Register</Link>
                        </strong>
                    </i>
                </p>
            </motion.form>

            {showResetPassword && (
                <div className={`reset__password__link`}>
                    {' '}
                    <span className={`cut__icon`} onClick={hideResetPage}>
                        {<ImCross />}
                    </span>{' '}
                    <ResetPasswordForm />{' '}
                </div>
            )}
        </div>
    )
}

const ResetPasswordForm = () => {
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }

    const handleGetPassword = async () => {
        // Simulate an API call to request a password reset
        try {
            setIsLoading(true)
            if (email) {
                const isPasswordSent = await authServer.resetPassword(email)
                if (isPasswordSent) {
                    toast.success(
                        `Password is sent to your ${isPasswordSent} email pleased check your mail`
                    )
                } else {
                    toast.error('Cannot send the password pleased try again!')
                }
            } else {
                setMessage('Please enter a valid email address.')
            }
        } catch (error) {
            toast.error(
                error instanceof Error
                    ? error.message
                    : 'Sorry cannot reset your password try again!'
            )
        } finally {
            setIsLoading(false)
            setEmail('')
        }
    }

    return (
        <div className="flex flex-col items-center p-6 bg-white shadow-lg rounded-lg w-full max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
                Reset Password
            </h2>
            <div className="w-full mb-4">
                <label
                    htmlFor="reset-password-email"
                    className="block text-sm font-medium text-gray-700 mb-2"
                >
                    Email:
                </label>
                <Input
                    type="email"
                    id="reset-password-email"
                    className="w-full px-4 py-2 text-red border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gogo-primary"
                    value={email}
                    onChange={handleEmailChange}
                    placeholder="Enter your email"
                    required
                />
            </div>
            <button
                style={isLoading ? { cursor: 'wait' } : {}}
                className="w-full py-2 px-4 bg-gogo-primary text-white font-semibold rounded-md shadow-sm hover:bg-gogo-button-hover focus:outline-none focus:ring-2 focus:ring-indigo-500"
                onClick={handleGetPassword}
            >
                {!isLoading ? `Send Reset Link` : 'sending...'}
            </button>
            {message && <p className="mt-4 text-red-500 text-sm">{message}</p>}
        </div>
    )
}

export default LoginPage
