import { Container, GoToTop, MainTop } from "../../components";
import About from "../../components/about/About";
import Contact from "../../components/contact/Contact.tsx";

const HomePage = () => {
  return (
    <>
    <Container>
      <MainTop />
      <section>
        <About />
      </section>
      <section>
        <Contact/>
      </section>

    </Container>
    
    </>
  
  );
};

export default HomePage;
