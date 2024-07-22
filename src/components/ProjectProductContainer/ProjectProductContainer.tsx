import React, { ReactNode } from 'react';
import "./projectproduct__container.css"

interface ProjectProductContainerProps {
    children: ReactNode
}
const ProjectProductContainer: React.FC<ProjectProductContainerProps> = ({children}) => {
      return (
        <div className='gogo__project__product__container'>
            {children}
        </div>
    )
}

export default ProjectProductContainer