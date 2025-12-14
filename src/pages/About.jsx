import Navbar from "../components/Navbar";
import styled from "styled-components";
import bgImg from "../assets/background1.png";
import { FaInstagram, FaLinkedin, FaTwitter, FaFacebook, FaPlay, FaExternalLinkAlt } from "react-icons/fa";
import Footer from "../components/Footer";

//images
import Image1 from "../assets/image2.png";
import Image2 from "../assets/image3.png";
import Image3 from "../assets/image4.png";
import Image4 from "../assets/image5.png";

const Container = styled.div`
  background-color: #0f172a;
  color: #e2e8f0;
  font-family: 'Inter', sans-serif;
  min-height: 100vh;
  position: relative;
`;

const BgImg = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(
      to bottom,
      rgba(15, 23, 42, 0.95),
      rgba(30, 41, 59, 0.9)
    ),
    url(${bgImg}) center/cover fixed no-repeat;
  width: 100%;
  height: 100vh;
  min-height: 700px;
  text-align: center;
  padding: 0 20px;
  position: relative;
  overflow: hidden;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(
      circle at 30% 20%,
      rgba(56, 189, 248, 0.1) 0%,
      transparent 50%
    );
    pointer-events: none;
  }
`;

const HeroTitle = styled.h1`
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  font-weight: 800;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #ffffff 0%, #60a5fa 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1.2;
  max-width: 900px;
`;

const HeroSubtitle = styled.p`
  font-size: clamp(1.1rem, 2vw, 1.3rem);
  line-height: 1.6;
  color: #cbd5e1;
  max-width: 800px;
  opacity: 0.9;
  margin-bottom: 2rem;
`;

const Highlight = styled.span`
  color: #60a5fa;
  font-weight: 600;
`;

const TeamSection = styled.div`
  padding: 80px 40px;
  background: linear-gradient(to bottom, #1e293b, #0f172a);
  position: relative;
  z-index: 1;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 50px;
  background: linear-gradient(135deg, #60a5fa 0%, #a78bfa 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 40px;
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 10px;
  }
`;

const ImageCard = styled.div`
  background: rgba(30, 41, 59, 0.7);
  border-radius: 20px;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    border-color: rgba(96, 165, 250, 0.3);
  }
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: 320px;
  overflow: hidden;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }

  ${ImageCard}:hover & img {
    transform: scale(1.05);
  }
`;

const CardContent = styled.div`
  padding: 25px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const CardTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 15px;
  color: #f1f5f9;
  line-height: 1.4;
`;

const WatchBtn = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 14px 28px;
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
  color: white;
  border: none;
  border-radius: 50px;
  font-weight: 600;
  font-size: 1rem;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 8px 20px -5px rgba(59, 130, 246, 0.3);
  margin-top: auto;
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
    box-shadow: 0 15px 30px rgba(59, 130, 246, 0.4);
    background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%);

    &::before {
      left: 100%;
    }

    svg:last-child {
      transform: translateX(5px);
    }
  }
`;

const IconWrapper = styled.span`
  display: flex;
  align-items: center;
  transition: transform 0.3s ease;
`;


const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 30px;
  max-width: 900px;
  margin: 50px auto;
`;

const StatItem = styled.div`
  text-align: center;
  padding: 25px;
  background: rgba(30, 41, 59, 0.5);
  border-radius: 15px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    border-color: rgba(96, 165, 250, 0.3);
  }
`;

const StatNumber = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  background: linear-gradient(135deg, #60a5fa 0%, #a78bfa 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 10px;
`;

const StatLabel = styled.div`
  font-size: 0.9rem;
  color: #94a3b8;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const About = () => {
  const videos = [
    {
      id: 1,
      image: Image1,
      title: "Qanday dasturlash tili tanlash kerak?",
      link: "https://www.instagram.com/reel/DOvtx86DAq-/?igsh=MTVoOTNnbGVxOW5iaQ=="
    },
    {
      id: 2,
      image: Image2,
      title: "Siz shu o'yinlarni bilasizmi? Kimlar ushbu o'yinlarni yasagan?",
      link: "https://www.instagram.com/reel/DPRQVWMDA3i/?igsh=ZXVhbTltams1M3Jk"
    },
    {
      id: 3,
      image: Image3,
      title: "Boshqa dasturlash tilida kod yozganingda 😅 (funny video)",
      link: "https://www.instagram.com/reel/DO3WjIYjLOH/?igsh=MXhsZTA3enZraXU0aQ=="
    },
    {
      id: 4,
      image: Image4,
      title: "Klaviaturada tez yozishni o'rganing",
      link: "https://www.instagram.com/reel/DOyU5psDFgW/?igsh=MWliMG5wd3FibTY4dA=="
    }
  ];

  return (
    <>
      <Navbar />
      <Container>
        <BgImg>
          <HeroTitle>Biz Haqimizda</HeroTitle>
          <HeroSubtitle>
            <Highlight>Avto test guruhimizga xush kelibsiz!</Highlight>
            <br /><br />
            Biz avtomobil sinovlari va innovatsiyalarga bo'lgan sadoqatimiz bilan birlashgan
            olti kishidan iborat ishtiyoqli guruhmiz. Bizning jamoamiz avtomobil 
            ishlashi va xavfsizligini tadqiq qilish, tahlil qilish va yaxshilash uchun 
            qiziquvchanlik, texnik mahorat va jamoaviy ishning noyob aralashmasini birlashtiradi.
          </HeroSubtitle>
          
          <StatsGrid>
            <StatItem>
              <StatNumber>6+</StatNumber>
              <StatLabel>Mutaxassis</StatLabel>
            </StatItem>
            <StatItem>
              <StatNumber>50+</StatNumber>
              <StatLabel>Loyihalar</StatLabel>
            </StatItem>
            <StatItem>
              <StatNumber>100%</StatNumber>
              <StatLabel>Ishtiyoq</StatLabel>
            </StatItem>
            <StatItem>
              <StatNumber>24/7</StatNumber>
              <StatLabel>Qo'llab-quvvatlash</StatLabel>
            </StatItem>
          </StatsGrid>
        </BgImg>

        <TeamSection>
          <SectionTitle>Bizning Videolar</SectionTitle>
          <ImageGrid>
            {videos.map((video) => (
              <ImageCard key={video.id}>
                <ImageWrapper>
                  <img src={video.image} alt={video.title} />
                </ImageWrapper>
                <CardContent>
                  <CardTitle>{video.title}</CardTitle>
                  <WatchBtn 
                    href={video.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <FaPlay size={14} />
                    Videoni Ko'rish
                    <IconWrapper>
                      <FaExternalLinkAlt size={12} />
                    </IconWrapper>
                  </WatchBtn>
                </CardContent>
              </ImageCard>
            ))}
          </ImageGrid>
        </TeamSection>

        <Footer />





      </Container>
    </>
  );
};

export default About;