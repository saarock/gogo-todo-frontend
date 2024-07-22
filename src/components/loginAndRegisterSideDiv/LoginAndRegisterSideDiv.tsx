import React, { useEffect, useState } from 'react'
import "./loginandregisterSideDiv.css"
const LoginAndRegisterSideDiv = () => {
  const [trustNumbers , setTrustNumbers] = useState<number>(0)
  useEffect(() => {
    if (trustNumbers === 1000) return;
    const interval = setInterval(() => {
      setTrustNumbers((prev) => prev+1)
    }, 1)


    return () => {
      clearInterval(interval);
    }
  },[trustNumbers])
  return (
    <div className="gogo__login__content">
    <h1>gogo.com</h1>
    <h3>The Powerfull kanban board for your daily projects</h3>
    <p>Trusted By {trustNumbers}+
    </p>
    
  </div>
  )
}

export default LoginAndRegisterSideDiv