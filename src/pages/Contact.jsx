import React, { useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import APEXLOGO from "../assets/APEXLOGO.png";
import Footer from "../components/Footer";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaPaperPlane, FaCheck, FaInstagram, FaLinkedin, FaTwitter, FaFacebook } from "react-icons/fa";

const Container = styled.div`
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
  min-height: 100vh;
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
    bottom: 0;
    background: 
      radial-gradient(circle at 20% 30%, rgba(56, 189, 248, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 80% 70%, rgba(139, 92, 246, 0.1) 0%, transparent 50%);
    pointer-events: none;
  }
`;

const HeroSection = styled.div`
  background: linear-gradient(rgba(15, 23, 42, 0.9), rgba(30, 41, 59, 0.9));
  padding: 120px 60px 80px;
  text-align: center;
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, #3b82f6, transparent);
  }

  @media (max-width: 768px) {
    padding: 100px 30px 60px;
  }
`;

const HeroTitle = styled.h1`
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  font-weight: 800;
  margin-bottom: 20px;
  background: linear-gradient(135deg, #ffffff 0%, #60a5fa 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -0.5px;
`;

const HeroSubtitle = styled.p`
  font-size: clamp(1.1rem, 2vw, 1.3rem);
  color: #cbd5e1;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
  opacity: 0.9;
`;

const ContactGrid = styled.div`
  max-width: 1400px;
  margin: 60px auto;
  padding: 0 40px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 40px;
    padding: 0 30px;
  }

  @media (max-width: 768px) {
    padding: 0 20px;
  }
`;

const InfoCard = styled.div`
  background: rgba(30, 41, 59, 0.7);
  border-radius: 20px;
  padding: 40px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    border-color: rgba(96, 165, 250, 0.3);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  }
`;

const LogoSection = styled.div`
  display: flex;
  align-items: center;
  gap: 25px;
  margin-bottom: 30px;

  img {
    width: 120px;
    height: 120px;
    border-radius: 20px;
    object-fit: contain;
    background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.1));
    padding: 15px;
    border: 1px solid rgba(255, 255, 255, 0.1);
  }
`;

const LogoTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  background: linear-gradient(135deg, #60a5fa 0%, #a78bfa 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const Description = styled.p`
  color: #94a3b8;
  line-height: 1.7;
  font-size: 1.1rem;
  margin-bottom: 40px;
`;

const ContactList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
`;

const ContactItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 20px;

  .icon-wrapper {
    width: 50px;
    height: 50px;
    border-radius: 12px;
    background: linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(139, 92, 246, 0.2));
    display: flex;
    align-items: center;
    justify-content: center;
    color: #60a5fa;
    font-size: 1.2rem;
    flex-shrink: 0;
  }

  .content {
    h3 {
      font-size: 1.1rem;
      font-weight: 600;
      color: #f1f5f9;
      margin-bottom: 5px;
    }

    p, a {
      color: #94a3b8;
      text-decoration: none;
      transition: color 0.3s ease;
      font-size: 0.95rem;

      &:hover {
        color: #60a5fa;
      }
    }
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 30px;

  a {
    width: 45px;
    height: 45px;
    border-radius: 12px;
    background: rgba(30, 41, 59, 0.7);
    border: 1px solid rgba(255, 255, 255, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #cbd5e1;
    font-size: 1.2rem;
    transition: all 0.3s ease;

    &:hover {
      background: linear-gradient(135deg, #3b82f6, #8b5cf6);
      color: white;
      transform: translateY(-3px);
      border-color: transparent;
    }
  }
`;

const FormCard = styled(InfoCard)`
  form {
    display: flex;
    flex-direction: column;
    gap: 25px;
  }
`;

const FormGroup = styled.div`
  label {
    display: block;
    font-size: 0.95rem;
    font-weight: 600;
    color: #f1f5f9;
    margin-bottom: 8px;
    
    span {
      color: #ef4444;
    }
  }

  input {
    width: 100%;
    padding: 16px 20px;
    background: rgba(15, 23, 42, 0.5);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    color: #e2e8f0;
    font-size: 1rem;
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
`;

const CheckboxGroup = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-top: 10px;

  input[type="checkbox"] {
    width: 20px;
    height: 20px;
    margin-top: 3px;
    accent-color: #3b82f6;
    cursor: pointer;
  }

  label {
    color: #94a3b8;
    font-size: 0.9rem;
    line-height: 1.5;
    cursor: pointer;
  }
`;

const SubmitButton = styled.button`
  padding: 18px 35px;
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-top: 20px;

  &:hover:not(:disabled) {
    transform: translateY(-3px);
    box-shadow: 0 15px 30px rgba(59, 130, 246, 0.3);
    background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const SuccessMessage = styled.div`
  background: rgba(34, 197, 94, 0.1);
  border: 1px solid rgba(34, 197, 94, 0.3);
  border-radius: 12px;
  padding: 20px;
  margin-top: 20px;
  display: flex;
  align-items: center;
  gap: 15px;
  color: #22c55e;
  font-weight: 500;

  svg {
    font-size: 1.5rem;
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  max-width: 1400px;
  margin: 40px auto;
  padding: 0 40px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 0 20px;
  }
`;

const StatItem = styled.div`
  text-align: center;
  padding: 30px;
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

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    agree: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Form submitted:', formData);
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        agree: false
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }, 1500);
  };

  return (
    <Container>
      <Navbar />
      <HeroSection>
        <HeroTitle>Biz bilan Bog'laning</HeroTitle>
        <HeroSubtitle>
          Imtihonga tayyorlanishdagi har bir qadamda biz siz bilan birgamiz. 
          APEX AVTO TEST bilan bog'laning va ishonch bilan yo'lga chiqing!
        </HeroSubtitle>
      </HeroSection>

      <ContactGrid>
        <InfoCard>
          <LogoSection>
            <img src={APEXLOGO} alt="APEX Logo" />
            <LogoTitle>APEX AVTO TEST</LogoTitle>
          </LogoSection>
          
          <Description>
            Avtomobil sinovlari va innovatsiyalar sohasida ishtiyoq bilan ishlaydigan 
            professional jamoamiz. Bizning maqsadimiz - har bir haydovchiga eng yaxshi 
            tajribani taqdim etish va muvaffaqiyatga erishishda yordam berish.
          </Description>

          <ContactList>
            <ContactItem>
              <div className="icon-wrapper">
                <FaPhone />
              </div>
              <div className="content">
                <h3>Telefon Raqamlar</h3>
                <a href="tel:+998991234567">+998 99 123 45 67</a>
                <br />
                <a href="tel:+998971234567">+998 97 123 45 67</a>
              </div>
            </ContactItem>

            <ContactItem>
              <div className="icon-wrapper">
                <FaEnvelope />
              </div>
              <div className="content">
                <h3>Elektron Pochta</h3>
                <a href="mailto:info@apexavtotest.uz">info@apexavtotest.uz</a>
                <br />
                <a href="mailto:support@apexavtotest.uz">support@apexavtotest.uz</a>
              </div>
            </ContactItem>

            <ContactItem>
              <div className="icon-wrapper">
                <FaMapMarkerAlt />
              </div>
              <div className="content">
                <h3>Manzilimiz</h3>
                <p>Toshkent shahri, Yunusobod tumani, 100084</p>
              </div>
            </ContactItem>
          </ContactList>

          <div>
            <h3 style={{ color: '#f1f5f9', marginBottom: '15px', fontSize: '1.1rem' }}>
              Ijtimoiy Tarmoqlar
            </h3>
            <SocialLinks>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <FaInstagram />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <FaLinkedin />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <FaTwitter />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <FaFacebook />
              </a>
            </SocialLinks>
          </div>
        </InfoCard>

        <FormCard>
          <h2 style={{ fontSize: '1.8rem', fontWeight: '700', marginBottom: '30px', color: '#f1f5f9' }}>
            Xabar Qoldiring
          </h2>
          
          <form onSubmit={handleSubmit}>
            <FormGroup>
              <label>To'liq Ismingiz <span>*</span></label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Ism va familiyangizni kiriting"
                required
              />
            </FormGroup>

            <FormGroup>
              <label>Email Manzilingiz <span>*</span></label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="example@email.com"
                required
              />
            </FormGroup>

            <FormGroup>
              <label>Telefon Raqamingiz <span>*</span></label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+998 __ ___ __ __"
                required
              />
            </FormGroup>

            <CheckboxGroup>
              <input
                type="checkbox"
                name="agree"
                checked={formData.agree}
                onChange={handleChange}
                required
              />
              <label>
                Men <a href="/privacy" style={{ color: '#60a5fa' }}>maxfiylik siyosati</a> va har qanday 
                oferta shartlariga roziman
              </label>
            </CheckboxGroup>

            <SubmitButton type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <span>Yuborilmoqda...</span>
                </>
              ) : (
                <>
                  <FaPaperPlane />
                  <span>Xabar Yuborish</span>
                </>
              )}
            </SubmitButton>

            {isSubmitted && (
              <SuccessMessage>
                <FaCheck />
                <span>Xabaringiz muvaffaqiyatli yuborildi! Tez orada siz bilan bog'lanamiz.</span>
              </SuccessMessage>
            )}
          </form>
        </FormCard>
      </ContactGrid>

      <StatsGrid>
        <StatItem>
          <StatNumber>24/7</StatNumber>
          <StatLabel>Qo'llab-quvvatlash</StatLabel>
        </StatItem>
        <StatItem>
          <StatNumber>30 d</StatNumber>
          <StatLabel>Tezkor javob</StatLabel>
        </StatItem>
        <StatItem>
          <StatNumber>100%</StatNumber>
          <StatLabel>Mijoz mamnuniyati</StatLabel>
        </StatItem>
      </StatsGrid>

      <Footer />
    </Container>
  );
};

export default Contact;