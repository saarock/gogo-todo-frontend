import { Container, MainTop } from '../../components'
import useTokenValidation from "../../hooks/useTokenValidation.ts";

const HomePage = () => {
    return (
        <>
            <Container>
                <section>
                    <MainTop />
                </section>
            </Container>
        </>
    )
}

export default HomePage
