import { useDispatch, useSelector } from 'react-redux'
import { Project, UserProject } from '../types'

const useAddProjects = (newProjects: Project[]) => {
    const dispatch = useDispatch()
    const currentProjects = useSelector((state: UserProject) => state.projects)

    const addProjects = () => {
        if (!currentProjects) {
            return
        }
        const uniqueProjects = newProjects.filter(
            (project) =>
                !currentProjects.some(
                    (existingProject) => existingProject.id === project.id
                )
        )

        if (uniqueProjects.length > 0) {
            dispatch({ type: 'ADD_PROJECTS', payload: uniqueProjects })
        }
    }

    return addProjects
}

export default useAddProjects
