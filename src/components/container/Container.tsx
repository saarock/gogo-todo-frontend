import React from 'react'
import { ChildrenProps } from '../../types'
import './container.css'

const Container: React.FC<ChildrenProps> = ({ children }) => {
    return (
        <>
            <main className="gogo_kan_main_container">
                <div className="gogo__container__for__child">{children}</div>
            </main>
        </>
    )
}

export default Container
