import { Container, GoToTop, MainTop } from "../../components";
import About from "../../components/about/About";
import Contact from "../../components/contact/Contact.tsx";
import {useCallback, useState} from "react";
import {useSelector} from "react-redux";
import toast from "react-hot-toast";
import {RootState} from "../../types";

const HomePage = () => {
  const user = useSelector((state: RootState) => state.auth);

  const [message, setMessage] = useState<string>("")
  const onChangeMessage = useCallback((e) => {
    setMessage(e.target.value);
  }, [message]);

  const onSubmitMessage = useCallback((e) => {
    e.preventDefault()
    if (!user.isAuthenticated) {
      toast.error("Please log in!");
      return;
    } else {
      toast.loading("sending")
    }
  }, [message])
  return (
    <>
    <Container>
      <MainTop />
      <section>
        <About />
      </section>
      <section>
        <Contact onChange={onChangeMessage} onSubmit={onSubmitMessage} message={message}/>
      </section>

    </Container>
    
    </>
  
  );
};

export default HomePage;
