import { useCallback, useState } from 'react'
import { CreateProduct, Product, ProductHeader, SideBar } from '../../components'
import "./project.css"
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Project as Projects, UserProject } from '../../types';

const Project = () => {
    const [wantToCreateProduct, setwantToCreateProduct] = useState<boolean>(false);
    const navigate = useNavigate();
    const projects = useSelector((state: UserProject) => state.projects);


    const letsCreateNewProject = useCallback(() => {
        setwantToCreateProduct(true);
        navigate("new-project")
    }, [wantToCreateProduct])

    const goToProduct = useCallback((projectName: string) => {
        navigate(projectName)
    }, [])




    return (
        <>
            <div className="gogo__projects__container">
                <div style={{ position: "sticky", top: 0 }}>
                    <SideBar />
                </div>
                <div className="gogo__products">
                    <div className="gogo__product__nav">
                        <ProductHeader />
                    </div>
                    <div className="gogo__product__products">
                        <CreateProduct createProject={letsCreateNewProject} />
                        {
                            projects && projects.length >= 1 ? (
                                projects.map((project) =>
                                    <div className='gogo__project' key={project.id}>

                                        <Product onClickEvent={() => goToProduct(project.name || "newproject")}
                                            productTitle={project.name} createAt={new Date().toLocaleDateString()} />

                                    </div>
                                )

                            ) : "No Projects Found"
                        }

                    </div>
                </div>
            </div>

        </>
    )
}

export default Project