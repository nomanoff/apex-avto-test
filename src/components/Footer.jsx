import React from 'react';
import styled from 'styled-components';
import { FaInstagram, FaLinkedinIn, FaTwitter, FaFacebookF } from 'react-icons/fa';

const FooterContainer = styled.footer`
  background-color: #000;
  color: white;
  padding: 50px 80px;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const Title = styled.h2`
  font-size: 32px;
  font-weight: 700;
`;

const Line = styled.hr`
  border: 0.5px solid #ffffff;
  width: 100%;
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

`;

const ContactItem = styled.p`
  font-size: 20px;
  font-weight: 500;

  span {
    font-weight: 400;
    color: #ccc;
  }
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 30px;
  font-size: 28px;
`;

const IconWrapper = styled.a`
  color: white;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.2);
    color: #ccc;
  }
`;


const FlexCtn = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <Title>Bizning Ijtimoiy Tarmoqlar</Title>
      <Line />
      <FlexCtn>
      <ContactInfo>
        <ContactItem>
          Telefon Raqam: <span>+999-98-765-43-21</span>
        </ContactItem>
        <ContactItem>
          Elektron Pochta: <span>example@gmail.com</span>
        </ContactItem>
      </ContactInfo>
      <SocialIcons>
        <IconWrapper href="#"><FaInstagram /></IconWrapper>
        <IconWrapper href="#"><FaLinkedinIn /></IconWrapper>
        <IconWrapper href="#"><FaTwitter /></IconWrapper>
        <IconWrapper href="#"><FaFacebookF /></IconWrapper>
      </SocialIcons>
      </FlexCtn>
    </FooterContainer>
  );
};

export default Footer;
