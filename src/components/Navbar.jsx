import styled from "styled-components";

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

const Navbar = () => {
  return (
    <Nav>
      <div>APEX AVTO TEST</div>
      <div style={{ display: "flex", gap: "30px" }}>
        <div style={{ cursor: "pointer" }}>Biz Haqimizda</div>
        <div style={{ cursor: "pointer" }}>Bog’lanish</div>
      </div>
    </Nav>
  );
};

export default Navbar;
