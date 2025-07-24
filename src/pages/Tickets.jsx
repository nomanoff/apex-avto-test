import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import bgImage from "../assets/defaultbackground.png"; 




//style
const Container3 = styled.div`
 background: 
    linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url(${bgImage}) center/cover no-repeat;
    width: 100%;
    height: 100%;

`;


const Tickets = () => {
  const navigate = useNavigate();

  const handleStart = (ticketIndex) => {
    navigate(`/ticket/${ticketIndex}`);
  };

  return (
    <>
    <Container3>

    <div style={{ padding: 30 }}>
      <h2>🧾 Select a Ticket</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
        {Array.from({ length: 70 }).map((_, i) => (
          <button
            key={i}
            onClick={() => handleStart(i)}
            style={{
              width: 80,
              height: 40,
              fontSize: 16,
              border: "1px solid gray",
              cursor: "pointer",
            }}
          >
            Ticket {i + 1}
          </button>
        ))}
      </div>
    </div>
    </Container3>

    </>
  );
};

export default Tickets;
