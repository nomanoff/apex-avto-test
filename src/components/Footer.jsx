import React from 'react';
import styled from 'styled-components';
import { FaInstagram, FaLinkedin, FaTwitter, FaFacebook, FaMapMarkerAlt, FaPhone, FaEnvelope, FaTelegram } from "react-icons/fa";

const FooterContainer = styled.footer`
  background: linear-gradient(to bottom, #0f172a, #1e293b);
  color: #e2e8f0;
  font-family: 'Inter', sans-serif;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, #3b82f6, transparent);
  }
`;

const FooterTop = styled.div`
  padding: 70px 60px 50px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 40px;
  max-width: 1400px;
  margin: 0 auto;
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
    padding: 60px 40px 40px;
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 50px 30px 30px;
    gap: 30px;
  }
`;

const FooterSection = styled.div`
  h3 {
    font-size: 1.4rem;
    font-weight: 700;
    margin-bottom: 25px;
    background: linear-gradient(135deg, #60a5fa 0%, #a78bfa 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    position: relative;
    padding-bottom: 10px;
    
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 40px;
      height: 3px;
      background: linear-gradient(90deg, #3b82f6, #8b5cf6);
      border-radius: 2px;
    }
  }
`;

const LogoSection = styled(FooterSection)`
  .logo {
    font-size: 1.8rem;
    font-weight: 800;
    background: linear-gradient(135deg, #60a5fa 0%, #a78bfa 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 20px;
    display: inline-block;
  }
  
  p {
    color: #94a3b8;
    line-height: 1.6;
    font-size: 0.95rem;
  }
`;

const ContactList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  
  li {
    display: flex;
    align-items: flex-start;
    gap: 15px;
    margin-bottom: 18px;
    color: #cbd5e1;
    
    svg {
      color: #60a5fa;
      margin-top: 3px;
      flex-shrink: 0;
    }
    
    a {
      color: #cbd5e1;
      text-decoration: none;
      transition: color 0.3s ease;
      
      &:hover {
        color: #60a5fa;
      }
    }
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 20px;
  
  a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 45px;
    height: 45px;
    background: rgba(30, 41, 59, 0.7);
    border-radius: 50%;
    color: #cbd5e1;
    font-size: 1.2rem;
    transition: all 0.3s ease;
    border: 1px solid rgba(255, 255, 255, 0.1);
    
    &:hover {
      background: linear-gradient(135deg, #3b82f6, #8b5cf6);
      color: white;
      transform: translateY(-5px);
      border-color: transparent;
      box-shadow: 0 10px 20px rgba(59, 130, 246, 0.3);
    }
  }
`;

const QuickLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  
  a {
    color: #94a3b8;
    text-decoration: none;
    transition: all 0.3s ease;
    display: inline-block;
    padding: 5px 0;
    position: relative;
    
    &::before {
      content: '→';
      position: absolute;
      left: -20px;
      opacity: 0;
      transition: all 0.3s ease;
      color: #60a5fa;
    }
    
    &:hover {
      color: #60a5fa;
      transform: translateX(10px);
      
      &::before {
        opacity: 1;
        left: -15px;
      }
    }
  }
`;

const Newsletter = styled.div`
  .newsletter-form {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
  
  input {
    padding: 14px 20px;
    background: rgba(30, 41, 59, 0.7);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 10px;
    color: #e2e8f0;
    font-size: 0.95rem;
    transition: all 0.3s ease;
    
    &:focus {
      outline: none;
      border-color: #3b82f6;
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }
    
    &::placeholder {
      color: #64748b;
    }
  }
  
  button {
    padding: 14px 25px;
    background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
    color: white;
    border: none;
    border-radius: 10px;
    font-weight: 600;
    font-size: 0.95rem;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 25px rgba(59, 130, 246, 0.3);
    }
  }
`;

const FooterBottom = styled.div`
  background: rgba(15, 23, 42, 0.9);
  padding: 30px 60px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  
  @media (max-width: 768px) {
    padding: 25px 30px;
  }
`;

const BottomContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1400px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
    text-align: center;
  }
`;

const Copyright = styled.div`
  color: #94a3b8;
  font-size: 0.9rem;
  
  a {
    color: #60a5fa;
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const PaymentMethods = styled.div`
  display: flex;
  gap: 15px;
  color: #94a3b8;
  font-size: 1.2rem;
  
  span {
    font-size: 0.8rem;
    margin-right: 10px;
    color: #64748b;
  }
`;

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const handleNewsletter = (e) => {
    e.preventDefault();
    // Newsletter logic here
    console.log('Newsletter submitted');
  };

  return (
    <FooterContainer>
      <FooterTop>
        <LogoSection>
          <div className="logo">APEX AVTO TEST</div>
          <p>
            Avtomobil sinovlari va innovatsiyalar sohasida ishtiyoq bilan ishlaydigan 
            professional jamoamiz. Bizning maqsadimiz - har bir haydovchiga eng yaxshi 
            tajribani taqdim etish.
          </p>
          <SocialLinks>
            <a href="https://www.instagram.com/cscoding.uz/" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </a>
            <a href="https://t.me/cscodinguz" target="_blank" rel="noopener noreferrer">
              <FaTelegram />
            </a>

         
          </SocialLinks>
        </LogoSection>

        <FooterSection>
          <h3>Aloqa Ma'lumotlari</h3>
          <ContactList>
            <li>
              <FaMapMarkerAlt />
              <span>Toshkent shahri, Yunusobod tumani, 100084</span>
            </li>
            <li>
              <FaPhone />
              <a href="tel:+998991234567">+998 99 123 45 67</a>
            </li>
            <li>
              <FaPhone />
              <a href="tel:+998971234567">+998 97 123 45 67</a>
            </li>
            <li>
              <FaEnvelope />
              <a href="mailto:info@apexavtotest.uz">info@apexavtotest.uz</a>
            </li>
            <li>
              <FaEnvelope />
              <a href="mailto:support@apexavtotest.uz">support@apexavtotest.uz</a>
            </li>
          </ContactList>
        </FooterSection>

        <FooterSection>
          <h3>Tezkor Havolalar</h3>
          <QuickLinks>
            <a href="/">Asosiy Sahifa</a>
            <a href="/about">Biz Haqimizda</a>
            <a href="/tests">Testlar</a>
            <a href="/contact">Bog'lanish</a>
          </QuickLinks>
        </FooterSection>

        <FooterSection>
          <h3>Yangiliklarga Obuna Bo'ling</h3>
          <p style={{ color: '#94a3b8', marginBottom: '20px', fontSize: '0.95rem' }}>
            Yangi testlar va aksiyalar haqida birinchi bo'lib xabardor bo'ling
          </p>
          <Newsletter>
            <form className="newsletter-form" onSubmit={handleNewsletter}>
              <input 
                type="email" 
                placeholder="Elektron pochtangizni kiriting" 
                required 
              />
              <button type="submit">
                Obuna bo'lish
              </button>
            </form>
          </Newsletter>
        </FooterSection>
      </FooterTop>

      <FooterBottom>
        <BottomContent>
          <Copyright>
            © {currentYear} <a href="/">APEX AVTO TEST</a>. Barcha huquqlar himoyalangan.
            <br />
            <span style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '5px', display: 'block' }}>
              Dizayn va ishlab chiqish - Bizning Jamoa
            </span>
          </Copyright>
          
          <PaymentMethods>
            <span>To'lov usullari:</span>
            <span style={{ color: '#3b82f6' }}>💳</span>
            <span style={{ color: '#60a5fa' }}>🏦</span>
            <span style={{ color: '#8b5cf6' }}>📱</span>
            <span style={{ color: '#10b981' }}>💲</span>
          </PaymentMethods>
        </BottomContent>
      </FooterBottom>
    </FooterContainer>
  );
};

export default Footer;