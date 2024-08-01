import React, { useEffect, useState, useCallback } from 'react'
import { useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import { Review, RootState } from '../../types'
import userService from '../../services/userService.ts'
import useTheme from '../../context/modeContext.ts'

const ContactPage = () => {
    const user = useSelector((state: RootState) => state.auth)
    const [loading, setLoading] = useState<boolean>(false)
    const [message, setMessage] = useState<string>('')
    const [email, setEmail] = useState<string>(
        user.isAuthenticated ? user.email : ''
    )
    const [fullName, setFullName] = useState<string>(
        user.isAuthenticated ? user.fullName : ''
    )
    const theme = useTheme()

    useEffect(() => {
        if (user.isAuthenticated) {
            setFullName(user.user.fullName)
            setEmail(user.user.email)
        }
    }, [user.isAuthenticated])

    const sendReview = useCallback(
        async (e: React.FormEvent<HTMLFormElement>) => {
            try {
                setLoading(true)
                e.preventDefault()
                if (!fullName || !email || !message) {
                    toast.error('Please fill all the details.')
                    return
                }
                const review: Review = {
                    fullName,
                    email,
                    message,
                }
                const doesSaved = await userService.saveReview(review)
                if (doesSaved) {
                    toast.success(
                        'Thanks for your review. We appreciate your feedback.'
                    )
                } else {
                    throw new Error(
                        'Sorry, something went wrong. Please try again later.'
                    )
                }
            } catch (error) {
                toast.error(
                    error instanceof Error
                        ? error.message
                        : 'Sorry, cannot post the review. Please try again later.'
                )
            } finally {
                setLoading(false)
                setMessage('')
            }
        },
        [loading, email, fullName, message]
    )

    return (
        <section>  
        <div className="min-h-screen flex items-center justify-center py-12">
            <div className="shadow-lg rounded-lg p-8 w-full max-w-4xl">
                <div className="flex flex-col md:flex-row justify-between">
                    <div className="md:w-1/2 p-4">
                        <h2 className="text-4xl font-bold mb-6">
                            Get in Touch with Gogo
                        </h2>
                        <form onSubmit={sendReview}>
                            <div className="mb-4">
                                <label className="block text-gray-700">
                                    Full Name
                                </label>
                                <input
                                    value={fullName}
                                    type="text"
                                    onChange={(e) =>
                                        setFullName(e.target.value)
                                    }
                                    className={`w-full p-3 border border-red-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-gogo-primary  ${theme.themeMode === 'dark' ? 'gogo__dark__input' : ''}`}
                                    disabled={user.isAuthenticated}
                                    style={{
                                        cursor: user.isAuthenticated
                                            ? 'not-allowed'
                                            : '',
                                    }}
                                />
                                {user.isAuthenticated || (
                                    <p className="text-red-500 text-sm">
                                        Please enter your full name
                                    </p>
                                )}
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">
                                    Email
                                </label>
                                <input
                                    value={email}
                                    type="email"
                                    onChange={(e) => setEmail(e.target.value)}
                                    style={{
                                        cursor: user.isAuthenticated
                                            ? 'not-allowed'
                                            : '',
                                    }}
                                    disabled={user.isAuthenticated}
                                    className={`w-full p-3 border border-red-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-gogo-primary  ${theme.themeMode === 'dark' ? 'gogo__dark__input' : ''}`}
                                />
                                {user.isAuthenticated || (
                                    <p className="text-red-500 text-sm">
                                        Please enter your email
                                    </p>
                                )}
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">
                                    Your Message / Review
                                </label>
                                <textarea
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    className={`w-full p-3 border border-red-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-gogo-primary  ${theme.themeMode === 'dark' ? 'gogo__dark__input' : ''}`}
                                    placeholder="Write your message / review"
                                ></textarea>
                                <p className="text-red-500 text-sm">
                                    Please enter a message
                                </p>
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                style={loading ? { cursor: 'not-allowed' } : {}}
                                className="w-full p-3 text-white rounded-lg bg-gogo-button hover:bg-gogo-button-hover focus:outline-none focus:ring-2 focus:ring-gogo-primary"
                            >
                                {loading ? 'Sending...' : 'Send Message'}
                            </button>
                        </form>
                    </div>
                    <div className="md:w-1/2 p-4 flex flex-col justify-center items-center">
                        <h2 className="text-4xl font-bold mb-4">
                            We'd Love to Hear from You
                        </h2>
                        <p className="text-gray-700 mb-6">
                            Have questions or feedback? Get in touch with the
                            Gogo team! We value your input and are here to help
                            with any inquiries you may have.
                        </p>
                        <a
                            href="#"
                            className="text-gogo-primary hover:text-gogo-green font-semibold"
                        >
                            Learn more about Gogo
                        </a>
                    </div>
                </div>
            </div>
        </div>
        </section>
    )
}

export default ContactPage
