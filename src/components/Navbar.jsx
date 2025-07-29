import styled from "styled-components";
import { Link } from "react-router-dom";

const Nav = styled.div`
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 40px;
  background-color: white;
  font-weight: bold;
  font-size: 18px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
  cursor: pointer;

  &:hover {
    color: #007bff;
  }
`;

const Navbar = () => {
  return (
    <Nav>
      <div>APEX AVTO TEST</div>
      <div style={{ display: "flex", gap: "30px" }}>
        <StyledLink to="/about">Biz Haqimizda</StyledLink>
        <StyledLink to="/contact">Bog’lanish</StyledLink>
      </div>
    </Nav>
  );
};

export default Navbar;
