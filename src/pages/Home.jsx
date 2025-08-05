import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import bgImg from "../assets/background1.png";
import Navbar from "../components/Navbar";
import Experience from "../components/Experience";
import Hero from "../components/Hero";
import Footer from "../components/Footer";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background: linear-gradient(rgba(0, 0, 0, 0.42), rgba(0, 0, 0, 0.42)),
    url(${bgImg}) center/cover no-repeat;
  display: flex;
  flex-direction: column;
  font-family: "Roboto", sans-serif;
`;

const Hero2 = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 40px;
  font-weight: 700;
  margin-bottom: 20px;
`;

const Subtitle = styled.p`
  font-size: 18px;
  font-weight: 400;
  margin-bottom: 40px;
`;

const StartButton = styled.button`
  padding: 15px 30px;
  font-size: 18px;
  border: none;
  border-radius: 40px;
  background-color: white;
  color: black;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: bold;

  &:hover {
    background-color: #eaeaea;
    transform: scale(1.05);
  }
`;

const Home = () => {
  const [lang, setLang] = useState("uzlotin");
  
  const navigate = useNavigate();


  const handleStart = () => {
    navigate("/quiz", { state: { lang } });
  };

  return (
    <>

        <Container>
          <Navbar />
          <Hero2>
            <Title>Haydovchilik guvohnomasi uchun tayyorlaning</Title>
            <Subtitle>
              Haqiqiy amaliyot testlari, 700 dan ortiq savollar va interaktiv
              o‘quv vositalari.
            </Subtitle>
            <StartButton onClick={() => navigate("/select")}>
              Hoziroq boshlang --&gt;
            </StartButton>
          </Hero2>
        </Container>

        <Experience />
        <Hero />
        <Footer />
    </>
  );
};

export default Home;
