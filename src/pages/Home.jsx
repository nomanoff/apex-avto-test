import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import bgImg from "../assets/background1.png";
import Navbar from "../components/Navbar";
import Experience from "../components/Experience";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import { GrFormNextLink } from "react-icons/gr";

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(
      to bottom,
      rgba(10, 10, 10, 0.95),
      rgba(15, 23, 42, 0.9)
    ),
    url(${bgImg}) center/cover fixed no-repeat;
  display: flex;
  flex-direction: column;
  font-family: "Inter", sans-serif;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(
      circle at 20% 50%,
      rgba(56, 189, 248, 0.1) 0%,
      transparent 50%
    );
    pointer-events: none;
  }
`;

const HeroSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  text-align: center;
  padding: 0 20px;
  position: relative;
  z-index: 1;
`;

const Title = styled.h1`
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 800;
  margin-bottom: 1.5rem;
  background: linear-gradient(135deg, #ffffff 0%, #a5b4fc 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -0.5px;
  line-height: 1.2;
  max-width: 900px;
`;

const Subtitle = styled.p`
  font-size: clamp(1rem, 2vw, 1.3rem);
  font-weight: 400;
  margin-bottom: 3rem;
  color: #cbd5e1;
  max-width: 700px;
  line-height: 1.6;
  opacity: 0.9;
`;

const StartButton = styled.button`
  padding: 18px 45px;
  font-size: 1.1rem;
  border: none;
  border-radius: 50px;
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  color: white;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 12px;
  box-shadow: 0 10px 25px -5px rgba(99, 102, 241, 0.3),
    0 0 20px rgba(99, 102, 241, 0.1);
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    transition: left 0.7s;
  }

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 15px 30px -5px rgba(99, 102, 241, 0.4),
      0 0 30px rgba(99, 102, 241, 0.2);

    &::before {
      left: 100%;
    }
  }

  &:active {
    transform: translateY(-1px);
  }
`;

const ButtonText = styled.span`
  font-size: 1.1rem;
  font-weight: 600;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  transition: transform 0.3s ease;

  ${StartButton}:hover & {
    transform: translateX(5px);
  }
`;

const StatsContainer = styled.div`
  display: flex;
  gap: 3rem;
  margin-top: 4rem;
  flex-wrap: wrap;
  justify-content: center;
`;

const StatItem = styled.div`
  text-align: center;
`;

const StatNumber = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  background: linear-gradient(135deg, #60a5fa 0%, #a78bfa 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  font-size: 0.9rem;
  color: #94a3b8;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const ScrollIndicator = styled.div`
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  animation: bounce 2s infinite;

  @keyframes bounce {
    0%,
    20%,
    50%,
    80%,
    100% {
      transform: translateY(0) translateX(-50%);
    }
    40% {
      transform: translateY(-10px) translateX(-50%);
    }
    60% {
      transform: translateY(-5px) translateX(-50%);
    }
  }
`;

const ScrollLine = styled.div`
  width: 2px;
  height: 40px;
  background: linear-gradient(to bottom, transparent, #6366f1, transparent);
`;

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <Container>
        <Navbar />
        <HeroSection>
          <Title>
            Haydovchilik guvohnomasi uchun
            <br />
            <span style={{ color: "#60a5fa" }}>Zamonaviy</span> tayyorgarlik
          </Title>
          <Subtitle>
            Haqiqiy amaliyot testlari, 700+ savollar, interaktiv o'quv
            vositalari va sun'iy intellekt yordami. Sizning muvaffaqiyatingiz -
            bizning maqsadimiz.
          </Subtitle>
          <StartButton onClick={() => navigate("/select")}>
            <ButtonText>Boshlash</ButtonText>
            <IconWrapper>
              <GrFormNextLink size={24} color="white" />
            </IconWrapper>
          </StartButton>

          <StatsContainer>
            <StatItem>
              <StatNumber>700+</StatNumber>
              <StatLabel>Savollar</StatLabel>
            </StatItem>
            <StatItem>
              <StatNumber>98%</StatNumber>
              <StatLabel>Muvaffaqiyat</StatLabel>
            </StatItem>
            <StatItem>
              <StatNumber>24/7</StatNumber>
              <StatLabel>Qo'llab-quvvatlash</StatLabel>
            </StatItem>
            <StatItem>
              <StatNumber>AI</StatNumber>
              <StatLabel>Yordamchi</StatLabel>
            </StatItem>
          </StatsContainer>

          <ScrollIndicator>
            <ScrollLine />
          </ScrollIndicator>
        </HeroSection>
      </Container>

      <Experience />
      <Hero />
      
      <Footer />
    </>
  );
};

export default Home;