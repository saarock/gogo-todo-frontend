import { useSelector } from 'react-redux'
import { Project, UserProject } from '../types'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'

const useCheckProductsAndReturnIfExist = (): [Project | null] => {
    const { productname } = useParams<{ productname: string }>()
    const userProjects = useSelector((state: UserProject) => state.projects)

    if (userProjects && userProjects.length > 0) {
        const foundProject = userProjects.find(
            (project) =>
                project.name?.trim().toLowerCase() ===
                productname?.trim().toLowerCase()
        )

        if (foundProject) {
            return [foundProject]
        }
    }

    return [null]
}

export default useCheckProductsAndReturnIfExist
