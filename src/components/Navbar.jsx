import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaBars, FaTimes, FaCar } from "react-icons/fa";

const NavContainer = styled.nav`
  background: rgba(15, 23, 42, 0.95);
  backdrop-filter: blur(10px);
  padding: 0 30px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  position: sticky;
  top: 0;
  z-index: 1000;
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    padding: 0 20px;
    height: 70px;
  }

  @media (max-width: 480px) {
    padding: 0 15px;
  }
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const LogoIcon = styled.div`
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.2rem;

  @media (max-width: 768px) {
    width: 35px;
    height: 35px;
    font-size: 1rem;
  }
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: 800;
  color: #60a5fa;
  text-decoration: none;
  letter-spacing: -0.5px;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;

  &:hover {
    color: #a78bfa;
  }

  @media (max-width: 1024px) {
    font-size: 1.4rem;
  }

  @media (max-width: 768px) {
    font-size: 1.3rem;
  }

  @media (max-width: 480px) {
    font-size: 1.2rem;
  }
`;

const LogoText = styled.span`
  @media (max-width: 480px) {
    display: none;
  }
`;

const LogoMobile = styled.span`
  display: none;
  @media (max-width: 480px) {
    display: inline;
  }
`;

const DesktopNavGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const MobileNavGroup = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
  }
`;

const MobileMenuButton = styled.button`
  background: rgba(96, 165, 250, 0.1);
  border: 1px solid rgba(96, 165, 250, 0.2);
  border-radius: 8px;
  width: 45px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #60a5fa;
  font-size: 1.3rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(96, 165, 250, 0.2);
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }
`;

const MobileMenuOverlay = styled.div`
  position: fixed;
  top: 70px;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(15, 23, 42, 0.98);
  backdrop-filter: blur(20px);
  z-index: 999;
  display: flex;
  flex-direction: column;
  padding: 30px;
  transform: ${({ isOpen }) => isOpen ? 'translateX(0)' : 'translateX(-100%)'};
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  overflow-y: auto;

  @media (min-width: 769px) {
    display: none;
  }
`;

const MobileNavLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 40px;
`;

const NavItem = styled(Link)`
  color: ${({ active }) => active ? '#60a5fa' : '#94a3b8'};
  text-decoration: none;
  font-weight: 500;
  font-size: 1.1rem;
  padding: 15px 20px;
  border-radius: 12px;
  transition: all 0.3s ease;
  position: relative;
  display: flex;
  align-items: center;
  gap: 15px;
  background: ${({ active }) => active ? 'rgba(96, 165, 250, 0.1)' : 'transparent'};
  border: 1px solid ${({ active }) => active ? 'rgba(96, 165, 250, 0.3)' : 'transparent'};

  &:hover {
    color: #60a5fa;
    background: rgba(96, 165, 250, 0.1);
    transform: translateX(10px);
  }

  ${({ active }) => active && `
    &::before {
      content: '';
      position: absolute;
      left: 0;
      width: 4px;
      height: 60%;
      background: linear-gradient(180deg, #60a5fa, #a78bfa);
      border-radius: 0 4px 4px 0;
    }
  `}
`;

const DesktopNavItem = styled(Link)`
  color: ${({ active }) => active ? '#60a5fa' : '#94a3b8'};
  text-decoration: none;
  font-weight: 500;
  font-size: 0.95rem;
  padding: 10px 20px;
  border-radius: 10px;
  transition: all 0.3s ease;
  position: relative;

  &:hover {
    color: #60a5fa;
    background: rgba(96, 165, 250, 0.1);
  }

  ${({ active }) => active && `
    background: rgba(96, 165, 250, 0.1);
    &::after {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      bottom: -25px;
      height: 3px;
      background: linear-gradient(90deg, #60a5fa, #a78bfa);
      border-radius: 3px 3px 0 0;
    }
  `}
`;

const CTAButton = styled(Link)`
  padding: 12px 28px;
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
  color: white;
  border: none;
  border-radius: 10px;
  font-weight: 600;
  font-size: 0.9rem;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(59, 130, 246, 0.3);
    background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%);
  }

  @media (max-width: 768px) {
    margin-top: 30px;
    padding: 15px 30px;
    font-size: 1rem;
    justify-content: center;
  }
`;

const MobileMenuHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const CloseButton = styled.button`
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.2);
  border-radius: 8px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ef4444;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(239, 68, 68, 0.2);
  }
`;

const ContactInfo = styled.div`
  margin-top: auto;
  padding-top: 30px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  color: #94a3b8;
  font-size: 0.9rem;

  p {
    margin: 8px 0;
    display: flex;
    align-items: center;
    gap: 10px;
  }
`;

const Navbar = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Scroll handler for navbar background
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <NavContainer style={{
        background: scrolled ? 'rgba(15, 23, 42, 0.98)' : 'rgba(15, 23, 42, 0.95)',
        borderBottom: scrolled ? '1px solid rgba(255, 255, 255, 0.12)' : '1px solid rgba(255, 255, 255, 0.08)'
      }}>
        <LogoContainer>
          <LogoIcon>
            <FaCar />
          </LogoIcon>
          <Logo to="/" onClick={closeMobileMenu}>
            <LogoText>APEX AVTO TEST</LogoText>
            <LogoMobile>APEX</LogoMobile>
          </Logo>
        </LogoContainer>

        <DesktopNavGroup>
          <DesktopNavItem 
            to="/" 
            active={location.pathname === "/" ? "true" : undefined}
          >
            Asosiy
          </DesktopNavItem>
          <DesktopNavItem 
            to="/about" 
            active={location.pathname === "/about" ? "true" : undefined}
          >
            Biz Haqimizda
          </DesktopNavItem>
          <DesktopNavItem 
            to="/contact" 
            active={location.pathname === "/contact" ? "true" : undefined}
          >
            Bog'lanish
          </DesktopNavItem>
          <CTAButton to="/select">
            Testni Boshlash
          </CTAButton>
        </DesktopNavGroup>

        <MobileNavGroup>
          <MobileMenuButton onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </MobileMenuButton>
        </MobileNavGroup>
      </NavContainer>

      <MobileMenuOverlay isOpen={isMobileMenuOpen}>
        <MobileMenuHeader>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <LogoIcon>
              <FaCar />
            </LogoIcon>
            <div>
              <div style={{ 
                fontSize: '1.3rem', 
                fontWeight: '700', 
                color: '#60a5fa' 
              }}>
                APEX AVTO TEST
              </div>
              <div style={{ 
                fontSize: '0.8rem', 
                color: '#94a3b8',
                marginTop: '2px'
              }}>
                Professional avtotest platformasi
              </div>
            </div>
          </div>
          <CloseButton onClick={closeMobileMenu}>
            <FaTimes />
          </CloseButton>
        </MobileMenuHeader>

        <MobileNavLinks>
          <NavItem 
            to="/" 
            active={location.pathname === "/" ? "true" : undefined}
            onClick={closeMobileMenu}
          >
            <span>🏠</span> Asosiy Sahifa
          </NavItem>
          <NavItem 
            to="/about" 
            active={location.pathname === "/about" ? "true" : undefined}
            onClick={closeMobileMenu}
          >
            <span>👥</span> Biz Haqimizda
          </NavItem>
          <NavItem 
            to="/contact" 
            active={location.pathname === "/contact" ? "true" : undefined}
            onClick={closeMobileMenu}
          >
            <span>📞</span> Bog'lanish
          </NavItem>
     
 
        </MobileNavLinks>

        <CTAButton to="/select" onClick={closeMobileMenu}>
          <span>🚀</span> Testni Boshlash
        </CTAButton>

        <ContactInfo>
          <p>📞 +998 99 123 45 67</p>
          <p>✉️ info@apexavtotest.uz</p>
          <p style={{ marginTop: '15px', fontSize: '0.8rem' }}>
            Ish vaqti: 09:00 - 18:00
          </p>
        </ContactInfo>
      </MobileMenuOverlay>
    </>
  );
};

export default Navbar;