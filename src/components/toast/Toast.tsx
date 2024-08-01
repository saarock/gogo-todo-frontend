import React, { useState, useEffect } from 'react'
import './toast.css' // Import CSS for styling

const Toast = ({
    message = 'succes',
    duration = 7000,
    className = 'gogo_success__toast',
}) => {
    const [visible, setVisible] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false)
        }, duration)

        return () => {
            clearTimeout(timer)
        }
    }, [duration])

    return (
        <div className={visible ? className : 'gogo__toast__removal'}>
            {message}
        </div>
    )
}

export default Toast
