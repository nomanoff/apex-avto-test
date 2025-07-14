import { useNavigate } from "react-router-dom";

const Tickets = () => {
  const navigate = useNavigate();

  const handleStart = (ticketIndex) => {
    navigate(`/ticket/${ticketIndex}`);
  };

  return (
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
  );
};

export default Tickets;
