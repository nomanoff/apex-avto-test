import Navbar from "../components/Navbar";
import styled from "styled-components";
import bgImg from "../assets/background1.png";
import { FaInstagram, FaLinkedin, FaTwitter, FaFacebook } from "react-icons/fa";
import { color } from "framer-motion";

const BgImg = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(rgba(0, 0, 0, 0.42), rgba(0, 0, 0, 0.42)),
    url(${bgImg}) center/cover no-repeat;
  width: 100%;
  height: 490px;
  text-align: center;
  font-family: 'Arimo', sans-serif;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const LgtBlue = styled.div`
  width: 100%;
  height: 100px;
  background-color: rgb(194, 235, 255);
`;

const ContainerFor2thtext = styled.div`
  margin-top: 280px;
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  align-items: center;
  font-family: 'Arimo', sans-serif;
`;

const ContactSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 40px 60px;
  font-family: 'Arimo', sans-serif;
  flex-wrap: wrap;

  @media (max-width: 600px) {
    flex-direction: column;
    gap: 20px;
    text-align: center;
  }
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  font-size: 14px;
  
`;

const Icons = styled.div`
  display: flex;
  gap: 15px;

  a {
    color: black;
    font-size: 22px;
    transition: 0.3s;

    &:hover {
      color: #0077b5;
    }
  }
`;

const Divider = styled.hr`
  width: 95%;
  margin: 0 auto;
  border: none;
  border-top: 1px solid gray;
`;

const About = () => {
  return (
    <>
      <Navbar />

      <Container>
        <LgtBlue />
        <BgImg>
          <h1>Biz Haqimizda</h1>
          <br />
          <h1>Avto test guruhimizga xush kelibsiz!</h1>
          <br />
          <h1>
            Biz avtomobil sinovlari va innovatsiyalarga bo'lgan sadoqatimiz
            bilan birlashgan
            <br /> olti kishidan iborat ishtiyoqli guruhmiz. Bizning jamoamiz
            avtomobil ishlashi va <br /> xavfsizligini tadqiq qilish, tahlil
            qilish va yaxshilash uchun qiziquvchanlik, texnik <br /> mahorat va
            jamoaviy ishning noyob aralashmasini birlashtiradi.
          </h1>
        </BgImg>
        <LgtBlue />
        <ContainerFor2thtext>
          <h1 className="h22">
            Birgalikda biz turli xil avtomobil sinovlarini o'tkazishga
            ixtisoslashganmiz,<br /> ishlash diagnostikasidan xavfsizlikni
            tekshirishgacha, aqlliroq va ishonchli <br />transport vositalarini ishlab
            chiqishga hissa qo'shishni maqsad qilganmiz.<br /> Bizning vazifamiz oddiy:
            o'rganish, rivojlanish va avtomobilsozlik dunyosida <br /> ijobiy ta'sir
            qoldirish.<br />Biz hamkorlikka, amaliy tajribaga va doimiy
            takomillashtirishga ishonamiz - va <br /> biz sayohat qilayotganimizdan
            faxrlanamiz.
          </h1>
        </ContainerFor2thtext>

        <div style={{ padding: "50px", textAlign: "center" }}>
          <h1 style={{ color: "white" }}></h1>
          <p>©2025 APEX. All rights reserved.</p>
        </div>

        {/* Ijtimoiy tarmoqlar bo‘limi */}
        <Divider />
        <ContactSection>
          <div>
            <h3 className="p23">Bizning Ijtimoiy Tarmoqlar</h3>
            <br />
            <ContactInfo>

              <p className="p22">Telefon Raqam: +999-98-765-43-21</p>
              <p className="p22">Elektron Pochta: example@gmail.com</p>
            </ContactInfo>
          </div>
          <Icons>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaLinkedin /></a>
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaFacebook /></a>
          </Icons>
        </ContactSection>
      </Container>
    </>
  );
};

export default About;
