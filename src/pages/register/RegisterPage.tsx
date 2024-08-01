import React, { useEffect, useState } from 'react'
import { Input, Button, LoginAndRegisterSideDiv } from '../../components'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import './register.css'
import serverAuth from '../../services/authServer'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { login } from '../../features/authSlice'
import Toast from '../../components/toast/Toast'
import { useNavigate } from 'react-router-dom'
import { Email, OtpResponse, RegisterResponseSuccess, User } from '../../types'
import { jwtUtil, localStore } from '../../utils'
import {
    ACCESS_TOKEN_NAME,
    REFRESH_TOKEN__NAME,
    USER_LOCALSTORAGE_DATA_NAME,
} from '../../constant'
import toast, { Toaster } from 'react-hot-toast'
import { motion } from 'framer-motion'

const RegisterPage = () => {
    const [registerButtonText, setRegisterButtonText] =
        useState<string>('Register')

    // while send the request to the server it helps to disable the button so that user cannot submit same data muliple times
    const [isRegisterButtonDisable, setRegisterButtonDisable] =
        useState<boolean>(false)
    // track Otp is send or not for allowing different function
    const [isOtpSend, setIsOtpSend] = useState<boolean>(false)

    //This state is notThing but just helps to track after user reigster HE/SHE get logged in or not and show the toast message
    const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean>(false)

    // after otp sent this helps to set the time
    const [remainingTime, setRemainingTime] = useState<number>(61)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm()

    // useEffect hook to track remaningTime after otp sent, otp expired
    useEffect(() => {
        if (!isOtpSend) {
            return
        }

        const decrementTime = () => {
            setRemainingTime((prevTime) => prevTime - 1)
        }

        const interval = setInterval(() => {
            decrementTime()
        }, 1000) // 1000 milliseconds = 1 second

        if (remainingTime === 0) {
            setIsOtpSend(false)
            setRemainingTime(61)
            setRegisterButtonText('Register')
            reset()
            clearInterval(interval)
        }

        return () => clearInterval(interval)
    }, [isOtpSend, remainingTime])

    /**
     * valiadate passoword
     */

    // Custom validation function for password strength
    const validatePassword = (value: string) => {
        if (!value) {
            return 'Password is required'
        }

        // Check for minimum length
        if (value.length < 8) {
            return 'Password must be at least 8 characters long'
        }

        // Check for uppercase letters
        if (!/[A-Z]/.test(value)) {
            return 'Password must contain at least one uppercase letter'
        }

        // Check for lowercase letters
        if (!/[a-z]/.test(value)) {
            return 'Password must contain at least one lowercase letter'
        }

        // Check for numbers
        if (!/\d/.test(value)) {
            return 'Password must contain at least one number'
        }

        // Check for special characters
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
            return 'Password must contain at least one special character'
        }

        return true // Password is strong
    }

    /**
     *
     * @param data userForm data
     * method to send the otp
     */
    const sendOtp: SubmitHandler<FieldValues> = async (data): Promise<void> => {
        try {
            if (data.password !== data.confirmPassword) {
                throw new Error('Password and Confirm Password doesnot match')
            }

            setRegisterButtonText('Sending...')
            setRegisterButtonDisable(true)
            const userEmailForOtp: Email = {
                email: data.email,
            }
            const responseMessage: OtpResponse | null =
                await serverAuth.sendMailForOtp(userEmailForOtp)
            if (responseMessage?.type == 'success') {
                toast.success(responseMessage.message)
                setIsOtpSend(true)
                setRegisterButtonDisable(false)
                setRegisterButtonText('send OTP')
            } else if (responseMessage?.type === 'error') {
                throw new Error(responseMessage.message)
            }
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message)
            } else {
                toast.error('An unexpected error occurred')
            }
            setIsOtpSend(false)
            setRegisterButtonDisable(false)
            setRegisterButtonText('Register')
            reset()
        }
    }

    /**
     *
     * @param data userForm data
     * Method for register the user after user verify the otp
     */

    const signup: SubmitHandler<FieldValues> = async (data) => {
        try {
            if (!data.otp && remainingTime === 0) {
                setIsOtpSend(false)
                setRemainingTime(61)
                sendOtp(data)
                return
            }

            if (!data.otp) {
                toast.error('Otp is required!')
                return
            }

            if (remainingTime === 0) {
                setIsOtpSend(false)
                setRemainingTime(61)
                sendOtp(data)
                return
            }

            if (data.password !== data.confirmPassword) {
                throw new Error('Password and Confirm Password doesnot match')
            }

            setRegisterButtonText('Processing...')
            setRegisterButtonDisable(true)
            const userFormData: User = {
                email: data.email,
                password: data.password,
                fullName: data.fullName,
            }
            const otp: bigint = data.otp
            const userData: RegisterResponseSuccess | null =
                await serverAuth.register(userFormData, otp)

            if (!userData) {
                throw new Error('Something went wrong, try again')
            }

            console.log('UserData:', userData) // Debugging: Log the response

            if (userData.type === 'error') {
                throw new Error(userData.message)
            } else if (userData.type === 'success') {
                if (!userData.user || !userData.tokens) {
                    throw new Error('Invalid response structure')
                }

                const isAccessTokenSaved = jwtUtil.storeToken(
                    ACCESS_TOKEN_NAME,
                    userData.tokens.accessToken
                )
                const isRefreshTokenSaved = jwtUtil.storeToken(
                    REFRESH_TOKEN__NAME,
                    userData.tokens.refreshToken
                )

                if (isAccessTokenSaved && isRefreshTokenSaved) {
                    dispatch(
                        login({
                            user: userData.user,
                            refreshToken: userData.tokens.refreshToken,
                            accessToken: userData.tokens.accessToken,
                        })
                    )
                    localStore.setData(
                        USER_LOCALSTORAGE_DATA_NAME,
                        userData.user
                    )
                }

                setIsUserLoggedIn(true)
                // redirect to the projects page after signup
                navigate('/dash/projects')
            }
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message)
            } else {
                toast.error('An unexpected error occurred')
            }
            setRegisterButtonText('Register')
            setRegisterButtonDisable(false)
            setIsOtpSend(false)
            reset()
            setRemainingTime(61)
        }
    }

    return (
        <div className="register__page flex items-center justify-center">
            <LoginAndRegisterSideDiv />
            <motion.form
                className="gogo__form"
                onSubmit={
                    isOtpSend ? handleSubmit(signup) : handleSubmit(sendOtp)
                }
                whileHover={{ scale: 1.1 }}
            >
                <div className="gogo__form__inputs">
                    <label htmlFor="fullName">Full Name</label>
                    <br />
                    {errors.fullName && (
                        <p className="gogo__error__message">
                            {errors.fullName.message + '***'}
                        </p>
                    )}
                    <Input
                        className="gogo__form__inputs__input"
                        type="text"
                        placeholder="Full Name..."
                        disabled={isOtpSend}
                        {...register('fullName', {
                            required: 'Full Name is required',
                        })}
                    />
                </div>
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
                        placeholder="Email..."
                        disabled={isOtpSend}
                        {...register('email', {
                            required: 'Email is required',
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
                        placeholder="Password..."
                        disabled={isOtpSend}
                        {...register('password', {
                            required: 'Password is required',
                            minLength: {
                                value: 8,
                                message:
                                    'Password must have at least 8 characters',
                            },
                            validate: validatePassword,
                        })}
                    />
                </div>

                <div className="gogo__form__inputs">
                    <label htmlFor="password">Confirm Password</label>
                    <br />
                    {errors.confirmPassword && (
                        <p className="gogo__error__message">
                            {errors.confirmPassword.message + '***'}
                        </p>
                    )}
                    <Input
                        className="gogo__form__inputs__input"
                        type="password"
                        placeholder="Password..."
                        disabled={isOtpSend}
                        {...register('confirmPassword', {
                            required: 'ConfirmPassword is required',
                            minLength: {
                                value: 8,
                                message:
                                    'Password must have at least 8 characters',
                            },
                            validate: validatePassword,
                        })}
                    />
                </div>

                {isOtpSend ? (
                    <div className="gogo__form__inputs">
                        <label htmlFor="password">Send Otp</label>
                        <br />
                        {errors.password && (
                            <p className="gogo__error__message">
                                {errors.otp?.message + '***'}
                            </p>
                        )}
                        <Input
                            className="gogo__form__inputs__input"
                            type="number"
                            placeholder="Provide Otp..."
                            disabled={!isOtpSend}
                            {...register('otp')}
                        />
                    </div>
                ) : (
                    ''
                )}

                <div className="gogo__form__button">
                    <Button
                        text={
                            registerButtonText +
                            ' ' +
                            (remainingTime > 0 && remainingTime < 60
                                ? remainingTime
                                : '')
                        }
                        className={`gogo__form__button__login__and__register__button ${
                            isRegisterButtonDisable
                                ? 'gogo__form__button__login__and__register__button__make__not__clickable'
                                : ''
                        }`}
                        type={'submit'}
                        disabled={isRegisterButtonDisable}
                    />
                </div>
                <p>
                    Already have Account ?{' '}
                    <i>
                        <strong>
                            <Link to="/login">Login</Link>
                        </strong>
                    </i>
                </p>
            </motion.form>

            {/* toast */}
            {isUserLoggedIn ? (
                <Toast message="Welcome and Enjoy thanks for joining us!" />
            ) : (
                ''
            )}

            {isOtpSend ? (
                <Toast message="Otp is send to your mail pleased enter the Otp under 1 minute" />
            ) : (
                ''
            )}
        </div>
    )
}

export default RegisterPage
