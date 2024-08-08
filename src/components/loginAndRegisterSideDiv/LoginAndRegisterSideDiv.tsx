import React, { useEffect, useState } from 'react'
import './loginandregisterSideDiv.css'
const LoginAndRegisterSideDiv = () => {
    const [trustNumbers, setTrustNumbers] = useState<number>(0)
    useEffect(() => {
        if (trustNumbers === 1000) return
        const interval = setInterval(() => {
            setTrustNumbers((prev) => prev + 1)
        }, 1)

        return () => {
            clearInterval(interval)
        }
    }, [trustNumbers])
    return (
        <div className="gogo__login__content">
            <h1>gogo.com</h1>
            <h3>
                The Powerful tool for managing task, routine, project's for your
                daily life.
            </h3>
            <p>Trusted By {trustNumbers}+</p>
        </div>
    )
}

export default LoginAndRegisterSideDiv
