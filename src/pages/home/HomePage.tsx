import React from "react";
import { Container, MainTop } from "../../components";
import About from "../../components/about/About";
import TextScroll from "../../components/textscroll/TextScroll";

const HomePage = () => {
  return (
    <Container>
      <MainTop />
      <section>
        <About />
        <TextScroll/>
      </section>
    </Container>
  );
};

export default HomePage;
