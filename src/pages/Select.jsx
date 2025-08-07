import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { useSpring, animated } from "@react-spring/web";

import bgImage from "../assets/defaultbackground.png"; 

const Container = styled.div`
  height: 100vh;
  background: 
    linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url(${bgImage}) center/cover no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Box = styled(animated.div)`
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(5px);
  border-radius: 24px;
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  color: white;
  font-size: 36px;
  font-weight: 700;
  margin-bottom: 30px;
`;

const SelectBox = styled.select`
  width: 300px;
  padding: 12px;
  border-radius: 20px;
  border: none;
  font-weight: 600;
  font-size: 16px;
  text-align: center;
  outline: none;
  margin-bottom: 40px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
`;

const Button = styled.button`
  background-color: #007aff;
  color: white;
  font-weight: 700;
  padding: 14px 0;
  width: 280px;
  border: none;
  border-radius: 12px;
  font-size: 18px;
  margin-bottom: 20px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background-color: #005ce6;
  }
`;

const Select = () => {
  const [lang, setLang] = useState("uzlotin");
  const navigate = useNavigate();
  const animation = useSpring({
    from: { opacity: 0, transform: "translateY(80px)" },
    to: { opacity: 1, transform: "translateY(0px)" },
    config: { tension: 100, friction: 18 },
    delay: 200,
  });

  const handleStart = () => {
    navigate("/quiz", { state: { lang } });
  };

  return (
    <Container>
      <Box style={animation}>
        <Title>APEX AVTO TEST</Title>

        <SelectBox value={lang} onChange={(e) => setLang(e.target.value)}>
          <option value="uzlotin">O'zbek (Lotin)</option>
          <option value="uzkiril">O'zbek (Kiril)</option>
          <option value="rus">Русский</option>
        </SelectBox>

        <Button onClick={handleStart}>START TEST 20</Button>
        <Button onClick={() => navigate("/tickets")}>SOLVE TICKETS 700</Button>
      </Box>
    </Container>
  );
};

export default Select;