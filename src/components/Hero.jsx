import React from "react";
import styled from "styled-components";
import bgImg from "../assets/background3.png";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";


const HeroContainer = styled.div`
  width: 100%;
  height: 60vh;
  background: url(${bgImg}) center/cover no-repeat;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Overlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: black;
  opacity: 0.42;
  z-index: 1;
`;

const Content = styled(motion.div)`
  position: relative;
  z-index: 2;
  color: white;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 48px;
  font-weight: bold;
  margin-bottom: 40px;
`;

const Button = styled.button`
  padding: 16px 32px;
  font-size: 18px;
  background: transparent;
  border: 2px solid white;
  color: white;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: white;
    color: black;
  }
`;

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <HeroContainer>
      <Overlay />
      <Content
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }} >
        <Title>Hoziroq O'zingizni Darajangizni Tekshiring!</Title>
        <Button onClick={() => navigate("/select")}>Hozir Boshlang --&gt;</Button>
      </Content>
    </HeroContainer>
  );
};

export default HeroSection;
