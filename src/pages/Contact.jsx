import React from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import APEXLOGO from "../assets/APEXLOGO.png";
import { FaInstagram, FaLinkedin, FaTwitter, FaFacebook } from "react-icons/fa";
const Wrapper = styled.div`
  font-family: "Arimo", sans-serif;
`;

const ContactSection = styled.div`
  margin-top: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 40px 60px;
  font-family: "Arimo", sans-serif;
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
  margin-top: 100px;
  width: 100%;
  margin: 0 auto;
  border: none;
  border-top: 1px solid gray;
`;

const LightBlue = styled.div`
  width: 100%;
  height: 140px;
  background-color: rgb(194, 235, 255);
  display: flex;
  align-items: center;
  justify-content: center;

  h1 {
    font-size: 32px;
    color: black;
  }
`;

const Main = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 50px 80px;
  flex-wrap: wrap;
  gap: 40px;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 30px;
  }
`;

const Left = styled.div`
  width: 650px;
  display: flex;
  align-items: center;
  gap: 30px;

  img {
    width: 300px; /* oldingi 160 edi */
    height: auto;
  }

  .text-content {
    display: flex;
    flex-direction: column;
    gap: 25px;

    p {
      font-size: 23px; /* oldingi 16 edi */
      font-weight: 500;
    }

    button {
      background-color: #007bff;
      color: white;
      padding: 12px 30px; /* kattaroq bo‘ldi */
      font-size: 16px;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      width: fit-content;
      transition: 0.3s;

      &:hover {
        background-color: #005fcc;
      }
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;

    .text-content {
      align-items: center;
    }
  }
`;

const Right = styled.form`
  margin-right:50px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  max-width: 400px;
  width: 100%;

  input {
    padding: 10px;
    font-size: 14px;
    border: 1px solid gray;
    border-radius: 4px;
  }

  label {
    font-size: 14px;
    font-weight: bold;
  }

  .checkbox {
    display: flex;
    align-items: center;
    font-size: 13px;

    input {
      margin-right: 8px;
    }
  }

  button {
    width: 100px;
    background-color: #007bff;
    color: white;
    padding: 8px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
`;

const BottomBg = styled.div`
  width: 100%;
  height: 100px;
  background-color: rgb(194, 235, 255);
  margin-top: 40px;
`;

const Contact = () => {
  return (
    <Wrapper>
      <Navbar />
      <LightBlue>
        <h1>Bog’lanish</h1>
      </LightBlue>

      <Main>
        <Left>
          <img src={APEXLOGO} alt="APEX Logo" className="APEXLOGO" />
          <div className="text-content">
            <p className="pforlogo">
              Imtihonga <br /> tayyorlanishdagi har
              <br /> bir qadamda biz <br /> siz bilan birgamiz.
              <br />
              APEX AVTO TEST bilan <br /> bog‘laning va ishonch <br /> bilan
              yo‘lga chiqing!
            </p>
            <button>APEX AVTO TEST</button>
          </div>
        </Left>

        <Right>
          <label>TO‘LIQ ISMINGIZ*</label>
          <input type="text" placeholder="TO‘LIQ ISMINGIZ" />

          <label>EMAIL*</label>
          <input type="email" placeholder="EMAILINGIZ" />

          <label>TELEFON*</label>
          <input type="tel" placeholder="TELEFON RAQAMINGIZ" />

          <div className="checkbox">
            <input type="checkbox" required />
            <span>Men har qanday oferta shartlariga roziman✅</span>
          </div>

          <button>KIRISH</button>
        </Right>
      </Main>

      <BottomBg />
     
      <ContactSection>
         <Divider />
        <div>
          <h3 className="p23">Bizning Ijtimoiy Tarmoqlar</h3>
          <br />
          <ContactInfo>
            <p className="p22">Telefon Raqam: +999-98-765-43-21</p>
            <p className="p22">Elektron Pochta: example@gmail.com</p>
          </ContactInfo>
        </div>
        <Icons>
          <a href="#">
            <FaInstagram />
          </a>
          <a href="#">
            <FaLinkedin />
          </a>
          <a href="#">
            <FaTwitter />
          </a>
          <a href="#">
            <FaFacebook />
          </a>
        </Icons>
      </ContactSection>
    </Wrapper>
  );
};

export default Contact;
