import React from 'react'
import { IoMdAdd } from "react-icons/io";
import "./createproject.css"
import { CreateProjectProps } from '../../types';
const CreateProject: React.FC<CreateProjectProps> = (props) => {
    return (
        <div className='gogo__create__project' onClick={props.createProject} >
            <div className="gogo__create__project__child">
                <div className="gogo__create__project__icon">
                    <IoMdAdd />
                </div>
                <div className="gogo__project__title">
                    <p>Create Project</p>
                </div>
            </div>
        </div>
    )
}

export default CreateProject;